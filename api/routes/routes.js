module.exports = function(app){
    var MarketHistory = require('../controllers/controller')

    //routes
    app.route('/day/:league_name/:date/:get/:pay')
        .get(MarketHistory.get_day)

};