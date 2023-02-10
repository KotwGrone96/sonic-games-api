const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const router = require('../router');

const app = express();

const port = process.env.PORT || 3000;

app.use(cors());
app.use(morgan('dev'));
app.use('/sonic-games-api', express.static(`${__dirname}/../public`));
app.use('/sonic-games-api', router);
app.use((req, res) => {
  res.status(404).json({ error: 404, msg: 'Page not found' });
});

app.listen(port, () => {
  console.log(`Servidor abierto en el puerto http://localhost:${3000}/sonic-games-api`);
});
