const jwt = require('jsonwebtoken')
const user_jwt_secret = process.env.user_jwt_secret;
const admin_jwt_secret = process.env.admin_jwt_secret;

const tokenSing = async (user, time) =>{
    let sign = ""
if(user.isAdmin == true) {
    sign = jwt.sign(user, admin_jwt_secret, {expiresIn: time})
} else {
    sign = jwt.sign(user, user_jwt_secret, {expiresIn: time})
}
return sign
}

const userTokenVerify = async (tokenJWT) =>{
    try {
        return jwt.verify(tokenJWT, admin_jwt_secret)
    }   
     catch (error) {
        try {
            return jwt.verify(tokenJWT, user_jwt_secret)
        } catch (error) {
            return error
        }
    }}

const adminTokenVerify = async (tokenJWT) =>{
    try {
        return jwt.verify(tokenJWT, admin_jwt_secret)
    } catch (error) {
        return error
    }
}

module.exports = {tokenSing, userTokenVerify, adminTokenVerify}