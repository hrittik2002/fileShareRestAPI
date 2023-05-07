import express from "express";
import { showDownloadPageDetails } from "../controllers/show.js";

const router = express.Router();

// return download file page details
router.get("/:uuid", showDownloadPageDetails);

export { router };
