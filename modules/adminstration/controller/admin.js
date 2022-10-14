const userModel = require("../../../DB/Models/User")

const getalluser=async(req,res)=>{
const getusers= await  userModel.find({role:{$in:['admin','Admin']}});
res.status(200).json({message:"done",getusers});
}
module.exports={getalluser};