class Exception extends Error {
  // CONSTANT ERROR CODE
  static WRONG_DB_USERNAME_PASSWORD = 'Wrong Database Username and Password';
  static WRONG_SEVER_NAME = 'Wrong sever name/connection string';
  static CANT_CONNECT_MONGOOSE = 'Cant connect to Mongoose';
  static USER_ALREADY_EXIST = 'User Already Exist';
  static CANT_REGISTER_USER = 'Cant Register User';
  static WRONG_USERNAME_OR_PASSWORD = 'Wrong Email or Password!';
  static CANT_GET_USER = 'CANT GET USER';
  constructor(message) {
    super(message);
  }
}

module.exports = Exception;
