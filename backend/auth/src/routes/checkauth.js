const express = require('express');
const { checkAuth } = require('../controllers/checkAuth');
const jwt = require('jsonwebtoken');


const router = express.Router();

router.post('/', checkAuth); // Llama al controlador de login

module.exports = router;