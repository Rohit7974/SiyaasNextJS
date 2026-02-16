const express = require('express');
const router = express.Router();
const { register, login, updateUser } = require('../controllers/authController');

router.post('/signup', register);
router.post('/login', login);
router.put('/users/:id', updateUser);

module.exports = router;