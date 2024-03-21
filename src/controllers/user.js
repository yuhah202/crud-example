const { validationResult } = require('express-validator');
const { EventEmitter } = require('node:events');
const { userRepositories } = require('../repositories');
const HttpStatusCode = require('../constants/HttpStatusCode');
const jwt = require('jsonwebtoken');

const myEvent = new EventEmitter();

myEvent.on('event.login.user', (params) => {
  console.log(`I'm listening event about:  ${JSON.stringify(params)}`);
});

const login = async (req, res) => {
  const { email, password } = req.body;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(CODE.BAD_REQUEST).json({ errors: errors.array() });
  }

  // EVENT EMITTER
  myEvent.emit('event.login.user', { email, password });

  try {
    // CALL REPOSITORIES
    const { token } = await userRepositories.login({
      email,
      password,
    });

    res.status(HttpStatusCode.SUCCESS).json({
      message: 'Login User SUCCESSFULLY!!',
      data: {
        accessToken: token,
      },
    });
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SEVER_ERROR).json({
      message: error.toString(),
    });
  }
};

const register = async (req, res) => {
  const { email, phoneNumber, password, name } = req.body;

  try {
    const dataUserRegister = await userRepositories.register({
      email,
      phoneNumber,
      password,
      name,
    });

    res.status(HttpStatusCode.INSERT_SUCCESS).json({
      message: 'Register User SUCCESSFULLY!!',
      data: dataUserRegister,
    });
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SEVER_ERROR).json({
      message: error.toString(),
    });
  }
};

const getUser = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    const { data } = jwt.verify(token, process.env.JWT_SECRET);

    const dataUser = await userRepositories.user(data);

    res.status(HttpStatusCode.INSERT_SUCCESS).json({
      message: 'Get User SUCCESSFULLY!!',
      data: dataUser,
    });
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SEVER_ERROR).json({
      message: error.toString(),
    });
  }
};

module.exports = {
  login,
  register,
  getUser,
};
