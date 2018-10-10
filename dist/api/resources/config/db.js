'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var mongoose = require('mongoose');

var connect = exports.connect = function connect() {
    return mongoose.connection.openUri('mongodb://localhost:27017/music_api', { useNewUrlParser: true }, function (err, res) {
        if (err) {
            throw err;
        } else {
            console.log('DB: ', 'OK');
        }
    });
};
//# sourceMappingURL=db.js.map