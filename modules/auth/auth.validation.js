const Joi=require('joi');
const signupvalidator=
    {
        body: Joi.object().required().keys({
            username: Joi.string().pattern(new RegExp(/[A-Z][a-zA-Z][^#&<>\"~;$^%{}?]{1,20}$/)).required().messages({
                'string.empty': "plz fill in u name",
                'string.pattern.base': "plz enter char",
                'any.required': "plz send ur name"
            }),firstname: Joi.string().pattern(new RegExp(/[A-Z][a-zA-Z][^#&<>\"~;$^%{}?]{1,20}$/)).messages({
                'string.empty': "plz fill in u name",
                'string.pattern.base': "plz enter char",
                'any.required': "plz send ur name"
            }).optional(),
            lastname: Joi.string().pattern(new RegExp(/[A-Z][a-zA-Z][^#&<>\"~;$^%{}?]{1,20}$/)).messages({
                'string.empty': "plz fill in u name",
                'string.pattern.base': "plz enter char",
                'any.required': "plz send ur name"
            }).optional(),
            email: Joi.string().email().required(),
            password: Joi.string().pattern(new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)).required(),
            cpassword: Joi.string().valid(Joi.ref('password')).required(),
            age: Joi.number(),
            gender:Joi.string().required()
        })
    };
    const loginvalidator= {
body:Joi.object().required().keys({
    email: Joi.string().email().required(),
    password: Joi.string().pattern(new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)).required()

})

    }; 
 const sendcodevalidator= {
        body:Joi.object().required().keys({
            email: Joi.string().email().required(),        
        })
        
            }; 
   const forgetpasswordvalidator=
            {
                body: Joi.object().required().keys({
                
                    email: Joi.string().email().required(),
                    newpassword: Joi.string().pattern(new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)).required(),
                    cpassword: Joi.string().valid(Joi.ref('newpassword')).required(),
                    code:Joi.string().required()
                })
            };
module.exports={signupvalidator,loginvalidator,sendcodevalidator,forgetpasswordvalidator};