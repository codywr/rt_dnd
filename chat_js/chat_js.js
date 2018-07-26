
var app = require ('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
    res.sendFile(__dirname + '/chat_js.html');
});

io.on('connection', function(socket){
    io.emit('user connect');

    socket.on('chat message', function(msg){
        io.emit('chat message', msg);
        // I think this might help with private messaging
        //socket.broadcast.emit(msg);
    });

    socket.on('disconnect', function(){
        io.emit('user disconnect');
    });
});

http.listen(3000, function(){
    console.log('listening on *:3000');
});

