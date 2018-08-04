'use strict';

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _pg = require('pg');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } /* eslint no-underscore-dangle: 0 */


_dotenv2.default.config();

var ClientController = function ClientController() {
  _classCallCheck(this, ClientController);

  this._connectionString = process.env.DATABASE_URL;
  this._client = new _pg.Client({
    connectionString: this._connectionString
  });
  this._client.connect();
};

module.exports = ClientController;