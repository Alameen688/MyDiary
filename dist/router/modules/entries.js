'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _expressValidation = require('express-validation');

var _expressValidation2 = _interopRequireDefault(_expressValidation);

var _entryController = require('../../controller/entryController');

var _entryController2 = _interopRequireDefault(_entryController);

var _index = require('../../middleware/validation/index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();
var entry = new _entryController2.default();

// get all entries
router.get('/', function (req, res) {
  entry.getAll(req, res);
});

// add a new entry
router.post('/', (0, _expressValidation2.default)(_index2.default.Entry.create), function (req, res) {
  entry.create(req, res);
});

// get entry by id
router.get('/:id', (0, _expressValidation2.default)(_index2.default.Entry.getById), function (req, res) {
  entry.getById(req, res);
});

// update entry
router.put('/:id', (0, _expressValidation2.default)(_index2.default.Entry.update), function (req, res) {
  entry.update(req, res);
});

// delete entry
router.delete('/:id', (0, _expressValidation2.default)(_index2.default.Entry.delete), function (req, res) {
  entry.delete(req, res);
});

module.exports = router;