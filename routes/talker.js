const express = require('express');

const router = express.Router();

const {
  getAllTalkers,
} = require('../middlewares/getAllTalkers');
const getTalkerById = require('../middlewares/getTalkerById');

router.get('/', getAllTalkers);
router.get('/:id', getTalkerById);

module.exports = router;