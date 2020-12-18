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

module.exports.destroy=function(req,res){
    comment.findById(req.params.id,function(err,comment){
        post.findById(comment.post,function(err,p){
            if((comment.user==req.user.id) || (req.user.id==p.user)){
                let pid=comment.post;
                comment.remove();
                post.findByIdAndUpdate(pid,{$pull:{comment:req.params.id}},function(err,posts){
                    return res.redirect('back');
                });
            }
            else{
                return res.redirect('back');
            }

        });
        
    });
}