const { auth } = require('../../middleWare/auth');
const validation = require('../../middleWare/validation');
const post = require('./controller/post');
const postvalidation = require('./post.validation');
const postendpoint = require('./post.endpoint');
const { Mymulter, multervalidators, HME } = require('../../services/multer');
const commentcontrollers=require('./controller/comment');
const router=require('express').Router();
//////////////////endpoints//////////////////
//create post
router.post('/',auth(postendpoint.postEndpoint),Mymulter('post',multervalidators.image,parseInt(process.env.imageSize)).array('image',15),validation(postvalidation.createpostvalidator),HME,post.Creatpost);
//poost like
router.patch('/like/:id',validation(postvalidation.likevalidator),auth(postendpoint.postEndpoint),post.postlikes);
//create comment
router.post('/:id/comment',validation(postvalidation.commentvalidator),auth(postendpoint.postEndpoint),commentcontrollers.createcomment)
//post with comment
router.get('/',post.postlist);
//comment like 
router.patch('/commentlike/:id',validation(postvalidation.likevalidator),auth(postendpoint.postEndpoint),commentcontrollers.commentlikes);
//reply comment
router.patch('/:id/comment/:commentid/reply',validation(postvalidation.replayvalidator),auth(postendpoint.postEndpoint),commentcontrollers.replycomment);
module.exports=router;