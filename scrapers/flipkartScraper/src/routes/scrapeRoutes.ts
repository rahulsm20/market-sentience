import express from "express";
import auth from "../middleware/auth"
import { getScrapedData, postScrapedData } from "../controllers/items";
const router = express.Router();

router.post('/',auth,postScrapedData);
router.get('/',auth,getScrapedData)

export default router
