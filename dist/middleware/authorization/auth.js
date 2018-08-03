'use strict';

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Auth = function Auth() {
  _classCallCheck(this, Auth);
};

Auth.isValid = function (req, res, next) {
  try {
    // Removes Bearer keyword and takes the token after the space
    var token = req.headers.authorization.split(' ')[1];
    req.userData = _jsonwebtoken2.default.verify(token, process.env.JWT_KEY);
    next();
  } catch (error) {
    res.status(401).json({
      status: 'error',
      message: 'You are not authorized to perform this action'
    });
  }
};

module.exports = Auth;