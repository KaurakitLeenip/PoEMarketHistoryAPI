var mongoose = require('mongoose'), 
Currency = mongoose.model('currency');
validate = require('express-validator')

//
//get ratio on leagueday
//params
// - league_name
// - get
// - pay
// - date
// - leagueDay
exports.get_day = function (req, res, next) {
    try{
        const errors = validate.validationResult(req)
        if (!errors.isEmpty()){
            res.status(422).json({errors: errors.array()})
            return
        }
        var query = {
            League: req.params.league_name,
            Buy: req.query.buy,
            Sell: req.query.sell,
            $or: [
                {Date: req.query.date},
                {LeagueDay: req.query.leagueDay}
            ]
        }

        Currency.find(query, 
            function(err, currency){
            if (err)
                res.send(err);
            res.json(currency)
        });

    } catch(err) {
        return next(err)
    }
};

//get ratio difference between leaguedays
//params
// - league_name
// - daystart
// - dayend
// - buy
// - sell
exports.get_ratio_diff = function(req, res){
    try{
        const errors = validate.validationResult(req)
        if (!errors.isEmpty()){
            res.status(422).json({errors: errors.array()})
            return
        }
        var queryStart  = {
            League: req.params.league_name,
            Buy: req.query.buy,
            Sell: req.query.sell,
            $or: [
                {Date: req.query.dateStart},
                {Day: req.query.dayStart}
            ]
        }
    
        var queryEnd = {
            League: req.params.league_name,
            Buy: req.query.buy,
            Sell: req.query.sell,
            $or: [
                {Date: req.query.dateEnd},
                {Dat: req.query.dayEnd}
            ]
        }
    
        Currency.findOne(queryEnd, function(err, currency){
            if (err) throw err;
            Currency.findOne(queryStart, function(err, curr){
                if (err) throw err;
                res.json({
                    Start : curr.Value,
                    End : currency.Value,
                    Ratio : currency.Value-curr.Value
                })
            })
        })
    } catch(err){
        return next(err)
    }
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


//get list of all currencies in a league
//params
// - league
//
exports.get_currencies = function(req, res){
    Currency.distinct('Buy', {League: req.params.league_name}, function(err, currencies){
        res.json(currencies)
    })

}

//get list of all items in a type
//params
// - league
// - type
exports.get_items = function(req, res){
    Item.distinct('Name', {League: req.params.league_name}, function(err, items){
        res.json(items)
    })
}

//TODO: add