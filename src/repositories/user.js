const login = async ({ email, password }) => {
  console.log('LOGIN USER IN USER REPOSITORIES');
};

const register = async ({ email, password, name, phoneNumber }) => {
  console.log(
    'REGISTER USER IN USER WITH NAME: ' +
      name +
      ', email: ' +
      email +
      ', password: ' +
      password +
      ', phoneNumber: ' +
      phoneNumber,
  );
};

module.exports = {
  login,
  register,
};
