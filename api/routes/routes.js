module.exports = function(app){
    var MarketHistory = require('../controllers/controller')
    var validator = require("../validation.js")

    //routes
    app.get('/day/:league_name/',
        validator.validate('get_day'),
        MarketHistory.get_day
    )

    app.get('/num_days/:league_name',
        MarketHistory.get_days_in_league
    )

    app.get('/ratio_diff/:league_name',
        MarketHistory.get_ratio_diff
    )

    app.get('/largest_spike/:league_name',
        MarketHistory.get_largest_spike
    )

    app.get('/largest_decline/:league_name',
        MarketHistory.get_largest_decline
    )

    app.get('/get_currencies/:league_name',
        MarketHistory.get_currencies
    )

    app.get('/get_items/:league_name',
        MarketHistory.get_items
    )
};