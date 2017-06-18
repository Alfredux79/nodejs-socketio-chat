var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(express.static('client'));

app.get('/echo',function(req,res){
    console.log("echo");
    res.status(200).send("echo");
});

var messages = [{
    id: 1,
    text: 'Welcome to the demo chat room',
    nickname: 'demo chat bot'
}];

io.on('connection',function(socket){
    console.log("Connection from: "+socket.handshake.address);

    socket.emit('messages', messages);

    socket.on('add-message', function(data){
        messages.push(data);
        io.sockets.emit('messages', messages);
    });
});

server.listen(6677,function(){
    console.log("Server is up [http://localhost:6677]");
});