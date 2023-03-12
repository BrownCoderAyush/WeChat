const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

io.on('connection', (socket) => {
    console.log('a user connected');
    console.log(socket.id);
    socket.on('from-client',()=>{
        console.log('received from client side');
    })
    setInterval(()=>{
        socket.emit('from-server');
    },2000)
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
});


app.use(express.static(__dirname+'/public'));

server.listen(3000, () => {
    console.log('listening on *:3000');
});

