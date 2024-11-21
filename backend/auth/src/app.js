const cors = require('cors');
const express = require('express');
const app = express();
require('dotenv').config();
const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const helmet = require('helmet');


app.use(cookieParser());

const indexRouter = require('./routes/index');
const loginRouter = require('./routes/login');
const registerRouter = require('./routes/register');
const usersRouter = require('./routes/users'); 

const errorHandler = require('./middleware/errorHandler');




app.use(cors({
  origin: 'http://localhost:3000', 
  credentials: true 
}));


// Middlewares de seguridad y registro
app.use(helmet());
app.use(logger('dev'));

// Middlewares de análisis de datos y manejo de cookies
app.use(express.json());

app.post('/checkauth', (req, res) => {
  console.log('Token recibido en checkauth:', req.body.cookietoken);

  try {
    const decoded = jwt.verify(req.body.cookietoken, process.env.TOKEN_SECRET);
    console.log('Token decodificado:', decoded);
    res.status(200).json({ userId: decoded.id });
  } catch (err) {
    console.error('Error al verificar el token:', err.message);
    res.status(401).json({ message: 'Token inválido' });
  }
});


app.use(express.urlencoded({ extended: false }));


// Rutas de la aplicación
app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/users', usersRouter); 


app.use((req, res, next) => {
  next(createError.NotFound());
});


app.use(errorHandler);

module.exports = app;
