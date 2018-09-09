
const express = require('express');

const app = express();

const http = require('http').Server(app);
const io = require('socket.io')(http);
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser'); // TODO: Part of express?

const authRouter = require('./src/routes/auth');
const adminRouter = require('./src/routes/admin');
const gamesRouter = require('./src/routes/games');
const chatRouter = require('./src/routes/chat');

const port = 3000;

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
app.use('/Admin', adminRouter);
app.use('/Auth', authRouter);
app.use('/Games', gamesRouter);
app.use('/Chat', chatRouter);

app.get('/', (req, res) => {
  res.render('auth'); // Landing page is sign in / sign up
  // TODO: Check for existing session and skip if one exists
});

//
// Sockets for chat
// TODO: Seems like this ought to be in a separate file
io.on('connection', (socket) => {
  io.emit('user connect', getTimeStr());

  socket.on('chat message', (msg) => {
    io.emit('chat message', `${getTimeStr()} ${msg}`);
    // I think this might help with private messaging
    // socket.broadcast.emit(msg)
  });

  socket.on('disconnect', () => {
    io.emit('user disconnect', getTimeStr());
  });
});

// Helper function to add timestamps to chat messages
function getTimeStr() {
  return `(${new Date().toLocaleString()}):`;
}

//
// Start listening for connections
// app.listen(port, (err) => {
http.listen(port, () => {
  console.log('Real Time D&D app listening on port %s', port);
});
