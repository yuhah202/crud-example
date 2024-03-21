const jwt = require('jsonwebtoken');
const HttpStatusCode = require('../constants/HttpStatusCode');

function checkToken(req, res, next) {
  // Bypass Login, Register
  if (
    req.url.toLowerCase().trim() == '/user/login' ||
    req.url.toLowerCase().trim() == '/user/register'
  ) {
    next();
    return;
  }

  const token = req.headers?.authorization?.split(' ')[1];

  try {
    const jwtObject = jwt.verify(token, process.env.JWT_SECRET);
    const isExpired = Date.now() >= jwtObject.exp * 1000;

    if (isExpired) {
      res.status(HttpStatusCode.BAD_REQUEST).json({
        message: 'Token is expired',
      });

      res.end();
    } else {
      next();
    }
  } catch (error) {
    res.status(HttpStatusCode.BAD_REQUEST).json({
      message: 'You need to login first!!!',
    });
  }
}

module.exports = checkToken;
