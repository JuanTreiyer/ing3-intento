const express = require('express');
const { sendMessage, getMessages } = require('../controllers/messageController');
const asyncHandler = require('../middleware/asyncHandler');

const router = express.Router();

router.post('/sendMessage', asyncHandler(sendMessage));
//router.get('/getmessages', (req, res) => {
  //  res.send({ message: 'Hello world23' });
 // });
// Ruta para obtener los mensajes de la base de datos
router.get('/getmessages', asyncHandler(getMessages));
module.exports = router;
