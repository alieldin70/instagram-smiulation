const mongoose=require('mongoose');
const postSchema= new mongoose.Schema({
text:String,
image:{type:Array,required:true},
createdby:{type:mongoose.Schema.Types.ObjectId,required:true,ref:'User'},
likes:[{type:mongoose.Schema.Types.ObjectId,ref:'User'}],
isdeleted:{type:Boolean,default:false},
deletedby:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
commentsId:[{type:mongoose.Schema.Types.ObjectId,ref:'comment'}]

},{timestamps:true});
const postModel= mongoose.model('post',postSchema);
module.exports=postModel;