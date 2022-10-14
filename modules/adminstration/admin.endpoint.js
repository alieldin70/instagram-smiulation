const { Roles } = require("../../middleWare/auth");

const endpoint={
    admin:Roles.admin
};
module.exports={endpoint};