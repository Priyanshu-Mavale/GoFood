const mongoose = require('mongoose')
const mongoURI='mongodb://gofood:123@ac-bhp2pav-shard-00-00.2yecuug.mongodb.net:27017,ac-bhp2pav-shard-00-01.2yecuug.mongodb.net:27017,ac-bhp2pav-shard-00-02.2yecuug.mongodb.net:27017/gofoodmern?ssl=true&replicaSet=atlas-wkc6k5-shard-0&authSource=admin&retryWrites=true&w=majority'
module.exports = function (callback) {
    mongoose.connect(mongoURI, { useNewUrlParser: true }, async (err, result) => {
        if (err) console.log("---" + err)
        else {
            console.log("connected to mongo")
            const foodCollection = await mongoose.connection.db.collection("food_items");
            foodCollection.find({}).toArray(async function (err, data) {
                const categoryCollection = await mongoose.connection.db.collection("foodCategory");
                categoryCollection.find({}).toArray(async function (err, Catdata) {
                    callback(err, data, Catdata);

                })
            });
        }
    })
};
