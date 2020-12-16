const post=require('../models/post')

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