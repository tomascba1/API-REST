const {userTokenVerify, adminTokenVerify} = require('../utils/handleJWT')
const ip = require('ip')

const isAdmin = async (req, res, next) =>{
    let error = new Error("Not Token Provided")
    if(!req.headers.authorization){
        error.status = 403
        return next(error)
    }
    const token = req.headers.authorization.split(" ").pop()
    const verifiedToken = await adminTokenVerify(token);
    if(verifiedToken instanceof Error){
        error.status = 401
        error.message = "Invalid Token"
        return next(error)
    } next()
}


const isAuth = async (req, res, next) =>{
    let error = new Error("Not Token Provided")
    if(!req.headers.authorization){
        error.status = 403
        return next(error)
    }
    const token = req.headers.authorization.split(" ").pop()
    const verifiedToken = await userTokenVerify(token);
    if(verifiedToken instanceof Error){
        error.status = 401
        error.message = "Invalid Token"
        return next(error)
    } next()
}

const ipVerification = (req, res, next ) => {
        const actualIp = ip.address("private", "ipv6")
        if(actualIp === process.env.ip_adress) 
        return next()
        error = new Error("Only allowed IP")
        error.status = 403
        next(error)
    }


module.exports = {isAuth, isAdmin, ipVerification}