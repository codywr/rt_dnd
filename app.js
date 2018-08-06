
const express = require('express');

const app = express();

const port = 3000;

app.use(express.static('public'));
app.use(express.static('src/views'));

app.get('/', (req, res) => {
  res.send();
});

// app.listen(port, (err) => {
app.listen(port, () => {
  console.log('Real Time D&D app listening on port %s', port);
});
