/* eslint no-underscore-dangle: 0 */
import dotenv from 'dotenv';
import ClientController from './clientController';

dotenv.config();

class UserController extends ClientController {
  getUserDetails(req, res, next) {
    // using obj destructring
    const { id } = req.userData;
    const query = `SELECT u.id, u.fullname, u.email, u.fav_quote, u.notification, u.notification_time, COUNT(e.id) AS entry_count
      FROM users u
      LEFT JOIN entries e
      ON u.id = e.user_id
      WHERE u.id=($1)
      GROUP BY u.id`;
    this._client.query(query, [id])
      .then((result) => {
        if (result.rowCount > 0) {
          res.status(200)
            .json({
              status: 'success',
              data: result.rows[0],
            });
        } else {
          const error = new Error("User doesn't exist");
          error.status = 404;
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

  notificationSettings(req, res, next) {
    const { status } = req.body;
    const text = 'UPDATE users SET notification=($1) WHERE id=($2) RETURNING notification';
    const values = [status, req.userData.id];
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
