'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /* eslint no-underscore-dangle: 0 */


var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _pg = require('pg');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

_dotenv2.default.config();

var UserController = function () {
  function UserController() {
    _classCallCheck(this, UserController);

    this._connectionString = process.env.DATABASE_URL;
    this._client = new _pg.Client({
      connectionString: this._connectionString
    });
    this._client.connect();
  }

  _createClass(UserController, [{
    key: 'create',
    value: function create(req, res, next) {
      var _this = this;

      _bcrypt2.default.hash(req.body.password, 10).then(function (hash) {
        var action = 'INSERT INTO users(fullname, email, password, created_at, updated_at)\n          VALUES($1, $2, $3, $4, $5) RETURNING fullname, email, created_at, updated_at';
        var values = [req.body.fullname, req.body.email, hash, 'NOW()', 'NOW()'];
        var query = {
          text: action,
          values: values
        };
        _this._client.query(query).then(function (result) {
          res.status(201).json({
            status: 'success',
            data: result.rows[0]
          });
        }).catch(function (e) {
          next(e);
        });
      }).catch(function (err) {
        next(err);
      });
    }
  }]);

  return UserController;
}();

module.exports = UserController;