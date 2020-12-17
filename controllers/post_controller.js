const post=require('../models/post')
const comments=require('../models/comments');

module.exports.create_post=function(req,res){
    console.log(req.user.name);
    post.create({
        content:req.body.content,
        user:req.user._id
    },function(err,post){
        if(err){
            console.log('Error creating post!!Chal side ho');
            return;
        }
        return res.redirect('back');
    });
}

module.exports.destroy=function(req,res){
    post.findById(req.params.id,function(err,posts){
        // .id means string of _id
        if(posts.user==req.user.id){
            posts.remove();
            comments.deleteMany({post:req.params.id},function(err){
                return res.redirect('back');
            })
        }
        else{
            res.redirect('back');
        }
    });
}