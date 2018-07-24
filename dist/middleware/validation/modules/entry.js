'use strict';

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Entry = function Entry() {
  _classCallCheck(this, Entry);
};
// static class property of Entry validation class

Entry.create = {
  body: {
    title: _joi2.default.string().required(),
    content: _joi2.default.string().required()
  }
};

Entry.getById = {
  params: {
    id: _joi2.default.string().max(16).required()
  }
};

Entry.update = {
  params: {
    id: _joi2.default.string().max(16).required()
  },
  body: {
    title: _joi2.default.string().required(),
    content: _joi2.default.string().required()
  }
};

Entry.delete = {
  params: {
    id: _joi2.default.string().max(16).required()
  }
};

module.exports = Entry;