const fs = require('fs').promises;
const {
  readFile,
} = require('./getAllTalkers');

const writeTalker = async (talkers) => {
  await fs.writeFile('./talker.json', JSON.stringify(talkers));
};

const deleteTalker = async (req, res) => {
  const { id } = req.params;

  const talkers = await readFile();

  const OriginalTalkers = talkers.filter((t) => t.id !== +id);

  writeTalker(OriginalTalkers);

  res.status(204).json({ message: 'Pessoa palestrante deletada com sucesso' });
};

module.exports = { writeTalker, deleteTalker };