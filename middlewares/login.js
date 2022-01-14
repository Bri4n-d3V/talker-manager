const validateEmail = (email) => {
  const regex = new RegExp('[a-z0-9]+@[a-z]+.[a-z]{2,3}');
  return regex.test(email);
};

const handleEmail = (req, res, next) => {
  const { email } = req.body;

  if (!email || email === '') {
    return res.status(400).json({
       message: 'O campo "email" é obrigatório',
     }); 
   }

   if (!validateEmail(email)) {
 return res.status(400).json({
    message: 'O "email" deve ter o formato "email@email.com"',
  }); 
}

next();
};

const handlePassword = (req, res, next) => {
  const { password } = req.body;

  if (!password || password === '') {
 return res.status(400).json({
    message: 'O campo "password" é obrigatório',
  }); 
}

  if (password.length < 6) {
    return res.status(400).json({
      message: 'O "password" deve ter pelo menos 6 caracteres',
    });
  }

  next();
};

const handleLogin = (_req, res) => {
  res.status(200).json({
    token: '7mqaVRXJSp886CGr',
  });
};

module.exports = { handleEmail, handlePassword, handleLogin };