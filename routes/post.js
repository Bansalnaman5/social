const express=require('express');
const router=express.Router();
// const passport=require('passport');
const posts=require('../controllers/post_controller');

router.post('/create-post',posts.create_post)

module.exports=router;