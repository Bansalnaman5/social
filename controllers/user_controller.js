const user=require('..//models/user');
const { use } = require('../routes');

module.exports.signup=function(req,res){
    return res.render('user_signup',{
        title:"Social | Sign_Up"
    });
};
module.exports.signin=function(req,res){
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

}