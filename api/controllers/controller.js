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

//get ratio difference between leaguedays

//get ratio difference between league 
//progression in terms of percentage

//get largest spike

//get lowest spike