module.exports = function(app){
    var MarketHistory = require('../controllers/controller')

    //routes
    app.route('/day/:league_name/')
        .get(MarketHistory.get_day)

    app.route('/num_days/:league_name')
        .get(MarketHistory.get_days_in_league)

    app.route('/ratio_diff/:league_name')
        .get(MarketHistory.get_ratio_diff)

    app.route('/largest_spike/:league_name')
        .get(MarketHistory.get_largest_spike)

    app.route('/largest_decline/:league_name')
        .get(MarketHistory.get_largest_decline)

    app.route('/get_currencies/:league_name')
        .get(MarketHistory.get_currencies)

    app.route('/get_items/:league_name')
        .get(MarketHistory.get_items)
};