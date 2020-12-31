const nodemailer=require('../config/nodemailer');

// another way of exxporting a method

exports.newComment=(comment) =>{
    let htmlstring=nodemailer.renderTemplate({comment:comment},'/comments/new_comment.ejs');

    nodemailer.transporter.sendMail({
        from:'Social Site',
        to:comment.user.email,
        subject:"New comment published",
        html:htmlstring
    },(err,info)=>{
        if(err){
            console.log('error in mailing',err);
            return;
        }
        console.log('mail delivered successfully!!',info);
    });
    
}