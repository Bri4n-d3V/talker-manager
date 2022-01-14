const fs = require('fs').promises;

const readFile = async () => {
  const talker = await fs.readFile('./talker.json', 'utf8');
  const response = await JSON.parse(talker);
  return response;
};

const getAllTalkers = async (_req, res) => {
  const api = await readFile();

  res.status(200).json(api);
};

module.exports = { readFile, getAllTalkers };