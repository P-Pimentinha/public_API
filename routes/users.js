const express = require('express');
const router = express.Router();
const { User, validateUser, validateUpdateUser } = require('../models/user');
const mongoose = require('mongoose');


router.get('/', async (req, res) => {
    const users = await User.find();
    res.send(users);
  });

router.post('/', async (req, res) => {

  // Validation of the data in (req.body) using the imported validateUser function
  const { error } = validateUser(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  //Checks if the user_name is already registered    
  let user = await User.findOne({user_name: req.body.user_name});
  if (user) return res.status(400).send('User Name already registered');

  //creates the new user based on params passed on the body of the request
  user = new User({ 
    user_name: req.body.user_name,
    name: req.body.name,
    age: req.body.age,
    address: req.body.address
  });
  
  //saves the user on the DataBase
  await user.save();
  
  //sends the costumer object
  res.send(user);
});

router.put('/:id', async (req, res) => {
  
  // Validation of the data in (req.body) using the imported validateUpdateUser function 
  const { error } = validateUpdateUser(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  //Mongoose checks if id is a valid MongoDB ID. (Does not check if the ID is in the Database)
  if (!mongoose.isValidObjectId(req.params.id))
    return res.status(404).send('Invalid ID.');
  
  //Checks if the ID exists in the DataBase
  let id = await User.findById(req.params.id)
    if (!id) return res.status(404).send('The user with the given ID was not found.');

  //If the user wants to update user_name the following function will check if user_name is already registered. Prevents users having the same user_name 
  let user = await User.findOne({user_name: req.body.user_name});
  if (user) return res.status(400).send('User Name already registered');

  user = await User.findByIdAndUpdate(req.params.id, { 
    user_name: req.body.user_name,
    name: req.body.name,
    age: req.body.age,
    address: req.body.address }, {
    new: true
  });
  
  /* if (!user) return res.status(404).send('The user with the given ID was not found.'); */

  res.send(user);
});

router.delete('/:id', async (req, res) => {

  //Mongoose checks if id is a valid MongoDB ID. (Does not check if the ID is in the Database)
  if (!mongoose.isValidObjectId(req.params.id))
    return res.status(404).send('Invalid ID.');
  
  

  const user = await User.findByIdAndRemove(req.params.id);

  if (!user) return res.status(404).send('The user with the given ID was not found.');

  res.send(user);
});

module.exports = router;

