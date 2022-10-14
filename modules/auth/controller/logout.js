const userModel = require("../../../DB/Models/User");
const bcrypt= require('bcrypt');
const jwt=require('jsonwebtoken');
const Logout = async(req,res)=>{
try {
const user = await userModel.findById(req.user._id);
if (!user) {
   res.status(403).json({message:"user not found"}); 
} else {
    await userModel.findByIdAndUpdate(user._id,{lastseen:Date.now(),online:false});
            
            res.status(200).json({message:"logout"});  
}

} catch (error) {
   res.status(500).json({message:"server crashed",error}); 
    
}
}
module.exports=Logout;