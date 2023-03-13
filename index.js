const express = require('express');
const app = express();
const path = require('path');
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const connect = require('./src/config/database.js');

// set the view engine to ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/src/views'));

io.on('connection', (socket) => {
    console.log('a user connected', socket.id);
    console.log(socket.id);
    socket.on('msg_send',(body)=>{
        console.log(body);
        io.emit('msg_received' , body);
    })
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
});


// app.use(express.static(__dirname+'/public'));


app.get('/chat/:roomId',(req,res)=>{
    res.render('index',{
        name : "Ayush"
    })
})
server.listen(3000, async() => {
    await connect();
    console.log('listening on *:3000');
});

