const userModel = require("../../../DB/Models/User");
const jwt= require('jsonwebtoken');
const sendemail = require("../../../services/sendmail");
const bcrypt= require('bcrypt');

const SignUp=async(req,res)=>{
try {
const{username,email,firstname,lastname,password,age,gender,phone}=req.body;
if (firstname&&lastname) {
const user= new userModel({username,email,password,age,gender,phone});
const saveduser=  await user.save();
const token= jwt.sign({id:saveduser._id},process.env.sceretkey,{expiresIn:'24h'});
const url=`${req.protocol}://${req.headers.host}/api/v1/auth/${token}`;
const message=`<a href='${url}'>please verify your account</a>`
sendemail(saveduser.email,message);
res.status(201).json({message:"UserAdded"});

} else {
  const user= new userModel({username,email,password,age,gender,phone});
  const saveduser=  await user.save();
  const token= jwt.sign({id:saveduser._id},process.env.sceretkey,{expiresIn:'24h'});
  const url1=`${req.protocol}://${req.headers.host}/api/v1/auth/confirmemail/${token}`;
  const url2=`${req.protocol}://${req.headers.host}/api/v1/auth/refreshtoken/${saveduser._id}`;
  const message=`<a href="${url1}">please verify your account</a><br>
  <a href="${url2}">please verify your account</a>`;
  sendemail(saveduser.email,message);
  res.status(201).json({message:"UserAdded"}); 
}

}
 catch (error) {
    if(error.keyValue?.email){
  res.status(400).json({message:"email exist"});

    }
    else{
  res.status(500).json({message:"Server crashed",error});
    }
    
}
};
/////////////////////////////////////////////////
const confirmEmail= async(req,res)=>{
try {
  const {token}=req.params;
if (!token||token==null) {
  res.status(403).json({message:"invalid token"});
} else {
  const decode= jwt.verify(token,process.env.sceretkey);
if (!decode) {
  res.status(403).json({message:"invalid info"});
} else {
  const user=await userModel.findById(decode.id);
  if(user.confirmEmail)
  {
  res.status(400).json({message:"user already verified"});
  }
  const verifieduser=await userModel.findByIdAndUpdate(decode.id,{confirmEmail:true},{new:true});
  res.status(200).json({message:"user verified"});

}
}
} catch (error) {
  res.status(500).json({message:"Server crashed",error});
  
}
};
////////////////////////////////////////////
const refreshToken= async(req,res)=>{
  try {
    const {id}=req.params;
    const user=await userModel.find(id);
    if (!user) {
    res.status(403).json({message:"invalid account"});
      
    } else {
       if(user.confirmEmail)
    {
    res.status(400).json({message:"user already verified"});
    }
    else{
      const token= jwt.sign({id:user._id},process.env.sceretkey,{expiresIn:'24h'});
  const url1=`${req.protocol}://${req.headers.host}/api/v1/auth/confirmemail/${token}`;
  const url2=`${req.protocol}://${req.headers.host}/api/v1/auth/refreshtoken/${id}`;
  const message=`<a href="${url1}">please verify your account</a><br>
  <a href="${url2}">please verify your account</a>`;
  sendemail(saveduser.email,message);
  res.status(200).json({message:"Done"}); 

    }
    }
  } catch (error) {
    res.status(500).json({message:"Server crashed",error});
    
  }
  };
  //////////////////////////////
const sendcode= async(req,res)=>{
try {
  const {email}=req.body;
const user=await userModel.findOne({email});
if (user) {
  //code consist of four numbers
  const code =Math.floor(Math.random()*(9999-1000+1)+1000);
   await userModel.findByIdAndUpdate(user._id,{code});
  const message=`<p> this is your verification code ${code}</p>`;
  sendemail(user.email,message);
  res.status(200).json({message:"your code sent"});
} else {
  res.status(400).json({message:"In-vaild account"});
  
};
} catch (error) {
  res.status(500).json({message:"Server crashed",error}); 
}

};
/////////////////////////////
const forgetpassword= async(req,res)=>{
 try {
  const {code,newpassword,cpassword}=req.body;
  const user= await userModel.findOne({email});

  if (user.code.toString()!=code.toString()) {
    res.status(400).json({message:"in-correct verifcation code"});
   
  } else {
    const hashpass= await bcrypt.hash(newpassword,parseInt(process.env.rounds));
     await userModel.findByIdAndUpdate(user._id,{password:hashpass},{new:true})
    res.status(200).json({message:"Done please login"});
    
  }
 } catch (error) {
  res.status(500).json({message:"Server crashed",error});
 }
};

module.exports={SignUp,confirmEmail,refreshToken,sendcode,forgetpassword};