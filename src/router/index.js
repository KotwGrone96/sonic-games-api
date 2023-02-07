const express = require('express');

const router = express.Router();

router.get('/games', (req, res) => {
  const { platform, genre } = req.query;
  if (platform) {
    console.log(`todos los juegos filtrados por plataforma ${platform}`);
  }
  if (genre) {
    console.log(`todos los juegos filtrados por género ${genre}`);
  }
  res.json({ msg: 'Todos los juegos' });
});
router.get('/platforms', (req, res) => {
  res.json({ msg: 'todas las plataformas' });
});
router.get('/genres', (req, res) => {
  res.json({ msg: 'todos los géneros' });
});
router.get('/games/:id', (req, res) => {
  const { id } = req.params;
  res.json({ msg: `Juego donde ID es ${id}` });
});

module.exports = router;
