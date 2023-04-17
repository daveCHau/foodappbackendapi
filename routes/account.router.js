const router=require("express").Router();
const userService= require('../services/account.service')

router.post('/register', registerSchema, register);

module.exports=router;