const User = require('..//models/user');
// const user=require('..//models/user');
const { use } = require('../routes');
const fs=require('fs');
const path=require('path');

module.exports.signup=function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }


    return res.render('user_signup',{
        title:"Social | Sign_Up"
    });
};
module.exports.signin=function(req,res){
    if(req.isAuthenticated()){
        console.log("log in");
        return res.redirect('/users/profile');
    }
    return res.render('user_signin',{
        title:"Social | Sign_In"
    });
};

module.exports.create=function(req,res){
    if(req.body.password!=req.body.password1){
        return res.redirect('back');
    }
    User.findOne({email:req.body.email},function(err,us){
        if(err){
            console.log('user already exists');
            return;
        }
        if(!us){
            User.create(req.body,function(err,us){
                if(err){
                    console.log('error in creating user');
                    return
                }
                return res.redirect('/users/signin');
            })
        }else{
            return res.redirect('back');
        }
    })

}
module.exports.createSession=function(req,res){
    req.flash('success','Logged In!!');
    return res.redirect('/users/profile');
}

module.exports.signoutfunc=function(req,res){
    req.logout();
    req.flash('success','Logged out!!');    
    return res.redirect('/users/signin');
}

module.exports.userprofile=function(req,res){
    User.findById(req.params.id,function(err,u){
        return res.render('user_profile',{
            u:u
        });
    });
}

module.exports.userupdate=async function(req,res){
    // if(req.user.id=req.params.id){
    //     user.findByIdAndUpdate(req.params.id,req.body,function(err,us){
    //         return res.redirect('back');
    //     });
    // }else{
    //     return res.status(401).send("Jyada bakaiti mat karo. Kuut denge yahin par");
    // }
    if(req.user.id==req.params.id){
        try{
            let user=await User.findById(req.params.id);
            User.uploaded_avatar(req,res,function(err){
                if(err){
                    console.log("{{{{****Multer Error****}}}}",err);
                }
                user.name=req.body.name;
                user.email=req.body.email;
                if(req.file){
                    if(user.avatar){
                        fs.unlinkSync(path.join(__dirname,'..',user.avatar));
                    }
                    user.avatar=User.avatarpath+'/'+req.file.filename;
                }
                user.save();
                return res.redirect('back');
            });          
        }
        catch(err){
            req.flash('error',err);
            return res.redirect('back');
        }

    }
    else{
        req.flash('error','Unauthorized access denied!!');
        return res.status(401).send("Jyada bakaiti mat karo. Kuut denge yahin par");

    }
};