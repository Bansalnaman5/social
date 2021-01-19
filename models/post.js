const mongoose=require('mongoose');
const { model } = require('./user');

const postschema=new mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    // include arrays of id of all comments
    comment:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'comments'
        }
    ],
    likes:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Like'
        }
    ]
    
},{
        timestamps:true
    
});

const post=mongoose.model('post',postschema);
module.exports=post;