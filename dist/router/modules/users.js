'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _expressValidation = require('express-validation');

var _expressValidation2 = _interopRequireDefault(_expressValidation);

var _userController = require('../../controller/userController');

var _userController2 = _interopRequireDefault(_userController);

var _index = require('../../middleware/validation/index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();
var user = new _userController2.default();

// add a new user
router.post('/signup', (0, _expressValidation2.default)(_index2.default.User.signup), function (req, res, next) {
  user.create(req, res, next);
});

// login user
router.post('/login', (0, _expressValidation2.default)(_index2.default.User.login), function (req, res, next) {
  user.login(req, res, next);
});

module.exports = router;