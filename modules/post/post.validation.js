const joi= require('joi');
const createpostvalidator={
body: joi.object().required().keys({
text: joi.string().optional()
})
};
const likevalidator= {
    params:joi.object().required().keys({
        id: joi.string().required().min(24).max(24),
    })
        }; 
const commentvalidator= {
    params:joi.object().required().keys({
        id: joi.string().required().min(24).max(24),
    }),
    body:joi.object().required().keys({
        text: joi.string().required().min(3).max(5000),
    })
        }; 
const replayvalidator= {
    params:joi.object().required().keys({
        id: joi.string().required().min(24).max(24),
        commentid: joi.string().required().min(24).max(24)
    }),
    body:joi.object().required().keys({
        text: joi.string().required().min(3).max(5000),
    })
        }; 
module.exports={createpostvalidator,likevalidator,commentvalidator,replayvalidator};