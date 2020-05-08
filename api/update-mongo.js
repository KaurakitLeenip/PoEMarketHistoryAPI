const mongodb = require("mongodb").MongoClient

let url = "mongodb://localhost:27017"


mongodb.connect(
    url, 
    (err, client) => {
        if (err) throw err;
        client
            .db("marketHistory")
            .collection("item")
            .distinct("Date", {League: "Breach"}, (err, result) => {
                if (err) throw err;
                var sorted = result.sort();
                sorted.forEach((currentValue, index) => {
                    console.log(currentValue)
                    client.db("marketHistory")
                    .collection("item")
                    .updateMany({"Date" : currentValue}, {"$set": {"LeagueDay": index}}, function(err, result){
                        if (err) throw err;
                        console.log(result)
                    })
                })
            })
    }
)


// Currency.find({Leauge: "Incursion"}).distinct('Date', function (err, result){
//     result.forEach(function(currentValue, index){
//         console.log(index)
//         Currency.updateMany({"Date" : currentValue}, {"$set":{"LeagueDay": index}}, function(err, result){
//             if (err) {
//                 console.log("something wrong")
//             }
//             else{
//                 console.log(result)
//             }
//         })
//     });
// })