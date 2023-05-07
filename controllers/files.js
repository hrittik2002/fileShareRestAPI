import multer from "multer";
import path from "path";
import File from "../models/file.js";
import { v4 as uuidv4 } from "uuid";
import { sendEmailService as SendMail } from "../services/emailService.js";
import emailTemplate from "../services/emailTemplate.js";
import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";
import { firebaseConfig } from "../config/firebaseConfig.js";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const app =initializeApp(firebaseConfig);
export const auth = getAuth(app);
const storage = getStorage();

// get Current Time
const giveCurrentDateTime = () => {
  const today = new Date();
  const date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  const time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  const dateTime = date + " " + time;
  return dateTime;
};

/**
 *  Storing file in the uploads and file details in our database
 */
export const storeFileIntoDB = async (req, res) => {
  try {
    const dateTime = giveCurrentDateTime();

    const fileName =   dateTime + " " + req.file.originalname;

        const storageRef = ref(storage, `files/${fileName}`);

        // Create file metadata including the content type
        const metadata = {
            contentType: req.file.mimetype,
        };
        // Upload the file in the bucket storage
        const snapshot = await uploadBytesResumable(storageRef, req.file.buffer, metadata);
        //by using uploadBytesResumable we can control the progress of uploading like pause, resume, cancel
        // Grab the public url
        const downloadURL = await getDownloadURL(snapshot.ref);
    // Store into Database
    const file = new File({
      filename: fileName,
      uuid: uuidv4(),
      path: downloadURL,
      size: req.file.size,
    });

    const response = await file.save();

    return res.json({
          file: `${process.env.CLIENT_BASE_URL}/files/${response.uuid}`,
          uuid : response.uuid,
          downloadUrl : downloadURL
        });
  } catch (err) {
    console.log(err)
  }

  // // Store file
  // upload(req, res, async (err) => {
  //   // Validate Request
  //   if (!req.file) {
  //     return res.json({ error: "All fields are Required" });
  //   }
  //   if (err) {
  //     return res.status(500).send({ error: err.message });
  //   }
  // // Store into Database
  // const file = new File({
  //   filename: req.file.filename,
  //   uuid: uuidv4(),
  //   path: req.file.path,
  //   size: req.file.size,
  // });

  //   const response = await file.save();

  //   return res.json({
  //     file: `${process.env.APP_BASE_URL}/files/${response.uuid}`,
  //     uuid : response.uuid
  //   });
  // });
};

/**
 * Sending email
 */
export const sendEmail = async (req, res) => {
  const { uuid, emailTo, emailFrom } = req.body;

  // validate request
  if (!uuid || !emailTo || !emailFrom) {
    return res.status(422).send({ error: "All Fileds are Required" });
  }

  // get data from database
  const file = await File.findOne({ uuid: uuid });

  // if sender already exists
  if (file.sender) {
    return res.status(422).send({ error: "email already send" });
  }

  // save emailFrom and emailTo in database
  file.sender = emailFrom;
  file.receiver = emailTo;
  const response = await file.save();

  // send email
  SendMail({
    from: emailFrom,
    to: emailTo,
    subject: "fileShare file Sharing",
    text: `${emailFrom} shared a file with you`,
    html: emailTemplate({
      emailFrom: emailFrom,
      downloadLink: `${process.env.CLIENT_BASE_URL}/files/${file.uuid}`,
      size: parseInt(file.size / 1000) + " KB",
      expires: "24 hours",
    }),
  });
  return res.status(200).send({ success: "Email Send" });
};
