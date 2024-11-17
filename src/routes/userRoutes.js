const express = require('express');
const userController = require('../controllers/userController');
const auth = require('../middleware/Auth');

const router = express.Router();

router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/upload', auth, userController.uploadAssignment);
router.get('/admins', auth, userController.getAdmins);

module.exports = router;

//structured express routing