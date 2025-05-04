import { getDBConnection } from './db';

(async () => {
  const db = await getDBConnection();

  await db.exec(`
    CREATE TABLE IF NOT EXISTS tenders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT,
      institution TEXT,
      startDate TEXT,
      endDate TEXT,
      maxBudget REAL
    );

    CREATE TABLE IF NOT EXISTS offers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      tenderId INTEGER,
      bidderName TEXT,
      offerValue REAL,
      submittedAt TEXT DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (tenderId) REFERENCES tenders(id)
    );
  `);

  console.log('Tables created');
  await db.close();
})();
