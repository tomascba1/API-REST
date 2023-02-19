const {tokenVerify} = require('../utils/handleJWT')

const isAuth = async (req, res, next) =>{
    let error = new Error("Not Token Provided")
    if(!req.headers.authorization){
        error.status = 403
        return next(error)
    }
    const token = req.headers.authorization.split(" ").pop()
    const verifiedToken = await tokenVerify(token);
    if(verifiedToken instanceof Error){
        error.status = 401
        error.message = "Invalid Token"
        return next(error)
    } next()
}

module.exports = isAuth