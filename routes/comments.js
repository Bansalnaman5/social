const comments_controller=require('../controllers/comments_controller');
const express=require('express');
const passport=require('passport');
const router=express.Router();

router.post('/create-comment',passport.checkAuthentication,comments_controller.create_comments);

module.exports=router;