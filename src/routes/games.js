
const express = require('express');

const gamesRouter = express.Router();

gamesRouter.route('/').get((req, res) => {
  res.render('games');
});

module.exports = gamesRouter;
