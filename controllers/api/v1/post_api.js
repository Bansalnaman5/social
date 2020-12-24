const post=require('../../../models/post');
const User=require('../../../models/user');
const comments=require('../../../models/comments');


module.exports.index=async function(req,res){
    let posts= await post.find({}).sort('-createdAt').populate('user',"_id name email")
        .populate({
            path:'comment',
            select:{'password':0,},
            populate:{
                path:'user',
                model:'User',
                select:{'password':0,}
            }
            
        });

    return res.json(200,{
        message:"List of Posts",
        posts:posts
    })
}

module.exports.destroy=async function(req,res){
    try{

        let posts=await post.findById(req.params.id);
        // .id means string of _id
        if(posts.user==req.user.id){
            posts.remove();
            await comments.deleteMany({post:req.params.id});
            return res.json(200,{
                message:'Post and associated comments deletd successfully!!'
            });
            
        }
        else{
            return res.json(401,{
                message:'chal hat! you cannot delete this post.'
            });
        }
    }
    catch(err){
        // console.log("error agaya post destruction men!!");
        return res.json(200,{
            message:'Internal Server error'
        });
    }
    }