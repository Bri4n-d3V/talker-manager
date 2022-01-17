const express = require('express');

const router = express.Router();

const {
  getAllTalkers,
} = require('../middlewares/getAllTalkers');

router.get('/', getAllTalkers);

module.exports = router;