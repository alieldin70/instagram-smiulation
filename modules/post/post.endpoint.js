const {  Roles }=require('../../middleWare/auth');
const postEndpoint={
    user:Roles.User,
    HR:Roles.Hr
};
module.exports={postEndpoint};