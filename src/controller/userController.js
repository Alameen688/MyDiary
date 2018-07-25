/* eslint no-underscore-dangle: 0 */
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
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

  login(req, res, next) {
    const { email, password } = req.body;
    this._client.query('SELECT id, fullname, email, password FROM users WHERE email=($1)', [email])
      .then((result) => {
        if (result.rowCount > 0) {
          const data = result.rows[0];
          bcrypt.compare(password, data.password)
            .then((val) => {
              if (val) {
                const token = jwt.sign(
                  {
                    email: data.email,
                    fullname: data.fullname,
                  },
                  process.env.JWT_KEY,
                  {
                    expiresIn: process.env.JWT_EXPIRY,
                  },
                );
                delete data.password;
                data.token = token;
                res.status(200)
                  .json({
                    status: 'success',
                    data,
                  });
              } else {
                const error = new Error('Credentials do not match any record');
                error.status = 401;
                next(error);
              }
            })
            .catch((err) => {
              next(err);
            });
        } else {
          const error = new Error('Credentials do not match any record');
          error.status = 401;
          next(error);
        }
      })
      .catch((e) => {
        next(e);
      });
  }
}

module.exports = UserController;
