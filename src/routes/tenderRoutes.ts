import express from 'express';
import { listTenders } from '../controllers/tenderController';

const router = express.Router();

router.get('/tenders', listTenders);

export default router;
