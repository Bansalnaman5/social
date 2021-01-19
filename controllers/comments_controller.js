const comment=require('../models/comments');
const post=require('../models/post');
const user=require('../models/user');
const commentsmailer=require('../mailers/comments_mailer');
const emailworker=require('../workers/comment_email_worker');
const queue=require('../config/kue');
const Like = require('../models/like');

module.exports.create_comments=async function(req,res){
    try{

        let posts=await post.findById(req.body.post);
        if(posts){
            let comments=await comment.create({
            content:req.body.content,
            post:req.body.post,
            user:req.user._id });
            posts.comment.push(comments);
            posts.save();
            c=await comments.populate({path:'user',model:user,select:{'password':0}}).execPopulate();
            // commentsmailer.newComment(c);
            let job=queue.create('commentemails',c).save(function(err){
                if(err){
                    console.log('error in job assigning',err);
                    return;
                }
                console.log('job enqued with id ',job.id);
            });
            if(req.xhr){
                
                return res.status(200).json({
                    data:{
                        comment:c
                    },
                    message:'Comment created'
                });
                
            }
            res.redirect('/users/profile')
            
            
        };
    }
    catch(err){
        console.log("error aoccured",err);
    }
}

module.exports.destroy= async function(req,res){
    try{

        let coment=await comment.findById(req.params.id);
        let p=await post.findById(coment.post);
        if((coment.user==req.user.id) || (req.user.id==p.user)){
            let pid=coment.post;
            coment.remove();
            let posts=await post.findByIdAndUpdate(pid,{$pull:{comment:req.params.id}});
            await Like.deleteMany({likeable:coment._id,onModel:'Comment'});
            if(req.xhr){
                return res.status(200).json({
                    data:{
                        comment_id:req.params.id
                    },
                    message:"comment deleted"
                });
            }
            req.flash("success",'comment deleted');
            
            return res.redirect('back');
        }
        else{
            req.flash('error','chal hat!!');
            return res.redirect('back');
        }      
    }
    catch(err){
        console.log("error in commment destruction!!");
        return;
    }
}