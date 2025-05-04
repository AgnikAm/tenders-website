import { Request, Response } from 'express';
import { getAllTenders } from '../models/tenderModel';

export const listTenders = (req: Request, res: Response) => {
  const tenders = getAllTenders();
  res.render('tenders', { tenders });
};
