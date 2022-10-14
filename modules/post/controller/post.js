const commentModel = require("../../../DB/Models/comment");
const postModel = require("../../../DB/Models/post");
const paginate = require("../../../services/pagenate");
const select = 'userName email';
const postpopulate=[
  {
    path:'createdby',
    select
  }, {
    path:'likes',
    select
  },
  {
    path:'commentsId',
    match:{isdeleted:false},
    populate:[
      { 
        path:'createdby',
      select
      },
     { path:'replys',
     populate:[{
      path:'createdby',
    select
     },{
      path:'replys',
      populate:[{
        path:'createdby',
      select
       }]
     }]
      }
    ]
  },

];
const Creatpost =async (req,res)=>{
try {
    const {text}=req.body;
if (req.fileerr) {
  res.status(400).json({message:"invalid-type"});  
} 
const imageurls=[];
req.files.forEach(file => {
    imageurls.push(`${req.finaldestination}/${file.filename}`);
});
const post= new postModel({image:imageurls,text,createdby:req.user._id});
await post.save();
res.status(200).json({message:"post added"});
} catch (error) {
    res.status(500).json({message:"server crashed",error});
    
}
};
const postlikes= async (req,res)=>{
    try {
      const {id}=req.params;
    const post= await postModel.findById(id);
    if (post) {
      const userliked=await postModel.findOne({likes:req.user._id});
      if(!userliked){
        await postModel.findByIdAndUpdate(id,{$push:{likes:req.user._id}});
        res.status(200).json({message:"like"});
      }
      else{
        await postModel.findByIdAndUpdate(id,{$pull:{likes:req.user._id}});
        res.status(200).json({message:"dislike"});
      }
    } else {
      res.status(400).json({message:"post not found"});
    }
    } catch (error) {
      res.status(500).json({message:"server crashed",error});
    }
    };

  const postlist= async(req,res)=>{
    const{page,size}=req.query;
    const{limit,skip}=paginate(page,size);
const post= await postModel.find({}).limit(limit).skip(skip).populate(postpopulate);
res.status(200).json({post:post});
  };
module.exports ={Creatpost,postlikes,postlist}; 