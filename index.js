const express = require('express');
const bodyParser = require('body-parser');
const {
  getAllTalkers,
} = require('./middlewares/getAllTalkers');
const getTalkerById = require('./middlewares/getTalkerById');
const {
  handleEmail,
  handlePassword,
  handleLogin,
} = require('./middlewares/login');
const {
  handleToken,
  handleName,
  handleAge,
  handleWatchedAt,
  handleRate,
  handleTalk,
  createTalk,
} = require('./middlewares/createTalker');
const { editTalker } = require('./middlewares/editTalker');
const { deleteTalker } = require('./middlewares/deleteTalker');

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
app.post(
  '/talker',
  handleToken, handleName, handleAge,
  handleTalk, handleWatchedAt, handleRate, createTalk,
);
app.put(
  '/talker/:id',
  handleToken, handleName, handleAge,
  handleTalk, handleWatchedAt, handleRate, editTalker,
);
app.delete('/talker/:id', handleToken, deleteTalker);

app.listen(PORT, () => {
  console.log('Online');
});