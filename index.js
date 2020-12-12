const { urlencoded } = require('express');
const express=require('express');
const cookieparser=require('cookie-parser');
const app=express();
const port=8000;
const db=require('./config/mongoose');
const expresslayouts=require('express-ejs-layouts');
app.use(expresslayouts);
const passport=require('passport');
const session=require('express-session');
const passportLocal=require('./config/passport_local_stratergy');
// extract styes and scripts from subpages
app.set('layout extractStyles',true);
app.set('layout extrcatScripts',true);
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
        maxAge:(1000*60*10)
    }
}));

app.use(passport.initialize());
app.use(passport.session());
app.use('/',require('./routes/'));
app.use('/users',require('./routes/users'));


app.listen(port,function(err){
    if(err){
        console.log("server not running due to ",err);
        return;
        
    }
    console.log("server running on port ",port);

});