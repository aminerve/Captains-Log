const mongoose = require('mongoose');
const mongoURI = process.env.MONGO_URI;
const db = mongoose.connection;

module.exports = function() {
    mongoose.set('strictQuery', true)
    mongoose.connect(mongoURI, {useNewUrlParser: true, useUnifiedTopology: true})


    db.on('error', (error) => console.error(error))
    db.on('connected', () => console.log('Connected to MongoDB'))
    db.on('closed', () => console.log('Disconnected from MongoDB'))
}