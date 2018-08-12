const mongoose = require('mongoose');

export const connect = () => mongoose.connection.openUri('mongodb://localhost:27017/music_api', { useNewUrlParser: true }, (err, res) => {
    if (err) {
        throw err;
    } else {
        console.log('DB: ', 'OK');
    }
});