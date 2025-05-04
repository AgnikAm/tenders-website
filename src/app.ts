import express from 'express';
import path from 'path';
import tenderRoutes from './routes/tenderRoutes';

const app = express();
const expressLayouts = require('express-ejs-layouts');
const PORT = 3000;

app.set('view engine', 'ejs');
app.use(expressLayouts);
app.set('layout', 'layouts/main');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', tenderRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
