const express = require('express');
const { registerUser } = require('../controllers/registerController');

const router = express.Router();

router.post('/', registerUser); // Llama al controlador de registro

module.exports = router;
