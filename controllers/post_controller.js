const post=require('../models/post')
const comments=require('../models/comments');
const Like=require('../models/like');

module.exports.create_post=async function(req,res){
    try{
        let posts=await post.create({
            content:req.body.content,
            user:req.user._id
        });        
        if(req.xhr){
            posts=await posts.populate('user','name').execPopulate();
            return res.status(200).json(
                {
                    data:
                    {
                        posts:posts
                    },
                    message:"post successfull"
                });
        }
        req.flash('success','Post published!!');
        return res.redirect('back');
    }
    catch(err){
        console.log('error aya post creation men!!');
        return;
    }

}

module.exports.destroy=async function(req,res){
    try{

        let posts=await post.findById(req.params.id);
        // .id means string of _id
        if(posts.user==req.user.id){
            await Like.deleteMany({likeable:posts,onModel:'Post'});
            await Like.deleteMany({_id:{$in:posts.comments}});
            posts.remove();
            await comments.deleteMany({post:req.params.id});

            if(req.xhr){
                return res.status(200).json({
                    data:{
                        post_id:req.params.id
                    },
                    message:"Post Deletd "
                });
            }

            return res.redirect('back');
            
        }
        else{
            res.redirect('back');
        }
    }
    catch(err){
        console.log("error agaya post destruction men!!");
        return;
    }
    }
    