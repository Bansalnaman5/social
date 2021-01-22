
module.exports.chatSockets=function(socketServer){
    let io=require('socket.io')(socketServer,{
        cors:{
            origin:"http://localhost:8000",
            methods:['GET','POST']
        }
    });
    io.sockets.on('connection',function(socket){
        console.log('new connection recieved....!!',socket.id);

        socket.on('disconnect',function(){
            console.log('socket disconnected');
        });

        socket.on('join_room',function(data){
            console.log('joining request data is :',data);
            socket.join(data.Chatroom);
            io.in(data.Chatroom).emit('new_user_joined',data);
        });
        socket.on('sent_msg',function(data){
            io.in(data.Chatroom).emit('recieve_msg',data);
        });
    });

}