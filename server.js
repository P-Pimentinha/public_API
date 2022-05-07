const express = require ('express');
const app = express();
const { connectDB } = require ('./startup/db');

connectDB();
require('./startup/routes')(app);


const port = process.env.PORT || 8000;
app.listen(port, function(err){
    if (err) console.log("Error in server setup");
    console.log("Server listening on Port", port);
});