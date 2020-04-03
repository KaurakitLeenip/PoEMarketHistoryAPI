var mongoose = require('mongoose'), 
Currency = mongoose.model('currency');


//
//get ratio on leagueday
//params
// - league_name
// - date
// - get
// - pay
exports.get_day = function(req, res){
    console.log(req.params);
    console.log(Currency.collection.collectionName)
    Currency.find({
        League: req.params.league_name,
        Date: req.params.date,
        Buy: req.params.get,
        Sell: req.params.pay
    }, function(err, currency){
        if (err)
            res.send(err);
        res.json(currency)
    });
};