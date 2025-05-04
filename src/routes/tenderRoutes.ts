import express from "express";
import {
  listActiveTenders,
  getTenderDetails,
  listFinishedTenders,
  getFinishedTenderDetails,
  addTender,
} from "../controllers/tenderController";

const router = express.Router();

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/tenders", listActiveTenders);
router.get("/tenders/:id", getTenderDetails);

router.get("/finished-tenders", listFinishedTenders);
router.get("/finished-tenders/:id", getFinishedTenderDetails);

router.get("/add-tender", (req, res) => {
  res.render("addTender");
});

router.post("/add-tender", addTender);

export default router;
