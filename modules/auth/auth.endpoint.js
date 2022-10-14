const {  Roles }=require('../../middleWare/auth');
const authEndpoint={
    user:Roles.User,
    HR:Roles.Hr
};
module.exports=authEndpoint