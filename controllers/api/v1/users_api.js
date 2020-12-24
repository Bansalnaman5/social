const User=require('../../../models/user');
const jwt=require('jsonwebtoken');

module.exports.createSession=async function(req,res){
    try{

        let user=await User.findOne({email:req.body.email});
        if(!user || user.password!=req.body.password){
            return res.json(422,{
                message:"Apna rasta naap le chal!!!"
            });
        }
        return res.json(200,{
            message:'Successfull Log in!!,find the token attached.',
            data:{
                token:jwt.sign(user.toJSON(),'naman',{expiresIn:'6000000'})
            }
        })
    }
    catch(err){
        console.log("<<<<<<<>>>>>>>",err);
        return res.json(500,{
            message:'Internal server error!!'
        });
    }

}