const user=require('..//models/user');
const { use } = require('../routes');

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
    user.findOne({email:req.body.email},function(err,us){
        if(err){
            console.log('user already exists');
            return;
        }
        if(!us){
            user.create(req.body,function(err,us){
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
    user.findById(req.params.id,function(err,u){
        return res.render('user_profile',{
            u:u
        });
    });
}

module.exports.userupdate=function(req,res){
    if(req.user.id=req.params.id){
        user.findByIdAndUpdate(req.params.id,req.body,function(err,us){
            return res.redirect('back');
        });
    }else{
        return res.status(401).send("Jyada bakaiti mat karo. Kuut denge yahin par");
    }
};