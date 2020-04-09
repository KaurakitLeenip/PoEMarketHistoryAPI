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
        Date: req.query.date,
        Buy: req.query.buy,
        Sell: req.query.sell
    }, function(err, currency){
        if (err)
            res.send(err);
        res.json(currency)
    });
};

//get ratio difference between leaguedays
//params
// - league_name
// - daystart
// - dayend
// - buy
// - sell
exports.get_ratio_diff = function(req, res){
    console.log(req.params)
    Currency.findOne({
        League: req.params.league_name,
            LeagueDay: req.query.dayEnd,
            Buy: req.query.buy,
            Sell: req.query.sell
    }, function(err, currency){
        if (err) throw err;
        console.log(currency)
        Currency.findOne({
            League: req.params.league_name, 
            LeagueDay: req.query.dayStart,
            Buy: req.query.buy,
            Sell: req.query.sell
        }, function(err, curr){
            if (err) throw err;
            res.json({
                Start : curr.Value,
                End : currency.Value,
                Ratio : currency.Value-curr.Value
            })
        })
    })
};

//get ratios per day
//params 
// - league_name
// - get
// - pay
// - startday
// - days
exports.get_ratio_progress = function(req, res){


};


//get league days
//params
// - league_name
exports.get_days_in_league = function(req, res){
    Currency.findOne({League: req.params.league_name}, 
        {LeagueDay: 1, _id: 0}, 
        {sort: {LeagueDay: -1}}, 
        function(err, day){
            if (err) throw err;
            res.json({num_days: day.LeagueDay})
    });    
}

//get ratio difference between league 
//progression in terms of percentage

//get largest spike
// params
// - league
// - buy
// - sell
exports.get_largest_spike = function(req, res){
    Currency.find({
        League : req.params.league_name,
        Buy: req.query.buy,
        Sell: req.query.sell
    }, null, {sort: {LeagueDay: 1}}, 
        function(err, arr){
            if (err) throw err;
            var diff = 0.0;
            var day = 0;
            arr.forEach((value, index, array) => {
                if (index > 0){
                    var temp = value.Value - array[index-1].Value
                    if (temp > diff){
                        diff = temp
                        day = value.LeagueDay
                    } 
                }
            })
            res.json(
                {leagueDay: day, diff: diff})
    })
};

//get largest decline
//params
// - league
// - buy 
// - sell
 exports.get_largest_decline = function(req, res){
    Currency.find({
        League : req.params.league_name,
        Buy: req.query.buy,
        Sell: req.query.sell
    }, null, {sort: {LeagueDay: 1}}, 
        function(err, arr){
            if (err) throw err;
            var diff = 0.0;
            var day = 0;
            arr.forEach((value, index, array) => {
                if (index > 0){
                    var temp = value.Value - array[index-1].Value
                    if (temp < diff) {
                        diff = temp
                        day = value.LeagueDay
                    }
                }
            })
            res.json(
                {leagueDay: day, diff: diff})    
        })
};