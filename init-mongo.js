const mongodb = require("mongodb").MongoClient;
const csvtojson = require("csvtojson");

let url = "mongodb://localhost:27017"

csvtojson({delimiter:[";"]})
    .fromFile("DataDumps/Items/Legacy.csv")
    .then(csvData => {
        console.log(csvData);
        mongodb.connect(
            url, 
            { useNewUrlParse: true,
            useUnifiedTopology: true },
            (err, client) => {
                if (err) throw err;
                client
                    .db("marketHistory")
                    .collection("item")
                    .insertMany(csvData, (err, res) => {
                        if (err) throw err;

                        console.log("Inserted: ${res.insertedCount} rows")
                        client.close();
                    })
            }
        )
    })


// csvtojson({delimiter:[";"]})
//     .fromFile("Currencies.csv")
//     .then(csvData => {
//         console.log(csvData);
//         mongodb.connect(
//             url, 
//             { useNewUrlParse: true,
//             useUnifiedTopology: true },
//             (err, client) => {
//                 if (err) throw err;
//                 client
//                     .db("marketHistory")
//                     .collection("currency")
//                     .insertMany(csvData, (err, res) => {
//                         if (err) throw err;
                        
//                         console.log("Inserted: ${res.insertedCount} rows")
//                         client.close();
//                     })
//             }
//         )
//     })

// console.log("asdf")