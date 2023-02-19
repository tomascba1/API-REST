const {check, validationResult} = require("express-validator")

const validatorCreateUser = [
    check("name")
    .trim()
    .notEmpty().withMessage("Field cannot be empty")
    .isAlpha("es-ES", {ignore: " "}).withMessage("Characters only")
    .isLength({min: 5, max: 60}).withMessage("Name must be between 5 and 60 characters"),
    check("userName").trim()
    .notEmpty().withMessage("Field cannot be empty")
    .isLength({min: 3, max: 12}).withMessage("Username must be between 3 and 12 characters"),
    check("email").trim()
    .notEmpty().withMessage("Field cannot be empty")
    .isEmail().withMessage("Must be valid email")
    .normalizeEmail(),
    check("password").trim()
    .notEmpty().withMessage("Field cannot be empty")
    .isLength({min: 6, max: 18}).withMessage("Password must be between 6 and 18 characters"),
    (req, res, next) =>{
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json(errors)
        } else {
            return next()
        }
    }
]

module.exports = {validatorCreateUser}