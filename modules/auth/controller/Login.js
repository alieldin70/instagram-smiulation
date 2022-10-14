const userModel = require("../../../DB/Models/User");
const bcrypt= require('bcrypt');
const jwt=require('jsonwebtoken');
const Login = async(req,res)=>{
try {
    const {email,password} = req.body;
const user = await userModel.findOne({email});
if (!user) {
   res.status(403).json({message:"email not found"}); 
} else {
    const hashedpass= await bcrypt.compare(password,user.password);
    if (hashedpass) {
        if (user.confirmEmail) {
            const token= jwt.sign({id:user._id},process.env.sceretkey);
           await userModel.findByIdAndUpdate(user._id,{online:true});
            
            res.status(200).json({message:"login",token});    
        } else {
   res.status(400).json({message:"please verify your account"}); 
            
        }
    } else {
   res.status(403).json({message:"In-correct password"}); 
   
    }
}

} catch (error) {
   res.status(500).json({message:"server crashed",error}); 
    
}
}
module.exports=Login;