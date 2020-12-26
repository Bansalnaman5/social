const express=require('express');
const router=express.Router();
const userController=require('../controllers/user_controller');
const a=require('../controllers/home_controllers');
const passport=require('passport');
const { route } = require('./api');
router.get('/profile', passport.checkAuthentication,a.prof);
router.get('/userprofile/:id',passport.checkAuthentication,userController.userprofile)
router.get('/signin',userController.signin);
router.get('/signup',userController.signup);
router.post('/userupdate/:id',passport.checkAuthentication,userController.userupdate);
router.post('/create',userController.create);

router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect:'/users/signin'},
) ,userController.createSession)
router.get('/signout',userController.signoutfunc);

router.get('/auth/google',passport.authenticate('google',{scope:['profile','email']}));
router.get('/auth/google/callback',passport.authenticate('google',{failureRedirect:'/users/signin'}),userController.createSession);


module.exports=router;