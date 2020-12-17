const mongoose=require('mongoose');


const commentschema=new mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    post:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'post'
    }
},{
    timestamps:true
}) ;

const comments=mongoose.model('comments',commentschema);
module.exports=comments;