const dataMethod = ["body", 'params', 'query','file','headers'];
const validation = (schema)=>{
  return (req,res,next)=>{ const validationerror=[];
    dataMethod.forEach(key=>{
        if(schema[key]){
            const errorResult=schema[key].validate(req[key],{ abortEarly: false });
            if (errorResult.error) {
                validationerror.push(errorResult.error.details);
            } 
        }
    });
    if (validationerror.length) {
        res.json({ message: "validation err", err: validationerror});
    } else {
        next();
    }}
}
module.exports=validation;