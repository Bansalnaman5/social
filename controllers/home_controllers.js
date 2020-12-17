const post=require('../models/post');
const user=require('../models/user');

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

    post.find({}).populate('user').exec(function(err,posts){
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
    post.find({}).populate('user').exec(function(err,posts){
        if(err){
            console.log("error fetching posts!!Chal side ho");
            return;
        }
        
        return res.render('intro',{
            posts:posts
        });
    });
}