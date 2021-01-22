class ChatEngine{
    constructor(chatBoxId,UserEmail){
        this.ChatBox=$(`#${chatBoxId}`);
        this.UserEmail=UserEmail;
        this.socket=io.connect('http://localhost:5000');
        if(this.UserEmail){
            this.connectHandler();
        }
    }
    connectHandler(){

        let self=this;

        this.socket.on('connect',function(){
            console.log('connection established using sockets!!');

            self.socket.emit('join_room',{
                user_email:self.UserEmail,
                Chatroom:'SocialRoom'
            });
            self.socket.on('new_user_joined',function(data){
                console.log('user joined detailes are : ',data);
            })
        });
        $('#send-msg').click(function(){
            let msg=$('#chat-msg-input').val();
            if(msg!=''){
                self.socket.emit('sent_msg',{
                    message:msg,
                    user_email:self.UserEmail,
                    Chatroom:'SocialRoom'
                });
            }
        });
        self.socket.on('recieve_msg',function(data){
            console.log('recieved message is :',data.message);
            
            let newMessage=$('<li>');
            let messageType='others-msg';
            if(data.user_email==self.UserEmail){
                messageType='my-msg';
            }
            newMessage.append($('<span>',{
                'html':data.message
            }));
            newMessage.append($('<sub>',{
                'html':data.user_email
            }));
            newMessage.addClass(messageType);
            $('#chat-msg-list').append(newMessage);
        })
    }
}