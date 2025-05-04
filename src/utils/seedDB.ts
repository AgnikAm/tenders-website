import { getDBConnection } from './db';

(async () => {
  const db = await getDBConnection();

  await db.run(`
    INSERT INTO tenders (title, description, institution, startDate, endDate, maxBudget)
    VALUES
      ('Modernizacja oświetlenia ulicznego', 'Wymiana lamp sodowych na LED w centrum miasta', 'Urząd Miasta Kraków', '2025-05-01T08:00:00', '2025-05-10T16:00:00', 50000.00),
      ('Budowa boiska szkolnego', 'Nowe boisko wielofunkcyjne przy SP nr 5', 'Gmina Zielona', '2025-05-03T09:00:00', '2025-05-15T15:00:00', 120000.00),
      ('Dostawa komputerów', 'Zakup i dostawa 50 laptopów dla szkoły', 'Zespół Szkół Technicznych', '2025-05-02T08:30:00', '2025-05-12T14:00:00', 75000.00);
  `);

  await db.run(`
    INSERT INTO tenders (title, description, institution, startDate, endDate, maxBudget)
    VALUES
      ('Remont dachu szkoły', 'Kompleksowy remont dachu SP nr 12', 'Urząd Miasta Gdańska', '2024-03-01T08:00:00', '2024-03-10T16:00:00', 80000.00),
      ('Zakup sprzętu medycznego', 'Dostawa aparatów EKG i defibrylatorów', 'Szpital Wojewódzki', '2024-04-01T09:00:00', '2024-04-10T15:00:00', 100000.00);
  `);

  const endedTenders = await db.all(`SELECT id FROM tenders WHERE endDate < datetime('now')`);

  if (endedTenders.length >= 2) {
    const [t1, t2] = endedTenders;

    await db.run(`
      INSERT INTO offers (tenderId, bidderName, offerValue)
      VALUES
        (${t1.id}, 'Firma DachPol', 75000.00),
        (${t1.id}, 'RemBud Sp. z o.o.', 85000.00),
        (${t1.id}, 'Dachy Nowak', 90000.00),

        (${t2.id}, 'MedTech Solutions', 95000.00),
        (${t2.id}, 'Zdrowie Plus', 102000.00),
        (${t2.id}, 'Tech-Med', 99000.00);
    `);
  }

  console.log('Sample tenders inserted.');
  await db.close();
})();
