const express = require('express');

const router = express.Router();

const { handleEmail, handlePassword, handleLogin } = require('../middlewares/login');

router.post('/', handleEmail, handlePassword, handleLogin);

module.exports = router;