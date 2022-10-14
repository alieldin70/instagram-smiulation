const Joi=require('joi');
  const profilevalidator= {
headers:Joi.object().required().keys({
    authorization: Joi.string().required(),
}).options({allowUnknown:true})

    }; 
    const followvalidator= {
      params:Joi.object().required().keys({
          id: Joi.string().required().min(24).max(24),
      })
          }; 
    const updatepassvalidator= {
      body:Joi.object().required().keys({
        oldpassword: Joi.string().pattern(new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)).required(),
        newpassword: Joi.string().pattern(new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)).required(),
        cpassword: Joi.string().valid(Joi.ref('newpassword')).required(),
      }).options({allowUnknown:true})
          }; 
module.exports={profilevalidator,updatepassvalidator,followvalidator};