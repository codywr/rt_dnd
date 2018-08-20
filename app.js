
const express = require('express');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser'); // TODO: Part of express?

const authRouter = require('./src/routes/auth');
const adminRouter = require('./src/routes/admin');
const gamesRouter = require('./src/routes/games');

const port = 3000;

const app = express();

//
// Parse req (TODO: bodyParser is now part of express?)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

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
app.use('/Auth', authRouter);
app.use('/Games', gamesRouter);
app.use('/Chat', chatRouter);

chatRouter.route('/').get((req, res) => {
  res.send('Hello chat');
});

app.get('/', (req, res) => {
  res.render('auth'); // Landing page is sign in / sign up
  // TODO: Check for existing session and skip if one exists
});

//
// Start listening for connections
// app.listen(port, (err) => {
app.listen(port, () => {
  console.log('Real Time D&D app listening on port %s', port);
});
