const post=require('../models/post')
const comments=require('../models/comments');

module.exports.create_post=async function(req,res){
    try{
        await post.create({
            content:req.body.content,
            user:req.user._id
        });        
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
            posts.remove();
            await comments.deleteMany({post:req.params.id});
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
    