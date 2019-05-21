import express from 'express';
import logger from 'morgan';
const app = express();
import routes from './src/routes.js';
import mongoClient from './src/databases/mongoClient';

mongoClient.establishConnection(function(err, conn) {
    console.log("Database Connection Established.", conn);
});

// Initialize the application once database connections are ready.
var server = require('http').Server(app);
var io = require('socket.io')(server);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
server.listen(8181);
routes(app);
//
// io.on('connection', function (socket) {
//     console.log("Connected ");
//     setInterval(() => {
//         socket.emit('news', { hello: 'world' });
//     }, 1000);
//     socket.on('my other event', function (data) {
//         console.log(data);
//     });
// });