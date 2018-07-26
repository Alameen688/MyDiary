'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /* eslint no-underscore-dangle: 0 */


var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

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
  }, {
    key: 'login',
    value: function login(req, res, next) {
      var _req$body = req.body,
          email = _req$body.email,
          password = _req$body.password;

      this._client.query('SELECT id, fullname, email, password FROM users WHERE email=($1)', [email]).then(function (result) {
        if (result.rowCount > 0) {
          var data = result.rows[0];
          _bcrypt2.default.compare(password, data.password).then(function (val) {
            if (val) {
              var token = _jsonwebtoken2.default.sign({
                id: data.id,
                email: data.email,
                fullname: data.fullname
              }, process.env.JWT_KEY, {
                expiresIn: process.env.JWT_EXPIRY
              });
              delete data.password;
              data.token = token;
              res.status(200).json({
                status: 'success',
                data: data
              });
            } else {
              var error = new Error('Credentials do not match any record');
              error.status = 401;
              next(error);
            }
          }).catch(function (err) {
            next(err);
          });
        } else {
          var error = new Error('Credentials do not match any record');
          error.status = 401;
          next(error);
        }
      }).catch(function (e) {
        next(e);
      });
    }
  }]);

  return UserController;
}();

module.exports = UserController;