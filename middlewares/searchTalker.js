const {
  readFile,
} = require('./getAllTalkers');

const searchTalker = async (req, res) => {
  const { q } = req.query;

  const talkers = await readFile();

  const SearchedTalker = talkers.filter((t) => t.name.includes(q));

  res.status(200).json(SearchedTalker);
};

module.exports = searchTalker;