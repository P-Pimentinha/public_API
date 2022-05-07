require('express-async-errors');
const express = require('express');
const users = require ('../routes/users')
const error = require('../middleware/error');


module.exports = function(app){
    
    app.use(express.json());
    app.use('/api/users', users);
    //Error handling middleware
    app.use(error);
    }