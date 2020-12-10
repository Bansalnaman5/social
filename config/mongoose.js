const mongoose=require('mongoose');
mongoose.connect("mongodb://localhost/social_datbase");
const db=mongoose.connection;
db.on('error',console.error.bind(console,"error aagaya!!"));
db.once('open',function(){
    console.log("connected");
});
module.exports=db;