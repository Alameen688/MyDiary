'use strict';

var _entries = require('./modules/entries');

var _entries2 = _interopRequireDefault(_entries);

var _users = require('./modules/users');

var _users2 = _interopRequireDefault(_users);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
  entries: _entries2.default,
  users: _users2.default
};