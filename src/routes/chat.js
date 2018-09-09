
const express = require('express');

const chatRouter = express.Router();

chatRouter.route('/').get((req, res) => {
  res.render('chat');
});

module.exports = chatRouter;
