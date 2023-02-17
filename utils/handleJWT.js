const jwt = require('jsonwebtoken')
const jwt_secret = process.env.jwt_secret;

const tokenSing = async (user, time) =>{
const sign = jwt.sign(user, jwt_secret, {expiresIn: time})
return sign
}

const tokenVerify = async (tokenJWT) =>{
    try {
        return jwt.verify(tokenJWT, jwt_secret)
    } catch (error) {
        return error
    }
}

module.exports = {tokenSing, tokenVerify}