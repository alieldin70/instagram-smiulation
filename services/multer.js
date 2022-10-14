const multer=require('multer');
const path=require('path');
const fs=require('fs');
const { nanoid } = require('nanoid');
const multervalidators={
    image:['image/png','image/jpeg'],
    pdf:['application/pdf']
}
const HME= (error,req,res,next)=>{
if (error) {
    res.status(400).json({message:"files are too large",error});
} else {
    next();
}
}
function Mymulter(custompath,multervalidators,size){
    if(!custompath||custompath==null){
        custompath='general';
    }
    const fullpath= path.join(__dirname,`../uploads/${custompath}`);
    if(!fs.existsSync(fullpath)){
        fs.mkdirSync(fullpath,{recursive:true});
    }
    const storage= multer.diskStorage({
    destination: function(req,file,cb){ 
        req.finaldestination=`uploads/${custompath}`;
        cb(null,fullpath);
},
filename :function(req,file,cb){ 
    cb(null,nanoid()+'_'+file.originalname);
    }
});
const filefilter= function(req,file,cb){
    if (multervalidators.includes(file.mimetype)){
        cb(null,true);
    }
    else{
        req.fileerr=true;
        cb(null,false);
    }
} 

const upload= multer({dest:fullpath,limits:{fileSize:size},filefilter,storage});
return upload;

} 
module.exports={Mymulter,multervalidators,HME};