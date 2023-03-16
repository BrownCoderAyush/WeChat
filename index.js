const express = require('express');
const app = express();
const path = require('path');
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const connect = require('./src/config/database.js');
const Chat = require('./src/models/chat.js');

// set the view engine to ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/src/views'));

io.on('connection', (socket) => {

    // join_room event handle 
    socket.on("join_room", (data) => {
        socket.join(data.roomId)
        console.log(data.roomId);
    })

    // msg_send event handle 
    socket.on('msg_send', async(body) => {
        // msg_received event emit
        const chat = await Chat.create({
            content : body.msg , 
            user : body.user , 
            roomId : body.roomId
        })
        io.to(body.roomId).emit('msg_received', body);
    })

    socket.on('typing',(body)=>{
        socket.broadcast.to(body.roomId).emit('someone_typing');
    })

    // socket disconnect
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

// render routes 
app.get('/chat/:roomId', async (req, res) => {
    const chats = await Chat.find({roomId : req.params.roomId});
    console.log(chats);
    res.render('index', {
        id: req.params.roomId , 
        chats : chats 
    })
})


server.listen(3000, async () => {
    await connect();
    console.log('listening on *:3000');
});

