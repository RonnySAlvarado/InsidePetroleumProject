const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://InsidePetroleumUser:a1b2c3@insidepetroleumprojectcluster-9b7w7.mongodb.net/test?retryWrites=true', {useNewUrlParser: true})

const database = mongoose.connection;

module.exports = database;