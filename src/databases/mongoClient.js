const MongoClient = require('mongodb').MongoClient;

let connection = {};

let establishConnection = (callback) => {
    MongoClient.connect("mongodb://localhost:27017/", {poolSize: 10}, function (err, db) {
        if(err) {
            console.log("Error: ", err);
            callback(err);
        }
        connection['editor'] = db.db('editor');
        callback(null, connection);
    });
};

let getConnection = () => {
    return connection;
};

module.exports = {
    'establishConnection': establishConnection,
    'getConnection': getConnection
};