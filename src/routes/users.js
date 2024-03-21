const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const { userController } = require('../controllers');

router.get('/', userController.getUser);

router.post(
  // ROUTE
  '/login',

  // VALIDATION
  body('email').isEmail(),
  body('password').isLength({ min: 5 }),

  // FUNCTION HANDLER
  userController.login,
);

router.post('/register', userController.register);

module.exports = router;
