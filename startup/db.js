const mongoose = require('mongoose');

const connectDB = async () => {
    try{
        const db = 'mongodb://localhost/test_test';
        await mongoose.connect(db);
        console.log('MongoDb connected!!');
    } catch(err) {
        console.log('Failed to connect to  MongoDB', err);
    }
}

exports.connectDB = connectDB;