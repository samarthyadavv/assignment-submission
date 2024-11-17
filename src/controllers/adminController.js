const User = require('../models/User');
const Assignment = require('../models/Assignment');
const jwt = require('jsonwebtoken');
const { validateRegister, validateLogin } = require('../validators/userValidator');
const { z } = require('zod');

const register = async (req, res) => {
  try {
    // Validate incoming request data using Zod
    validateRegister(req.body);
    
    const admin = new User({ ...req.body, isAdmin: true });// New User Creation
    await admin.save();
    const token = jwt.sign({ _id: admin._id }, process.env.JWT_SECRET);//JWT generation
    res.status(201).send({ admin, token });
  } catch (error) {
    if (error.name === 'ZodError') {
      return res.status(400).send({ error: error.errors });
    }
    res.status(400).send(error);
  }
};

const login = async (req, res) => {
  try {
    // Validate incoming request data using Zod
    validateLogin(req.body);
    
    const admin = await User.findOne({ username: req.body.username, isAdmin: true });// find admin user by username
    if (!admin || !(await admin.comparePassword(req.body.password))) {
      return res.status(401).send({ error: 'Invalid login credentials' });
    }
    const token = jwt.sign({ _id: admin._id }, process.env.JWT_SECRET);//JWT Token for admin
    res.send({ admin, token });
  } catch (error) {
    if (error.name === 'ZodError') {    // zod validation library error
      return res.status(400).send({ error: error.errors });
    }
    res.status(400).send(error);
  }
};

const getAssignments = async (req, res) => {
  try {
    const assignments = await Assignment.find({ admin: req.user.username }) // Fetch assignments for the logged-in admin
      .select('userId task submittedAt status')
      .sort({ submittedAt: -1 });
    res.send(assignments);  // Respond with the list of assignments
  } catch (error) {
    res.status(500).send(error);
  }
};

const acceptAssignment = async (req, res) => {
  try {
    // Find the assignment by ID and admin's username
    const assignment = await Assignment.findOne({ _id: req.params.id, admin: req.user.username });
    if (!assignment) {
      return res.status(404).send({ error: 'Assignment not found' });
    }
    // Update the status of the assignment to 'accepted'
    assignment.status = 'accepted';
    await assignment.save();
    // Respond with the updated assignment
    res.send(assignment);
  } catch (error) {
    console.error('Error accepting assignment:', error);
    res.status(400).send(error);
  }
};

const rejectAssignment = async (req, res) => {
  try {
    // Find the assignment by ID and admins username
    const assignment = await Assignment.findOne({ _id: req.params.id, admin: req.user.username });
    if (!assignment) {
      return res.status(404).send({ error: 'Assignment not found' });
    }
    assignment.status = 'rejected'; //updates assignment status
    await assignment.save();
    res.send(assignment); //respond with updated assignment
  } catch (error) {
    console.error('Error rejecting assignment:', error);
    res.status(400).send(error);
  }
};

module.exports = {
  register,
  login,
  getAssignments,
  acceptAssignment,
  rejectAssignment
};