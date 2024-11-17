const express = require('express');
const adminController = require('../controllers/adminController');
const auth = require('../middleware/Auth');

const router = express.Router();

router.post('/register', adminController.register);
router.post('/login', adminController.login);
router.get('/assignments', auth, adminController.getAssignments);
router.post('/assignments/:id/accept', auth, adminController.acceptAssignment);
router.post('/assignments/:id/reject', auth, adminController.rejectAssignment);

module.exports = router;

// well structured express routing