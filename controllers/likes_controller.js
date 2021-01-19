const Like=require('../models/like');
const Post=require('../models/post');
const Comment=require('../models/comments');
const User=require('../models/user');

module.exports.toggle_like=async function(req,res){
try{
    let likeable;
    let deleted = false;
    
    if(req.query.type=='Post'){
        likeable=await Post.findById(req.query.id).populate('likes');
    }
    else{
        likeable=await Comment.findById(req.query.id).populate('likes');
    }

    let existinglike=await Like.findOne({
        likeable:req.query.id,
        onModel:req.query.type,
        user:req.user.id
    });
    
    if(existinglike){
        likeable.likes.pull(existinglike._id);
        likeable.save();
        existinglike.remove();
        deleted=true;
    }
    else{
        let newLike=await Like.create({
            user:req.user._id,
            likeable:req.query.id,
            onModel:req.query.type
        });
        likeable.likes.push(newLike._id);
        likeable.save();
    }
    return res.status(200).json({
        message:'Request Successfull',
        data:{
            deleted:deleted
        }

    })

}
catch(err){
    console.log('error in liking ',err);
    return res.json(500,{
        message:'HeHeHe !!Internal Server Error!! '
    })
}

}