var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// var ItemSchema = new Schema({
//     name: {
//         type: String,
//         required: "Name needed"
//     },
//     league: {
//         type: String,
//         required: "Leaguename needed"
//     },
//     date: {
//         type: Date,
//         required: "Date needed"
//     },
//     itemType: {
//         type: String,
//         required: "Item Type needed" 
//     },
//     variant: {
//         type: String
//     },
//     links: {
//         type: Number
//     },
//     value: {
//         type: Number,
//         required: "Chaos Value needed"
//     },
//     confidence:{
//         type: String,
//         required: "Confidence Needed"
//     },

//     //NEW FIELDS
//     leagueDay: {
//         type: Number, 
//     }
// })

var currency = mongoose.Schema({
    Buy: {
        type: String,
        required: "get needed"
    },
    Sell: {
        type: String,
        required: "pay needed"
    },
    League: {
        type: String,
        required: "Leaguename needed"
    },
    Value: {
        type: Number, 
        required: "Conversion Value needed"
    },
    Confidence:{
        type: String,
        required: "Confidence needed"
    },
    Date:{
        type: String,
        required: "Date Needed"
    }

    //NEW FIELDS
    // leagueDay: {
    //     type: Number
    // }

}, {collection: 'currency'})

module.exports = mongoose.model('currency', currency)

