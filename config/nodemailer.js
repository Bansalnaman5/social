const nodemailer=require('nodemailer');
const ejs=require('ejs');
const path=require('path');

let transporter=nodemailer.createTransport({
    service:'gmail',
    host:'smtp.gmail.com',
    port:465,
    secure:false,
    auth:{
        user:'namanthecool786',
        pass:'Naman'
    }
});

let renderTemplate= (data,relativePath) => {
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname,'../views/mailers',relativePath),
        data,
        function(err,template){
            if(err){
                console.log('error in redering template!!');
                return;
            }
            mailHTML=template;
        }
    )
    return mailHTML;    
}

module.exports={
    transporter:transporter,
    renderTemplate:renderTemplate
}