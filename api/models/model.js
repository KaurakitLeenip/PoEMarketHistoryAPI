var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ItemSchema = new Schema({
    name: {
        type: String,
        required: "Name needed"
    },
    league: {
        type: String,
        required: "Leaguename needed"
    },
    date: {
        type: Date,
        required: "Date needed"
    },
    itemType: {
        type: String,
        required: "Item Type needed" 
    },
    variant: {
        type: String
    },
    links: {
        type: Number
    },
    value: {
        type: Number,
        required: "Chaos Value needed"
    },
    confidence:{
        type: String,
        required: "Confidence Needed"
    },

    //NEW FIELDS
    leagueDay: {
        type: Number, 
    }
})

var CurrencySchema = mongoose.Schema({
    get: {
        type: String,
        required: "get needed"
    },
    pay: {
        type: String,
        required: "pay needed"
    },
    league: {
        type: String,
        required: "Leaguename needed"
    },
    value: {
        type: Number, 
        required: "Conversion Value needed"
    },
    confidence:{
        type: String,
        required: "Confidence needed"
    },

    //NEW FIELDS
    leagueDay: {
        type: Number
    }

})

