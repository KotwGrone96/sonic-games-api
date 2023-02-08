/* eslint-disable comma-dangle */
/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
const express = require('express');
const connection = require('../db/connection');
const createArrResponse = require('../helpers/createArrayResponse');

const router = express.Router();

router.get('/games', (req, res) => {
  let { platform, genre } = req.query;
  let arrData = [];
  connection.query('SELECT * FROM `all-games-view` ORDER BY id ASC', (err, rows) => {
    arrData = rows;
    if (platform) {
      platform = platform
        .toLocaleLowerCase()
        .normalize('NFD')
        .replace('-', '')
        .replace(/[\u0300-\u036f]/g, '');
      arrData = rows.filter((row) => {
        const rowPlatform = row.platform
          .toLocaleLowerCase()
          .normalize('NFD')
          .replace(/\s+/, '')
          .replace(/[\u0300-\u036f]/g, '');
        return rowPlatform.includes(platform);
      });
    }
    if (genre) {
      genre = genre
        .toLocaleLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');
      arrData = rows.filter((row) => {
        const rowGenre = row.genre
          .toLocaleLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '');
        return rowGenre.includes(genre);
      });
    }
    const data = createArrResponse(arrData);
    res.json({ ok: true, msg: 'Consulta exitosa', data });
  });
});

router.get('/platforms', (req, res) => {
  connection.execute('SELECT * FROM `platforms` ORDER BY id_platform ASC', (err, rows) => {
    if (err) {
      res.json({ ok: false, msg: 'Ha ocurrido un error en la consulta', err });
      return;
    }
    res.json({ ok: true, msg: 'Consulta exitosa', data: rows });
  });
});

router.get('/genres', (req, res) => {
  connection.execute('SELECT * FROM `genres` ORDER BY id_genre ASC', (err, rows) => {
    if (err) {
      res.json({ ok: false, msg: 'Ha ocurrido un error en la consulta', err });
      return;
    }
    res.json({ ok: true, msg: 'Consulta exitosa', data: rows });
  });
});

router.get('/games/:id', (req, res) => {
  const { id } = req.params;
  connection.query(
    'SELECT * FROM `all-games-view` WHERE id_game = ? ORDER BY id ASC',
    [Number(id)],
    (err, rows) => {
      if (err) {
        res.json({ ok: false, msg: 'Ha ocurrido un error en la consulta', err });
        return;
      }
      if (rows.length === 0) {
        res.json({ ok: false, msg: 'No se ha encontrado el juego' });
        return;
      }
      const data = createArrResponse(rows);
      res.json({ ok: true, msg: 'Consulta exitosa', data });
    }
  );
});

module.exports = router;
