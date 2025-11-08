import express from "express";
import { getResults, saveResults } from "../controllers/resultController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/my-results",protect,getResults);
router.post("/save-results",protect,saveResults);

export default router;