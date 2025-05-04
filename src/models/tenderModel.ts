import { getDBConnection } from "../utils/db";

export const getAllTenders = async () => {
  const db = await getDBConnection();
  const rows = await db.all('SELECT * FROM tenders');
  return rows;
};

export const getTenderById = async (id: string) => {
  const db = await getDBConnection();
  const row = await db.get('SELECT * FROM tenders WHERE id = ?', [id]);
  return row;
};

export const getOffersForTender = async (tenderId: string) => {
  const db = await getDBConnection();
  const offers = await db.all(
    'SELECT * FROM offers WHERE tenderId = ?',
    [tenderId]
  );
  return offers;
};

export const addNewTender = async (title: string, institution: string, description: string, startDate: string, endDate: string, maxBudget: number) => {
  const db = await getDBConnection();
  await db.run(`
    INSERT INTO tenders (title, description, institution, startDate, endDate, maxBudget)
    VALUES (?, ?, ?, ?, ?, ?)
  `, [title, description, institution, startDate, endDate, maxBudget]);
};