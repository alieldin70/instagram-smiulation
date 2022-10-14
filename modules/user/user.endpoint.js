const {  Roles }=require('../../middleWare/auth');
const profileEndpoint={
    user:Roles.User,
    HR:Roles.Hr
};
module.exports=profileEndpoint