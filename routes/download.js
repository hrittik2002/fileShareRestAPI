import express from "express";
import { downloadFile } from "../controllers/download.js";

const router = express.Router();

// download file
router.get("/:uuid", downloadFile);

export { router };
