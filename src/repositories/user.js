const { User } = require('../models');
const Exception = require('../constants/Exceptions');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const login = async ({ email, password }) => {
  const existingUser = await User.findOne({ email }).exec();

  if (existingUser) {
    const isMatchPassword = await bcrypt.compare(
      password,
      existingUser.password,
    );

    if (isMatchPassword) {
      // create JWT
      const token = jwt.sign(
        {
          data: existingUser,
        },
        process.env.JWT_SECRET,
        {
          // expiresIn: 60, // 1 MINUTE
          expiresIn: '10 days', // 1 MINUTE
        },
      );

      return {
        ...existingUser.toObject(),
        password: 'Hidden',
        token,
      };
    } else {
      throw new Exception(Exception.WRONG_USERNAME_OR_PASSWORD);
    }
  } else {
    throw new Exception(Exception.WRONG_USERNAME_OR_PASSWORD);
  }
};

const register = async ({ email, password, name, phoneNumber }) => {
  try {
    const existingUser = await User.findOne({ email }).exec();

    if (!!existingUser) {
      throw new Exception(Exception.USER_ALREADY_EXIST);
    }
    const hashedPassword = await bcrypt.hash(
      password,
      parseInt(process.env.SALT_ROUNDS),
    );

    //Insert Data to Database
    const newUser = await User.create({
      email,
      password: hashedPassword,
      name,
      phoneNumber,
    });

    return newUser;
  } catch (error) {
    // Check model validation here

    throw new Exception(Exception.CANT_REGISTER_USER);
  }
};

const user = async ({ email }) => {
  try {
    const existingUser = await User.findOne({ email }).exec();

    if (!!existingUser) {
      const objectReturn = existingUser.toObject();
      delete objectReturn.password;
      return {
        ...objectReturn,
      };
    } else {
      throw new Exception(Exception.CANT_GET_USER);
    }
  } catch (error) {
    throw new Exception(Exception.CANT_GET_USER);
  }
};

module.exports = {
  login,
  register,
  user,
};
