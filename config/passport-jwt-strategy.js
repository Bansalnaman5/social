const passport=require('passport');
const jwtstrategy=require('passport-jwt').Strategy;
const extractjwt=require('passport-jwt').ExtractJwt;

const user=require('../models/user');

let opts={
    jwtFromRequest:extractjwt.fromAuthHeaderAsBearerToken(),
    secretOrKey:'naman'
}

passport.use(new jwtstrategy(opts,function(jwtPayLoad,done){
    user.findById(jwtPayLoad._id,function(err,us){
        if(err){
            console.log("error in finding user from jwt");
            return;
        }
        if(us){
            return done(null,us);
        }
        else{
            return done(null,false);
        }
    })
}));

module.exports=passport;