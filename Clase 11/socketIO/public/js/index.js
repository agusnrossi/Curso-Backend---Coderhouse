const socket=io.connect();

socket.on('message',data =>{
    alert(data);
    socket.emit('notificacion','Mensaje recibido');
});


