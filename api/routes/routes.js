module.exports = function(app){
    var currency_history = require('../controllers/currency-controller')
    var item_history = require('../controllers/item-controller')
    var validator = require("../validation.js")

    //routes
    app.get('/day/:league_name/currency',
        validator.validate('get_day'),
        currency_history.get_day
    )

    app.get('/day/:league_name/item',
        item_history.get_day
    )

    app.get('/num_days/:league_name/',
        currency_history.get_days_in_league
    )

    app.get('/ratio_diff/:league_name/currency',
        validator.validate('get_ratio_diff'),
        currency_history.get_ratio_diff
    )

    app.get('/largest_spike/:league_name/currency',
        currency_history.get_largest_spike
    )

    app.get('/largest_decline/:league_name/currency',
        currency_history.get_largest_decline
    )

    app.get('/get_currencies/:league_name',
        currency_history.get_currencies
    )

    app.get('/get_items/:league_name',
        currency_history.get_items
    )
};