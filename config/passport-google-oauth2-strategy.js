const passport=require('passport');
const googlestrategy=require('passport-google-oauth').OAuth2Strategy;
const crypto =require('crypto');
const User=require('../models/user');


passport.use(new googlestrategy({
        clientID:"829851708850-o85j7vjukoav3f4q8vuaspr084lqghob.apps.googleusercontent.com",
        clientSecret:"vYXaULqJJ87yRHf9Mj2FTq4z",
        callbackURL:"http://localhost:8000/users/auth/google/callback",

    },
    function(accessToken,refreshToken,profile,done){
        User.findOne({email:profile.emails[0].value}).exec(function(err,user){
            if(err){
                console.log("error in finding",err);
                return;
            }
            // console.log(profile);
            if(user){
                return done(null,user);
            }
            else{
                User.create({
                    name:profile.displayName,
                    email:profile.emails[0].value,
                    password:crypto.randomBytes(20).toString('hex')
                },function(err,user){
                    if(err){
                        console.log("error in creating user ",err);
                        return;
                    }
                    return done(null,user);
                });
            }
        })        
    }

));

module.exports=passport;