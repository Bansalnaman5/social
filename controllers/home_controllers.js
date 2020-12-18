const post=require('../models/post');
const User=require('../models/user');
const comments=require('../models/comments');
const { model } = require('../models/comments');
module.exports.base=function(req,res){
    // post.find({},function(err,posts){
    //     if(err){
    //         console.log("error fetching posts!!Chal side ho");
    //         return;
    //     }
    //     for(p of posts){
    //         const id=p.user;
    //         user.findById(id,function(err,username){
    //             if(err){
    //                 console.log("error in finding from user!!");
    //                 return;
    //             }
    //             // console.log(username.name);
    //             p.user=username.name;
    //             console.log(p.user);
    //         });
    //     }
        
    //     return res.render('intro',{
    //         posts:posts
    //     });
    // });

    post.find({})
    .populate('User')
    .populate({
        path:'comment'
        // populate:{
        //     path:'user'
        // }

    })
    .exec(function(err,posts){
        if(err){
            console.log("error fetching posts!!Chal side ho");
            return;
        }
        
        return res.render('intro',{
            posts:posts
        });
    });
    
};

module.exports.prof=function(req,res){
    // post.find({},function(err,posts){
    //     if(err){
    //         console.log("error fetching posts!!Chal side ho");
    //         return;
    //     }
    //     return res.render('home',{
    //         posts:posts
    //     });
    // });
    post.find({}).populate('user')
    .populate({
        path:'comment',
        populate:{
            path:'user',
            model:'User'
        }

    })
    .exec(function(err,posts){
        if(err){
            console.log(err);
            console.log("error fetching posts!!Chal side ho");
            return;
        }

        User.find({},function(err,allusers){
            return res.render('home',{
                posts:posts,
                allusers:allusers
            });
        });
        
        
    });
}