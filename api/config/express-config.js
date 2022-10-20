require('dotenv').config();

const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors(
  {
    origin: process.env.CLIENT_URL,
    credentials: true,
  },
));

(async () => {
  const database = require('../database/index');
  const Usuario = require('../src/domains/users/models/User');
  // const Tarefa = require('../models/Tarefa');

  try {
      const resultado = await database.sync();
      const resultadoCreate = await Usuario.create({
          name: 'amor',
          email: 'admin@admin.com',
          password: '123Seguro&'
      })
      console.log(resultadoCreate);
      console.log(resultado);
  } catch (error) {
      console.log(error);
  }
})();

const cookieParser = require('cookie-parser');
app.use(cookieParser());

app.use(express.urlencoded({
  extended: true,
}));

app.use(express.json());

const usersRouter = require('../src/domains/users/controllers/index.js');
app.use('/api/users', usersRouter);

const stickersRouter = require('../src/domains/stickers/controllers/index.js');
app.use('/api/stickers', stickersRouter);

const usersStickersRouter = require('../src/domains/userStickers/controllers/index.js');
app.use('/api/userStickers', usersStickersRouter);

const errorHandler = require('../src/middlewares/error-handler.js');
app.use(errorHandler);

module.exports = app;
