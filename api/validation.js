const validator = require('express-validator')

exports.validate = (method) => {
    switch (method){
        case 'get_day': {
            return [ 
                validator.query('sell', 'sell is a required field').exists(),
                validator.query('buy', 'buy is a required value').exists(),
                validator.query(['date', 'leagueDay']).optional().exists().custom((value, {req}) => {
                    if (!("leagueDay" in req.query ? !("date" in req.query) : "date" in req.query)){
                        throw new Error('date and leagueDay are mutually exclusive fields')
                    }
                    else{
                        return true
                    }
                }),
                validator.oneOf([
                    validator.query('date').exists(),
                    validator.query('leagueDay').exists()
                ], 'day or date is required')
            ]
        }
        case 'get_ratio_diff': {
            return [
                validator.query('buy', 'buy is a required field').exists(),
                validator.query('sell', 'sell is a required field').exists(),
                validator.query(['dayStart', 'dayEnd', 'dateStart', 'dateEnd']).optional().custom((value, {req}) => {
                    var days = req.query.dayStart && req.query.dayEnd
                    var dates = req.query.dateStart && req.query.dateEnd
                    if (!days && !dates){
                        throw new Error('invalid query. please specify either both dates or both days')
                    }
                    else if (days && dates){
                        throw new Error('days and dates are mutually exclusive')
                    }
                    else{
                        return true
                    }
                }),
                validator.oneOf([
                    validator.query('dayStart').exists(),
                    validator.query('dayEnd').exists(),
                    validator.query('dateStart').exists(),
                    validator.query('dateEnd').exists()
                ], 'day or dates are required'),
                validator.query(['dayStart, dayEnd']).optional().custom((value, {req}) => {
                    if(req.query.dayStart > req.query.dayEnd){
                        throw new Error('dayStart must be smaller than dayEnd')
                    }
                    else{
                        return true
                    }
                }),
                validator.query(['dateStart', 'dateEnd']).optional().custom((valie, {req}) => {
                    if(req.query.dateStart > req.query.dateEnd){
                        throw new Error('dateStart must be smaller than dateEnd')
                    }
                    else{
                        return true
                    }
                })
            ]
        }
    }
}