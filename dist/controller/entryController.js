'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _entryHandler = require('../handler/entryHandler');

var _entryHandler2 = _interopRequireDefault(_entryHandler);

var _clientController = require('./clientController');

var _clientController2 = _interopRequireDefault(_clientController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint no-underscore-dangle: 0 */


var EntryController = function (_ClientController) {
  _inherits(EntryController, _ClientController);

  function EntryController() {
    _classCallCheck(this, EntryController);

    var _this = _possibleConstructorReturn(this, (EntryController.__proto__ || Object.getPrototypeOf(EntryController)).call(this));

    _this._entry = new _entryHandler2.default();
    return _this;
  }

  _createClass(EntryController, [{
    key: 'create',
    value: function create(req, res, next) {
      var action = 'INSERT INTO entries(title, content, user_id, created_at, updated_at)\n      VALUES($1, $2, $3, $4, $5) RETURNING title, content, created_at, updated_at ';
      var values = [req.body.title, req.body.content, req.userData.id, 'NOW()', 'NOW()'];
      var query = {
        text: action,
        values: values
      };
      this._client.query(query).then(function (result) {
        res.status(201).json({
          status: 'success',
          data: result.rows[0]
        });
      }).catch(function (e) {
        next(e);
      });
    }
  }, {
    key: 'getAll',
    value: function getAll(req, res) {
      this._client.query('SELECT * FROM entries WHERE user_id=($1) ORDER BY id DESC', [req.userData.id]).then(function (result) {
        res.status(200).json({
          status: 'success',
          data: result.rows || []
        });
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
}(_clientController2.default);

module.exports = EntryController;