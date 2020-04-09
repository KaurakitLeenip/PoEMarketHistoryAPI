module.exports = function(app){
    var MarketHistory = require('../controllers/controller')

    //routes
    app.route('/day/:league_name/')
        .get(MarketHistory.get_day)

    app.route('/num_days/:league_name')
        .get(MarketHistory.get_days_in_league)

    app.route('/ratio_diff/:league_name')
        .get(MarketHistory.get_ratio_diff)
};