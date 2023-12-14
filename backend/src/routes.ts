import express from "express";
import { processData } from "./controller/processController";

const router = express.Router();

router.post("/processData", processData);

export default router;
