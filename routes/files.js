import express from "express";
import { sendEmail, storeFileIntoDB } from "../controllers/files.js";
import { getStorage, ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { firebaseConfig } from "../config/firebaseConfig.js";
import multer from "multer";

const router = express.Router();

//Initialize a firebase application
initializeApp(firebaseConfig);

// Initialize Cloud Storage and get a reference to the service
const storage = getStorage();

// Setting up multer as a middleware to grab photo uploads
const upload = multer({ storage : multer.memoryStorage() });


//store file
router.post("/", upload.single("myfile") , storeFileIntoDB);
// sending eamil
router.post("/send" , sendEmail);

export { router };
