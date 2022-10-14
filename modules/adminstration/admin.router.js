const router=require('express').Router();
const { auth } = require('../../middleWare/auth');
const { endpoint } = require('./admin.endpoint');
const admincontroller=require('./controller/admin');
//getusers
router.get('/getusers',auth(endpoint),admincontroller.getalluser);
module.exports =router;