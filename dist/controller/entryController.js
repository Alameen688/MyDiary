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
    value: function getById(req, res, next) {
      // using obj destructring
      var id = req.params.id;


      this._client.query('SELECT * FROM entries WHERE id=($1) AND user_id=($2)', [id, req.userData.id]).then(function (result) {
        if (result.rowCount > 0) {
          res.status(200).json({
            status: 'success',
            data: result.rows[0]
          });
        } else {
          var error = new Error("Entry doesn't exist");
          error.status = 404;
          next(error);
        }
      }).catch(function (e) {
        next(e);
      });
    }
  }, {
    key: 'update',
    value: function update(req, res, next) {
      var _this2 = this;

      var id = req.params.id;
      var body = req.body;


      var q = 'SELECT date_part(\'day\', created_at) as created_day,\n    date_part(\'month\', created_at) as created_month,\n    date_part(\'year\', created_at) as created_year,\n    date_part(\'day\', CURRENT_DATE) as this_day,\n    date_part(\'month\', CURRENT_DATE) as this_month,\n    date_part(\'year\', CURRENT_DATE) as this_year\n    FROM entries WHERE id=($1) AND user_id=($2)';
      var v = [id, req.userData.id];
      var selectQuery = {
        text: q,
        values: v
      };
      this._client.query(selectQuery).then(function (result) {
        if (result.rowCount > 0) {
          // alow edit for entries only on the same day it was created
          if (result.rows[0].created_day === result.rows[0].this_day && result.rows[0].created_month === result.rows[0].this_month && result.rows[0].created_year === result.rows[0].this_year) {
            var action = 'UPDATE entries SET title=($1), content=($2), updated_at=($3)\n              WHERE id=($4) AND user_id=($5) RETURNING *';
            var values = [body.title, body.content, 'NOW()', id, req.userData.id];
            var updateQuery = {
              text: action,
              values: values
            };
            _this2._client.query(updateQuery).then(function (output) {
              res.status(200).json({
                status: 'success',
                data: output.rows[0]
              });
            }).catch(function (err) {
              next(err);
            });
          } else {
            res.status(400).json({
              status: 'error',
              message: 'Sorry, an entry can only be updated the same day it was created'
            });
          }
        } else {
          var error = new Error("Entry doesn't exist");
          error.status = 404;
          next(error);
        }
      }).catch(function (e) {
        next(e);
      });
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