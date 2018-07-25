'use strict';

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var User = function User() {
  _classCallCheck(this, User);
};
// static class property of User validation class

User.signup = {
  body: {
    fullname: _joi2.default.string().required(),
    email: _joi2.default.string().email().required(),
    password: _joi2.default.string().regex(/^[a-zA-Z0-9]{3,100}$/).required()
  }
};

module.exports = User;