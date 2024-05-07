const express = require('express');
const { login, register } = require('../route-handlers/auth.js');
const { loginSchema } = require('../validator/auth.js');
const router = express.Router();

router.post('/login', loginSchema, login);
router.post('/register', register);

module.exports = router;
