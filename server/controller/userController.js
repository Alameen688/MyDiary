/* eslint no-underscore-dangle: 0 */
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import ClientController from './clientController';

dotenv.config();

class UserController extends ClientController {
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
            // check if the error was caused by a unique key constraint violation
            // send a 409 status and a meaningful error msf for a user
            // error code 23505 = unique_violation as specified in https://www.postgresql.org/docs/9.1/static/errcodes-appendix.html
            // 10 is the radix to prevent eslint error -Missing radix parameter
            if (parseInt(e.code, 10) === 23505) {
              e.status = 409;
              e.message = 'Sorry, an account with this email already exist';
            }
            next(e);
          });
      })
      .catch((err) => {
        next(err);
      });
  }

  login(req, res, next) {
    const { email, password } = req.body;
    this._client.query('SELECT id, fullname, email, password, fav_quote FROM users WHERE email=($1)', [email])
      .then((result) => {
        if (result.rowCount > 0) {
          const data = result.rows[0];
          bcrypt.compare(password, data.password)
            .then((val) => {
              if (val) {
                const token = jwt.sign(
                  {
                    id: data.id,
                    email: data.email,
                    fullname: data.fullname,
                    fav_quote: data.fav_quote,
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

  update(req, res, next) {
    const { fullname, email } = req.body;
    const favouriteQuote = (Object.prototype.hasOwnProperty.call(req.body, 'fav_quote')) ? req.body.fav_quote : null;
    const text = 'UPDATE users SET fullname=($1), email=($2), fav_quote=($3), updated_at=($4) WHERE id=($5) RETURNING id, fullname, email, fav_quote';
    const values = [fullname, email, favouriteQuote, 'NOW()', req.userData.id];
    const query = {
      text,
      values,
    };
    this._client.query(query)
      .then((result) => {
        res.status(200)
          .json({
            status: 'success',
            data: result.rows[0],
          });
      })
      .catch((e) => {
        next(e);
      });
  }
}

export default UserController;
