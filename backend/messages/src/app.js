const cors = require('cors'); // Importar CORS
const express = require('express');
const app = express();
const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const helmet = require('helmet');
const messagesRouter = require('./routes/messages');
const errorHandler = require('./middleware/errorHandler'); 
app.use(cookieParser());

app.use(cors({
  origin: 'http://localhost:3000', 
  credentials: true 
}));




app.use(helmet());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use('/messages', messagesRouter);



app.use((req, res, next) => {
  next(createError.NotFound());
});


app.use(errorHandler);

module.exports = app;
