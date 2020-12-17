const express=require('express');
const router=express.Router();
const passport=require('passport');
const posts=require('../controllers/post_controller');

router.post('/create-post',passport.checkAuthentication,posts.create_post)
router.get('/destroy/:id',passport.checkAuthentication,posts.destroy)

module.exports=router;