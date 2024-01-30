const { MongoClient } = require('mongodb');

let dbConnection;

module.exports = {
    connectToDB: (cb) => {
        MongoClient.connect(process.env.DBLINK)
            .then(client => {
                dbConnection = client.db();
                cb()
            })
            .catch((e) => {
                console.log(e);
                return cb(e);
            })
    },
    getDB: () => dbConnection,
};