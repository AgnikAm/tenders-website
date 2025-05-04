import express from 'express';
import { listTenders } from '../controllers/tenderController';

const router = express.Router();

router.get('/', (req, res) => {
    res.render('index');
});

router.get('/tenders', listTenders);

export default router;
