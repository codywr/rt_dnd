
const express = require('express');
const handlebars = require('express-handlebars');
const adminRouter = require('./src/routes/admin');

const port = 3000;

const app = express();

//
// Views
app.use(express.static('public'));
app.set('views', './src/views');
app.engine('.hbs', handlebars({ extname: '.hbs' }));
app.set('view engine', '.hbs');

//
// Routes
const chatRouter = express.Router();
app.use('/Admin', adminRouter);
app.use('/Chat', chatRouter);

chatRouter.route('/').get((req, res) => {
  res.send('Hello chat');
});

app.get('/', (req, res) => {
  res.render('index');
});


//
// Start listening for connections
// app.listen(port, (err) => {
app.listen(port, () => {
  console.log('Real Time D&D app listening on port %s', port);
});
