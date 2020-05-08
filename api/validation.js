const validater = require('express-validator')

exports.validate = (method) =>{
    switch (method){
        case 'get_day': {
            return [ 
                validater.query('sell', 'sell is a required field').exists(),
                validater.query('buy', 'buy is a required value').exists(),
                validater.query(['date', 'leagueDay'], 'date xor leagueDay is a required field').optional().exists().custom((value, {req}) => {
                    console.log(req.params)
                    console.log("leagueDay" in req.query ? !("date" in req.query) : "date" in req.query)
                    if (!("leagueDay" in req.query ? !("date" in req.query) : "date" in req.query)){
                        throw new Error('date and leagueDay cannot be present or none can be present')
                    }
                    else{
                        return true
                    }
                })
            ]
        }

    }

}


// const getDayValidationRules = () => {
//     return[
//         validater.query('get', 'get is a required field').exists(),
//         validater.query('buy', 'buy is a required value').exists()
//     ]
// }

// const validate = (req, res, next) => {
//     const errors = validater.validationResult(req)
//     if (errors.isEmpty()){
//         return next()
//     }
//     const extractedErrors = []
//     errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))

//     return res.status(422).json({
//         errors: extractedErrors,
//     })
// // }

// module.exports = {
//     validate
// }