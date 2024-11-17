const User = require('../models/User');
const Assignment = require('../models/Assignment');
const jwt = require('jsonwebtoken');
const { validateRegister, validateLogin } = require('../validators/userValidator');
const { z } = require('zod');

const register = async (req, res) => {
    try {
      // Validate input data
      validateRegister(req.body);// zod(lib) input validation
  
      const user = new User(req.body); // new user creation
      await user.save();
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);//JWT token generation
      res.status(201).send({ user, token });
    } catch (error) {
      if (error instanceof z.ZodError) {// zod error for inputs
        return res.status(400).send({ errors: error.errors });
      }
      res.status(400).send(error);
    }
  };

  const login = async (req, res) => {
    try {
      // Validate input data
      validateLogin(req.body); //zod(library) input validation 
  
      const user = await User.findOne({ username: req.body.username });// check existing user
      if (!user || !(await user.comparePassword(req.body.password))) {
        return res.status(401).send({ error: 'Invalid login credentials' });
      }
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);//JWT token generation
      res.send({ user, token });
    } catch (error) {
      if (error instanceof z.ZodError) { // zod library errors for wrong inputs
        return res.status(400).send({ errors: error.errors });
      }
      res.status(400).send(error);
    }
  };

const uploadAssignment = async (req, res) => {
    try {
      const assignment = new Assignment({// creating new assignment
        userId: req.user.username, 
        task: req.body.task,
        admin: req.body.admin, // admin in the request
      });
      await assignment.save();// save assignment in the database
      res.status(201).send(assignment);
    } catch (error) {
      res.status(400).send(error);
    }
  };

const getAdmins = async (req, res) => {
  try {
    const admins = await User.find({ // fetch all the admins
        isAdmin: true 
    },'username');
    res.send(admins);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  register,
  login,
  uploadAssignment,
  getAdmins,
};
