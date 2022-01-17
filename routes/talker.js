const express = require('express');

const router = express.Router();

const {
  getAllTalkers,
} = require('../middlewares/getAllTalkers');

const getTalkerById = require('../middlewares/getTalkerById');

const {
  handleToken,
  handleName,
  handleAge,
  handleWatchedAt,
  handleRate,
  handleTalk,
  createTalk,
} = require('../middlewares/createTalker');

const { editTalker } = require('../middlewares/editTalker');

const { deleteTalker } = require('../middlewares/deleteTalker');
const searchTalker = require('../middlewares/searchTalker');

router.get('/search', handleToken, searchTalker);
router.get('/', getAllTalkers);
router.get('/:id', getTalkerById);
router.post('/', handleToken, handleName, handleAge,
handleTalk, handleWatchedAt, handleRate, createTalk); 
router.put('/:id', handleToken, handleName, handleAge,
handleTalk, handleWatchedAt, handleRate, editTalker);
router.delete('/:id', handleToken, deleteTalker);

module.exports = router;