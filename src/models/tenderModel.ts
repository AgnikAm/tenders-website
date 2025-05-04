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