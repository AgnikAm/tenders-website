import { Request, Response } from 'express';
import { getDBConnection } from '../utils/db';
import { getAllTenders, getTenderById, getOffersForTender } from '../models/tenderModel';

export const listActiveTenders = async (req: Request, res: Response) => {
  const allTenders = await getAllTenders();
  const now = new Date();

  const activeTenders = allTenders.filter(tender =>
    new Date(tender.startDate) <= now && new Date(tender.endDate) >= now
  );

  res.render('tenders', { tenders: activeTenders });
};

export const listFinishedTenders = async (req: Request, res: Response) => {
  const allTenders = await getAllTenders();
  const now = new Date();

  const finishedTenders = allTenders.filter(tender =>
    new Date(tender.endDate) < now
  );

  res.render('tendersFinished', { tenders: finishedTenders });
};

export const getTenderDetails = async (req: Request, res: Response): Promise<any> => {
  const tenderId = req.params.id;
  const tender = await getTenderById(tenderId);

  if (!tender) {
    return res.status(404).send('Przetarg nie znaleziony');
  }

  const now = new Date();
  const isActive = new Date(tender.startDate) <= now && new Date(tender.endDate) >= now;

  res.render('tenderDetails', { tender, isActive });
};

export const getFinishedTenderDetails = async (req: Request, res: Response): Promise<any> => {
  const tenderId = req.params.id;
  const tender = await getTenderById(tenderId);

  if (!tender) {
    return res.status(404).send('Przetarg nie znaleziony');
  }

  const offers = await getOffersForTender(tenderId);

  const validOffers = offers
    .filter(o => o.offerValue <= tender.maxBudget)
    .sort((a, b) => a.offerValue - b.offerValue);

  res.render('tendersFinishedDetails', {
    tender,
    offers: validOffers,
    noValidOffers: validOffers.length === 0
  });
};

export const addTender = async (req: Request, res: Response) => {
  const { title, institution, description, startDate, endDate, maxBudget } = req.body;

  const db = await getDBConnection();
  await db.run(`
    INSERT INTO tenders (title, description, institution, startDate, endDate, maxBudget)
    VALUES (?, ?, ?, ?, ?, ?)
  `, [title, description, institution, startDate, endDate, maxBudget]);

  console.log('New tender added');
  res.redirect('/tenders');
};
