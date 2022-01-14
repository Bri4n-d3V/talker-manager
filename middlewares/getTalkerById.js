const { readFile } = require('./getAllTalkers');

const getTalkerById = async (req, res) => {
  const talkers = await readFile();
  console.log(talkers);
  const { id } = req.params;

  const talkerFindedById = talkers.find((talker) => talker.id === +id);

  if (!talkerFindedById) {
 return res.status(404).json({
    message: 'Pessoa palestrante não encontrada',
  }); 
}
  res.status(200).json(talkerFindedById);
  console.log(talkerFindedById);
};

module.exports = getTalkerById;