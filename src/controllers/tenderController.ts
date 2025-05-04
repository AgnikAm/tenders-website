import { Request, Response } from 'express';
import { getAllTenders, getTenderById } from '../models/tenderModel';

export const listActiveTenders = async (req: Request, res: Response) => {
  const allTenders = await getAllTenders();
  const now = new Date();

  const activeTenders = allTenders.filter(tender =>
    new Date(tender.startDate) <= now && new Date(tender.endDate) >= now
  );

  res.render('tenders', { tenders: activeTenders });
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
