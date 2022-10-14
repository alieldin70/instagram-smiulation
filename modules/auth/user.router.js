const router=require('express').Router();
const { auth, Roles }=require('../../middleWare/auth');
const validation = require('../../middleWare/validation');
const { Mymulter, multervalidators, HME } = require('../../services/multer');
const { profile, profilepic, coverpic, Updateprofilepic, updatepassword, follow } = require('./controller/profile');
const profileEndpoint = require('./user.endpoint');
const { updatepassvalidator, followvalidator } = require('./user.validation');
///////////////////////////////////////endpoints/////////////////////////////////

//user profile
router.get('/profile',auth(profileEndpoint),profile);
//profile pic upload and update
router.patch('/profile/profilepic',auth(profileEndpoint),Mymulter('user/profilepic',multervalidators.image,parseInt(process.env.imageSize)).single('image'),HME,profilepic);
router.patch('/profile/updateprofilepic',auth(profileEndpoint),Mymulter('user/profilepic',multervalidators.image,parseInt(process.env.imageSize)).single('image'),HME,Updateprofilepic);
//cover pics uploads
router.patch('/profile/coverpic',auth(profileEndpoint),Mymulter('user/coverpic',multervalidators.image,parseInt(process.env.imageSize)).array('image',15),HME,coverpic);
//update password
router.patch('/profile/updatepass',validation(updatepassvalidator),auth(profileEndpoint),updatepassword)
//follow
router.post('/follow/:id',validation(followvalidator),auth(profileEndpoint),follow);
module.exports=router;
