const express=require('express');
const { route } = require('.');
const router=express.Router();
const userController=require('../controllers/user_controller');
router.get('/signin',userController.signin);
router.get('/signup',userController.signup);
router.get('/profile',userController.profile);


router.post('/create',userController.create);
router.post('/create-session',userController.createSession);



module.exports=router;