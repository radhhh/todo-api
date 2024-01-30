const { MongoClient } = require('mongodb');

let dbConnection;

module.exports = {
    connectToDB: async (cb) => {
        MongoClient.connect('mongodb://localhost:27017/bookstore')
            .then(client => {
                dbConnection = client.db();
                cb()
            })
            .catch(() => {
                console.log(e);
                return cb(e);
            })
    },
    getDB: () => dbConnection,
};