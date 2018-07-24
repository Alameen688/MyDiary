'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /* eslint no-underscore-dangle: 0 */


var _entryHandler = require('../handler/entryHandler');

var _entryHandler2 = _interopRequireDefault(_entryHandler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EntryController = function () {
  function EntryController() {
    _classCallCheck(this, EntryController);

    this._entry = new _entryHandler2.default();
  }

  _createClass(EntryController, [{
    key: 'create',
    value: function create(req, res) {
      var result = this._entry.addEntry(req.body.title, req.body.content);
      res.status(200).json({
        status: 'success',
        data: result
      });
    }
  }, {
    key: 'getAll',
    value: function getAll(req, res) {
      var result = this._entry.getAllEntry();
      res.status(200).json({
        status: 'success',
        data: result
      });
    }
  }, {
    key: 'getById',
    value: function getById(req, res) {
      // using obj destructring
      var id = req.params.id;

      var result = this._entry.findEntry(id);
      res.status(200).json({
        status: 'success',
        data: result
      });
    }
  }, {
    key: 'update',
    value: function update(req, res) {
      var id = req.params.id;
      var body = req.body;

      var result = this._entry.updateEntry(id, body);
      if (result !== null) {
        res.status(200).json({
          status: 'success',
          data: result
        });
      } else {
        // has error property to match the pattern of validation error response
        res.status(404).json({
          status: 'error',
          message: 'Oops entry not found',
          errors: ["entry with id doesn't exist"]
        });
      }
    }
  }, {
    key: 'delete',
    value: function _delete(req, res) {
      var id = req.params.id;

      var result = this._entry.deleteEntry(id);
      // if item was deleted successully, it will return undefined
      if (result !== null && result === undefined) {
        res.status(200).json({
          status: 'success',
          data: {}
        });
      } else {
        // has error property to match the pattern of validation error response
        res.status(404).json({
          status: 'error',
          message: 'Unable to delete entry',
          errors: ["entry with id doesn't exist"]
        });
      }
    }
  }]);

  return EntryController;
}();

module.exports = EntryController;