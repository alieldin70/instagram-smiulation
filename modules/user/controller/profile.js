const userModel = require("../../../DB/Models/User");
const path=require('path');
const fs=require('fs');
const bcrypt= require('bcrypt');
const { user } = require("../user.endpoint");
var QRCode = require('qrcode')


const profileqr=async(req,res)=>{
  try {
    const {id}=req.user;
    const finduser=await userModel.findById(id);
    if(!finduser){
        res.status(400).json({message:"user not found"});
    }
    else{
      QRCode.toDataURL(`${req.protocol}://${req.host}/api/v1/user/${finduser._id}`, function (err, url) {
        if (err) {
        res.status(500).json({message:"error",err});
          
        } else {
          
        res.status(200).json({message:"done",url});
      }
      })
    }
  } catch (error) {
    res.status(500).json({message:"server crashed",error});
    
  }
};
const followers=async(req,res)=>{
  try {
    const {id}=req.user;
    const finduser=await userModel.findById(id).populate([{
      path:'follower',
      match:{isblocked:false},
      select:'username email'
    }]);
    if(!finduser){
        res.status(400).json({message:"user not found"});
    }
    else{
        res.status(200).json({user:finduser.follower});
    }
  } catch (error) {
    res.status(500).json({message:"server crashed",error});
    
  }
};
const following=async(req,res)=>{
  try {
    const {id}=req.user;
    const finduser=await userModel.findById(id).populate([{
      path:'following',
      match:{isblocked:false},
      select:'username email'
    }]);
    if(!finduser){
        res.status(400).json({message:"user not found"});
    }
    else{
        res.status(200).json({user:finduser.following});
    }
  } catch (error) {
    res.status(500).json({message:"server crashed",error});
    
  }
};
const profile=async(req,res)=>{
  try {
    const {id}=req.user;
    const finduser=await userModel.findById(id);
    if(!finduser){
        res.status(400).json({message:"user not found"});
    }
    else{
        res.status(200).json({user:finduser});
    }
  } catch (error) {
    res.status(500).json({message:"server crashed",error});
    
  }
};
const profilepic=async(req,res)=>{
    try {
        const {id}=req.user;
    if (req.fileerr) {
        res.status(403).json({message:"invalid-type"})
    } else {
        
        imageurl= `${req.finaldestination}/${req.file.filename}`;
        const user= await userModel.findByIdAndUpdate(id,{profilepic:imageurl},{new:true});
        res.status(200).json({message:"profile pic added",user});
    }  
    
    }
     catch (error) {
      res.status(500).json({message:"server crashed",error});
      
    }
  };
  const Updateprofilepic=async(req,res)=>{
    try {
        const {id}=req.user;
    if (req.fileerr) {
        res.status(403).json({message:"invalid-type"})
    } else {
        const OLDuserpic= await userModel.findById(id);
    fs.unlinkSync(`${path.join(__dirname,OLDuserpic.profilePic)}`);
        imageurl= `${req.finaldestination}/${req.file.filename}`;
        const user= await userModel.findByIdAndUpdate(id,{profilepic:imageurl},{new:true});
        res.status(200).json({message:"profile pic added",user});
    }  
    
    }
     catch (error) {
      res.status(500).json({message:"server crashed",error});
      
    }
  };
  const coverpic=async(req,res)=>{
    try {
     const {id}=req.user;
    if (req.fileerr) {
        res.status(403).json({message:"invalid-type"})
    } else {
        const imageurls=[];
        req.files.forEach(file => {
            imageurls.push(`${req.finaldestination}/${file.filename}`);
        });
        const user= await userModel.findByIdAndUpdate(id,{coverpic:imageurls},{new:true});
        res.status(200).json({message:"profile pic added",user});
    }  
    
    }
     catch (error) {
      res.status(500).json({message:"server crashed",error});
      
    }
  };
const updatepassword=async(req,res)=>{
const {oldpassword,newpassword}=req.body;
if (oldpassword !== newpassword) {
  const finduser= await userModel.findById(req.user._id);
  const passwordmatch= await bcrypt.compare(oldpassword,finduser.password);
  if (passwordmatch) {
  const hashednewpass= await bcrypt.hash(newpassword,parseInt(process.env.rounds));
    await userModel.findByIdAndUpdate(finduser._id,{password:hashednewpass},{new:true});
    res.status(200).json({message:"password updated"});
  } else {
    res.status(400).json({message:"in-correct oldpassword"});
    
  }
} else {
  res.status(400).json({message:" oldpassword matches newpassword"});
}
};
const follow= async (req,res)=>{
try {
  const {id}=req.params;
const user= await userModel.findById(id);
if (user) {
  const followuser=await userModel.findOne({follower:req.user._id}).select('follower');
  console.log(followuser);
  if(!followuser){
    await userModel.findByIdAndUpdate(id,{$push:{follower:req.user._id}});
    await userModel.findByIdAndUpdate(req.user._id,{$push:{following:user._id}});
    res.status(200).json({message:"follow"});
  }
  else{
    await userModel.findByIdAndUpdate(id,{$pull:{follower:req.user._id}});
    await userModel.findByIdAndUpdate(req.user._id,{$pull:{following:id}});
    res.status(200).json({message:"unfollow"});
  }
} else {
  res.status(400).json({message:"user not found"});
 
}
} catch (error) {
  res.status(500).json({message:"server crashed",error});
}
};

module.exports={profile,profilepic,coverpic,Updateprofilepic,updatepassword,follow,profileqr,following,followers};