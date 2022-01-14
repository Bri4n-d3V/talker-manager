const fs = require('fs').promises;
const {
  readFile,
} = require('./getAllTalkers');

const handleToken = (req, res, next) => {
  const {
    authorization,
  } = req.headers;

  if (!authorization) {
    return res.status(401).json({
      message: 'Token não encontrado',
    });
  }

  if (authorization !== '7mqaVRXJSp886CGr') {
    return res.status(401).json({
      message: 'Token inválido',
    });
  }

  next();
};

const handleName = (req, res, next) => {
  const {
    name,
  } = req.body;

  if (!name || name === '') {
    return res.status(400).json({
      message: 'O campo "name" é obrigatório',
    });
  }

  if (name.length < 3) {
    return res.status(400).json({
      message: 'O "name" deve ter pelo menos 3 caracteres',
    });
  }

  next();
};

const handleAge = (req, res, next) => {
  const {
    age,
  } = req.body;

  if (!age || age === '') {
    return res.status(400).json({
      message: 'O campo "age" é obrigatório',
    });
  }

  if (age <= 18) {
    return res.status(400).json({
      message: 'A pessoa palestrante deve ser maior de idade',
    });
  }

  next();
};

function talkExist({ watchedAt, rate }) {
  const rateBody = !rate && rate !== 0;
  return !watchedAt || rateBody;
}

const handleTalk = (req, res, next) => {
  const { talk } = req.body;

  if (!talk || talkExist(talk)) {
    return res.status(400).json({
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    });
  }

  next();
};

const validateWatchedAt = (watchedAt) => {
  const regex = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i;
  return regex.test(watchedAt);
};

const handleWatchedAt = (req, res, next) => {
  if (req.body.talk) {
    const { watchedAt } = req.body.talk;
    if (!validateWatchedAt(watchedAt)) {
      return res.status(400).json({
        message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
      });
    }
  }

  next();
};

const handleRate = (req, res, next) => {
  if (req.body.talk) {
  const { rate } = req.body.talk;

  const condition = ![1, 2, 3, 4, 5].includes(Number(rate));
  if (condition) {
    return res.status(400).json({
      message: 'O campo "rate" deve ser um inteiro de 1 à 5',
    });
  }
}

  next();
};

const writeTalker = async (talkers) => {
  await fs.writeFile('./talker.json', JSON.stringify(talkers));
};

const editTalker = async (req, res) => {
  const { id } = req.params;
  const talkers = await readFile();
  const talkerEdited = { ...req.body, id: +id };
  const talkersWithoutOldTalker = talkers.filter((talker) => talker.id !== +id);
  const newTalkers = [...talkersWithoutOldTalker, talkerEdited];
  writeTalker(newTalkers);
  res.status(200).json(talkerEdited);
};

module.exports = {
  handleToken,
  handleName,
  handleAge,
  handleWatchedAt,
  handleRate,
  handleTalk,
  editTalker,
};