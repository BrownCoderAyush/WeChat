var socket = io();


let btn = document.getElementById('btn');
let inputMsg = document.getElementById('input');
let msg = document.getElementById('messages');


btn.onclick = function (){

    const text = inputMsg.value ;
    inputMsg.value = '';
    socket.emit('msg_send' , {
        msg : text
    })
    
}


socket.on('msg_received' , (data)=>{
    const li = document.createElement('li');
    li.innerText = data.msg;
    msg.append(li);
})