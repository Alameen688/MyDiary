'use strict';

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _pg = require('pg');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();
var connectionString = process.env.DATABASE_URL;
var client = new _pg.Client({
  connectionString: connectionString
});
client.connect(function (err) {
  if (err) {
    console.log(err.message);
  }
});

var userTableQuery = 'CREATE TABLE users(id SERIAL PRIMARY KEY, fullname VARCHAR(255) NOT NULL, email VARCHAR(225) UNIQUE NOT NULL, password TEXT NOT NULL, created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(), updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW())';
var entriesTableQuery = 'CREATE TABLE entries(id SERIAL PRIMARY KEY, title TEXT NOT NULL, content TEXT NOT NULL, user_id INTEGER NOT NULL, created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(), updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW())';

var tableQuery = userTableQuery + ' ; ' + entriesTableQuery;
client.query(tableQuery, function (error) {
  client.end();
  if (error) {
    console.log(error.message);
    return;
  }
  console.log('Migrations successful');
});