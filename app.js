
const express = require('express');
const adminRouter = require('./src/routes/admin');

const port = 3000;

const app = express();

//
// Routes
const chatRouter = express.Router();
app.use('/Admin', adminRouter);
app.use('/Chat', chatRouter);

chatRouter.route('/').get((req, res) => {
  res.send('Hello chat');
});

//
// Defualts
app.use(express.static('public'));
app.use(express.static('src/views'));

app.get('/', (req, res) => {
  res.send();
});


//
// Start listening for connections
// app.listen(port, (err) => {
app.listen(port, () => {
  console.log('Real Time D&D app listening on port %s', port);
});
