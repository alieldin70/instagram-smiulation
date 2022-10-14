const mongoose=require('mongoose');
const bcrypt=require('bcrypt');
const userSchema = new mongoose.Schema({
username:{type:String,required:true},
firstname:String,
lastname:String,
email:{type:String,required:true,unique:true},
password:{type:String,required:true},
age:{type:Number,required:true},
phone:String,
gender:{type:String,enum:['male','female'],default:'male'},
confirmEmail:{type:Boolean,default:true},
isblocked:{type:Boolean,default:false},
online:{type:Boolean,default:false},
profilepic:String,
coverpic:Array,
gallary:Array,
role:{type:String,default:'User'},
follower:[{type:mongoose.Schema.Types.ObjectId,ref:'User'}],
following:[{type:mongoose.Schema.Types.ObjectId,ref:'User'}],
scoiallink:Array,
pdflink:String,
code:String,
lastseen:String,
},

{timestamps:true});
userSchema.pre('save',async function(next){
this.password=  await bcrypt.hash(this.password,parseInt(process.env.rounds));
next();
});
userSchema.pre('findOneAndUpdate',async function(next){
    const data=  await this.model.findOne(this.getQuery()).select('__v');
    this.set({__v:data.__v+1});
    next();
    });
const userModel=mongoose.model('User',userSchema);
module.exports=userModel;