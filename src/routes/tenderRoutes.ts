import express from 'express';
import { listActiveTenders } from '../controllers/tenderController';

const router = express.Router();

router.get('/', (req, res) => {
    res.render('index');
});

router.get('/tenders', listActiveTenders);

export default router;
