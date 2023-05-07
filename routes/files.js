import express from "express";
import { sendEmail, storeFileIntoDB } from "../controllers/files.js";

const router = express.Router();

//store file
router.post("/", storeFileIntoDB);
// sending eamil
router.post("/send" , sendEmail);

export { router };
