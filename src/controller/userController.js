/* eslint no-underscore-dangle: 0 */
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import { Client } from 'pg';

dotenv.config();

class UserController {
  constructor() {
    this._connectionString = process.env.DATABASE_URL;
    this._client = new Client({
      connectionString: this._connectionString,
    });
    this._client.connect();
  }

  create(req, res, next) {
    bcrypt.hash(req.body.password, 10)
      .then((hash) => {
        const action = `INSERT INTO users(fullname, email, password, created_at, updated_at)
          VALUES($1, $2, $3, $4, $5) RETURNING fullname, email, created_at, updated_at`;
        const values = [req.body.fullname, req.body.email, hash, 'NOW()', 'NOW()'];
        const query = {
          text: action,
          values,
        };
        this._client.query(query)
          .then((result) => {
            res.status(201)
              .json({
                status: 'success',
                data: result.rows[0],
              });
          })
          .catch((e) => {
            next(e);
          });
      })
      .catch((err) => {
        next(err);
      });
  }
}

module.exports = UserController;
