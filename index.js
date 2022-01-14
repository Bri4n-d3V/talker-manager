const express = require('express');
const bodyParser = require('body-parser');
const { getAllTalkers } = require('./middlewares/getAllTalkers');
const getTalkerById = require('./middlewares/getTalkerById');
const { handleEmail, handlePassword, handleLogin } = require('./middlewares/login');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', getAllTalkers);
app.get('/talker/:id', getTalkerById);
app.post('/login', handleEmail, handlePassword, handleLogin);

app.listen(PORT, () => {
  console.log('Online');
});
