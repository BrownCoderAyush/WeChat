var socket = io();

socket.on('from-server' , ()=>{
    const element = document.createElement('div');
    element.innerHTML = "hey received an from-server event";
    document.body.append(element);
})

setInterval(()=>{
    socket.emit('from-client');
},2000);