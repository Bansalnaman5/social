const comment=require('../models/comments');
const post=require('../models/post');

module.exports.create_comments=function(req,res){
    post.findById(req.body.post,function(err,posts){
        if(posts){
        comment.create({
            content:req.body.content,
            post:req.body.post,
            user:req.user._id
        },function(err,comments){
            if(err){
            console.log("apni aukat men raho suar!!");
            return;
            }
            posts.comment.push(comments);
            posts.save();
            res.redirect('/users/profile')
        });
    };
});
};