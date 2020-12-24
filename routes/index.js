const express=require('express');
const router=express.Router();
const hc=require("../controllers/home_controllers");
router.get('/',hc.base);
router.use('/api',require('./api'));
module.exports=router;