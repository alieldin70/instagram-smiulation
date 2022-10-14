const router=require('express').Router();
const { auth } = require('../../middleWare/auth');
const validation = require('../../middleWare/validation');
const authEndpoint = require('./auth.endpoint');
const { signupvalidator,loginvalidator, sendcodevalidator, forgetpasswordvalidator } = require('./auth.validation');
const Login = require('./controller/Login');
const Logout = require('./controller/logout');
const {SignUp,confirmEmail, refreshToken, sendcode, forgetpassword} = require('./controller/registeration');

//signup endpoint
router.post('/signup',validation(signupvalidator),SignUp);
router.get('/confirmemail/:token',confirmEmail);
router.get('/refreshtoken/:id',refreshToken);
//login endpoint
router.post('/login',validation(loginvalidator),Login);
//logout
router.patch('/logout',auth(authEndpoint),Logout);
// verification code
router.post('/sendcode',validation(sendcodevalidator),sendcode);
//forgetpassword
router.post('/forgetpassword',validation(forgetpasswordvalidator),forgetpassword);



module.exports=router;
