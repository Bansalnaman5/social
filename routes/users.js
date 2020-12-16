const express=require('express');
const router=express.Router();
const userController=require('../controllers/user_controller');
const a=require('../controllers/home_controllers');
const passport=require('passport');
router.get('/profile', passport.checkAuthentication,a.prof);

router.get('/signin',userController.signin);
router.get('/signup',userController.signup);

router.post('/create',userController.create);

router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect:'/users/signin'},
) ,userController.createSession)
router.get('/signout',userController.signoutfunc);

module.exports=router;