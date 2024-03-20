class Exception extends Error {
  // CONSTANT ERROR CODE
  static WRONG_DB_USERNAME_PASSWORD = 'Wrong Database Username and Password';
  static WRONG_SEVER_NAME = 'Wrong sever name/connection string';
  static CANT_CONNECT_MONGOOSE = 'Cant connect to Mongoose';
  constructor(message) {
    super(message);
  }
}

module.exports = Exception;
