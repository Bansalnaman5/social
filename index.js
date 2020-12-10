const { urlencoded } = require('express');
const express=require('express');
const app=express();
const port=8000;
const db=require('./config/mongoose');
const expresslayouts=require('express-ejs-layouts');
app.use(expresslayouts);
// extract styes and scripts from subpages
app.set('layout extractStyles',true);
app.set('layout extrcatScripts',true);
app.use(express.urlencoded({extended:true}));
app.use(express.static('static'));
app.use('/',require('./routes/index'))
app.set('view engine','ejs');
app.set('views','./views');





app.listen(port,function(err){
    if(err){
        console.log("server not running due to ",err);
        return;
        
    }
    console.log("server running on port ",port);

});