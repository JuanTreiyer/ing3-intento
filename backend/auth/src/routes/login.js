const express = require('express');
const { loginUser } = require('../controllers/loginUser');

const router = express.Router();

router.post('/', loginUser); // Llama al controlador de login

module.exports = router;
