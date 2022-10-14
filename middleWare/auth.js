const jwt = require('jsonwebtoken');
const userModel = require('../DB/Models/User');

const Roles = {
    User:["User"] ,
    Admin: ["admin"],
    Hr: ["Hr"]
};

const auth = (accessRoles) => {
    return async(req, res, next) => {
       
            const headerToken = req.headers['authorization'];
            if (!headerToken || headerToken == null || headerToken == undefined ||
                !headerToken.startsWith(`${process.env.bearerTokenKey} `)) {
                res.status(403).json({ message: "in-valid header token" });
            } else {
                const token = headerToken.split(" ")[1];
                if (!token || token == undefined || token == null || token.length < 1) {
                    res.status(400).json({ message: "in-valid token" });
                } else {
                    const decoded = jwt.verify(token, process.env.sceretkey);
                    const findUser = await userModel.findById(decoded.id);
                    if (!findUser) {
                        res.json({ message: "in-valid user account" });
                    } else {
                        req.user = findUser;
                        next();

                    }
                }
            }
       
}}
module.exports = { auth, Roles };