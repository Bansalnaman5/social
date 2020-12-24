const mongoose=require('mongoose');
const multer=require('multer');
const path=require('path');
const { createBrotliCompress } = require('zlib');
const avatar_path=path.join('/uploads/users/avatar');
const userSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    avatar:{
        type:String
    }
},{
    timestamps:true
});

let storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,path.join(__dirname,'..',avatar_path));
    },
    filename:function(req,file,cb){
        cb(null,file.fieldname+'_'+Date.now());
    }
});
userSchema.statics.uploaded_avatar=multer({storage:storage}).single('avatar');
userSchema.statics.avatarpath=avatar_path;

const User=mongoose.model('User',userSchema);
module.exports=User