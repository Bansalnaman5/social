const passport=require('passport');
const { model } = require('../models/user');
const LocalStrategy=require('passport-local').Strategy;
const user=require('../models/user');

passport.use(new LocalStrategy({
    usernameField:'email'
},
function(email,password,done){
    user.findOne({email:email},function(err,us){
        if(err){
            console.log('error in finding');
            return done(err);
        }
        if(!us || us.password!=password){
            console.log("invalid user or password!! chal  hat");
            return done(null,false);
        }
        return done(null,us);
    });
}
));

// serializing the user to decide which key is to be put in cookies

passport.serializeUser(function(us,done){
    done(null,us.id);
});

// deserailizing the user from keys in cookies

passport.deserializeUser(function(id,done){
    user.findById(id,function(err,us){
        if(err){
            console.log('error in finding user!! chal hat');
            return done(err);
        }
        return done(null,us);
    });
});

passport.checkAuthentication=function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    return res.redirect('/users/signin');
}

passport.setAuthenticatedUser=function(req,res,next){
    if(req.isAuthenticated){
        res.locals.user=req.user;
    }
    next();
}


module.exports=passport;