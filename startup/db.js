const mongoose = require('mongoose');

const connectDB = async () => {
    try{
        // mongodb://localhost/test_test; you can change test_test to any other name you would like to give your DB. ex:mongodb://localhost/myStore
        const db = 'mongodb://localhost/test_test'; 
        await mongoose.connect(db);
        console.log('MongoDb connected!!');
    } catch(err) {
        console.log('Failed to connect to  MongoDB', err);
    }
}

exports.connectDB = connectDB;