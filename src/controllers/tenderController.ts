import { Request, Response } from 'express';
import { getAllTenders } from '../models/tenderModel';

export const listActiveTenders = async (req: Request, res: Response) => {
  const allTenders = await getAllTenders(); // pobierz wszystkie przetargi
  const now = new Date();

  const activeTenders = allTenders.filter(tender =>
    new Date(tender.startDate) <= now && new Date(tender.endDate) >= now
  );

  res.render('tenders', { tenders: activeTenders });
};