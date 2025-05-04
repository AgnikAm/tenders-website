import express from 'express';
import { listActiveTenders, getTenderDetails, listFinishedTenders, getFinishedTenderDetails } from '../controllers/tenderController';

const router = express.Router();

router.get('/', (req, res) => {
  res.render('index');
});

router.get('/tenders', listActiveTenders);
router.get('/tenders/:id', getTenderDetails);

router.get('/finished-tenders', listFinishedTenders);
router.get('/finished-tenders/:id', getFinishedTenderDetails);

export default router;
