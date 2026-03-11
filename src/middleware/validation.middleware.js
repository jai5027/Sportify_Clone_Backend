const { body, validationResult } = require('express-validator')

async function validationResult(req, res, next){

    const errors = validationResult(req)

    if(!errors.isEmpty()){
        return res.status(400).json({
            errors: errors.array()
        })
    }
    next()
}

const registerUserValidationRules = [
    body("username")
        .isString()
        .withMessage("username must be a string")
        .isLength({ min: 3, max: 20 })
        .isString("username must be between 3 and 20 characters"),

    body("email")
        .isEmail()
        .withMessage("email must be a valid email address"),    
        
    body("password")
        .isLength({ min: 6 })
        .withMessage("password must be at least 6 characters long"),       
        validationResult
]

module.exports = { registerUserValidationRules }