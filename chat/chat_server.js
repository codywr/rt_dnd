
const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/chat_client.html`);
});

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

const server = http.listen(3000, () => {
  console.log('Real Time D&D app listening on port %s', server.address().port);
});

function getTimeStr() {
  return `(${new Date().toLocaleString()}):`;
}
