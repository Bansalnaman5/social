const { urlencoded } = require('express');
const express=require('express');
const cookieparser=require('cookie-parser');
const app=express();
const port=8000;
const db=require('./config/mongoose');
const expresslayouts=require('express-ejs-layouts');
app.use(expresslayouts);
const passport=require('passport');
const googlePassport=require('./config/passport-google-oauth2-strategy');
const session=require('express-session');
const passportLocal=require('./config/passport_local_stratergy');
const passportjwt=require('./config/passport-jwt-strategy');
const mongostore=require('connect-mongo')(session);
const sassmiddleware=require('node-sass-middleware');
const flash=require('connect-flash');
const customfalshm=require('./config/flashmiddle');


const { setAuthenticatedUser } = require('./config/passport_local_stratergy');
const { MongoStore } = require('connect-mongo');
// extract styes and scripts from subpages
app.use(sassmiddleware({
    src:'./static/scss',
    dest:'./static/css',
    debug:true,
    outputStyle:'extended',
    prefix:'/css'
}));
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);
app.use(express.urlencoded({extended:true}));
app.use(cookieparser());
app.use(express.static('static'));

// app.use('/',require('./routes/'));
// app.use('/users',require('./routes/users'));
app.set('view engine','ejs');
app.set('views','./views');

app.use(session({
    name:'Social',
    secret:"something",
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
    },
    store:new mongostore(
    {
        mongooseConnection:db,
        autoRemove:'disabled'
    },function(err){
        console.log(err || 'connected to mongo store successfully!!');
    })
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customfalshm.setFlash);
app.use('/uploads',express.static(__dirname+'/uploads'));
app.use('/',require('./routes'));
app.use('/users',require('./routes/users'));
app.use('/post',require('./routes/post'));
app.use('/comments',require('./routes/comments'))


app.listen(port,function(err){
    if(err){
        console.log("server not running due to ",err);
        return;
        
    }
    console.log("server running on port ",port);

});