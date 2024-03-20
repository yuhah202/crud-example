const mongoose = require('mongoose');
const Exception = require('../constants/Exceptions');
mongoose.set('strictQuery', true);

async function connect() {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI);
    console.log('CONNECT MONGO SUCCESS');

    return connection;
  } catch (err) {
    const { code } = err;
    if (code == 8000) {
      throw new Exception(Exception.WRONG_DB_USERNAME_PASSWORD);
    } else if (code == 'ENOTFOUND') {
      throw new Exception(Exception.WRONG_SEVER_NAME);
    }

    throw new Exception(Exception.CANT_CONNECT_MONGOOSE);
  }
}

module.exports = connect;
