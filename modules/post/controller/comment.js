const commentModel = require("../../../DB/Models/comment");
const postModel = require("../../../DB/Models/post");

const createcomment=async(req,res)=>{
const {id}=req.params;
const {text}=req.body;
const post = await postModel.findById(id);
if (!post) {
    res.status(400).json({message:"post not found"});
} else {
    const comment= new commentModel({text,postId:id,createdby:req.user._id});
    const savedcomment= await comment.save();
    console.log(savedcomment);
    await postModel.findByIdAndUpdate(id,{$push:{commentsId:savedcomment._id}});
    res.json({message: "done",savedcomment}); 
} 
};
const commentlikes= async (req,res)=>{
    try {
      const {id}=req.params;
    const comment= await commentModel.findById(id);
    if (comment) {
      const userliked=await commentModel.findOne({likes:req.user._id});
      if(!userliked){
        await commentModel.findByIdAndUpdate(id,{$push:{likes:req.user._id}});
        res.status(200).json({message:"liked comment"});
      }
      else{
        await commentModel.findByIdAndUpdate(id,{$pull:{likes:req.user._id}});
        res.status(200).json({message:"dislike comment"});
      }
    } else {
      res.status(400).json({message:"post not found"});
    }
    } catch (error) {
      res.status(500).json({message:"server crashed",error});
    }
    };
  const replycomment = async(req,res)=>{
  try {
    const {id,commentid}=req.params;
    const {text}=req.body;
    const post= await postModel.findById(id);
    if (!post) {
      res.status(400).json({message:"post not found"});
    } else {
    const comment= await commentModel.findOne({_id:commentid,postId:id});
      if (!comment) {
      res.status(400).json({message:"comment not found"});    
      } else {
        const reply= new commentModel({text,createdby:req.user._id,postId:id});
        const savedreply= await reply.save();
        await commentModel.findByIdAndUpdate(commentid,{$push:{replys:savedreply._id}});
        res.status(200).json({message:"done"});

      }
    }

  } catch (error) {
    res.status(500).json({message:"server crashed",error}); 
  }
  };
module.exports={createcomment,commentlikes,replycomment};  