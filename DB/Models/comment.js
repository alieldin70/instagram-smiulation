const mongoose=require('mongoose');
const commentSchema= new mongoose.Schema({
text:String,
postId:{type:mongoose.Schema.Types.ObjectId,required:true,ref:'post'},
createdby:{type:mongoose.Schema.Types.ObjectId,required:true,ref:'User'},
likes:[{type:mongoose.Schema.Types.ObjectId,ref:'User'}],
isdeleted:{type:Boolean,default:false},
deletedby:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
replys:[{type:mongoose.Schema.Types.ObjectId,ref:'comment'}]

},{timestamps:true});

const commentModel= mongoose.model('comment',commentSchema);
module.exports=commentModel;