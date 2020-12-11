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
    
}
module.exports.createSession=function(req,res){

}