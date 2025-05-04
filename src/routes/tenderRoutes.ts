import express from 'express';
import { listActiveTenders, getTenderDetails } from '../controllers/tenderController';

const router = express.Router();

router.get('/', (req, res) => {
  res.render('index');
});

router.get('/tenders', listActiveTenders);
router.get('/tenders/:id', getTenderDetails);

export default router;
