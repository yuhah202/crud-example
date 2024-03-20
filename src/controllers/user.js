const { validationResult } = require('express-validator');
const { EventEmitter } = require('node:events');
const { userRepositories } = require('../repositories');
const CODE = require('../constants/HttpStatusCode');

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

  // CALL REPOSITORIES
  await userRepositories.login({ email, password });

  // EVENT EMITTER
  myEvent.emit('event.login.user', { email, password });

  res.status(CODE.SUCCESS).json({
    message: 'Login User SUCCESSFULLY!!',
  });
};

const register = async (req, res) => {
  res.status(CODE.INSERT_SUCCESS).json({
    message: 'Login User SUCCESSFULLY!!',
  });
};

const getUser = async (req, res) => {
  res.status(CODE.SUCCESS).json({
    message: 'GET USER SUCCESSFULLY!!!',
    data: {
      email: 'NGUYEN THANH HA HUY',
    },
  });

  res.send('GET USER');
};

module.exports = {
  login,
  register,
  getUser,
};
