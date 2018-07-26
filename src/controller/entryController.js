/* eslint no-underscore-dangle: 0 */
import ClientController from './clientController';

class EntryController extends ClientController {
  create(req, res, next) {
    const action = `INSERT INTO entries(title, content, user_id, created_at, updated_at)
      VALUES($1, $2, $3, $4, $5) RETURNING title, content, created_at, updated_at `;
    const values = [req.body.title, req.body.content, req.userData.id, 'NOW()', 'NOW()'];
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
  }

  getAll(req, res) {
    this._client.query('SELECT * FROM entries WHERE user_id=($1) ORDER BY id DESC', [req.userData.id])
      .then((result) => {
        res.status(200)
          .json({
            status: 'success',
            data: result.rows || [],
          });
      });
  }

  getById(req, res, next) {
    // using obj destructring
    const { id } = req.params;

    this._client.query('SELECT * FROM entries WHERE id=($1) AND user_id=($2)', [id, req.userData.id])
      .then((result) => {
        if (result.rowCount > 0) {
          res.status(200)
            .json({
              status: 'success',
              data: result.rows[0],
            });
        } else {
          const error = new Error("Entry doesn't exist");
          error.status = 404;
          next(error);
        }
      })
      .catch((e) => {
        next(e);
      });
  }

  update(req, res, next) {
    const { id } = req.params;
    const { body } = req;

    const q = `SELECT date_part('day', created_at) as created_day,
    date_part('month', created_at) as created_month,
    date_part('year', created_at) as created_year,
    date_part('day', CURRENT_DATE) as this_day,
    date_part('month', CURRENT_DATE) as this_month,
    date_part('year', CURRENT_DATE) as this_year
    FROM entries WHERE id=($1) AND user_id=($2)`;
    const v = [id, req.userData.id];
    const selectQuery = {
      text: q,
      values: v,
    };
    this._client.query(selectQuery)
      .then((result) => {
        if (result.rowCount > 0) {
          // alow edit for entries only on the same day it was created
          if (result.rows[0].created_day === result.rows[0].this_day
            && result.rows[0].created_month === result.rows[0].this_month
            && result.rows[0].created_year === result.rows[0].this_year) {
            const action = `UPDATE entries SET title=($1), content=($2), updated_at=($3)
              WHERE id=($4) AND user_id=($5) RETURNING *`;
            const values = [body.title, body.content, 'NOW()', id, req.userData.id];
            const updateQuery = {
              text: action,
              values,
            };
            this._client.query(updateQuery)
              .then((output) => {
                res.status(200)
                  .json({
                    status: 'success',
                    data: output.rows[0],
                  });
              })
              .catch((err) => {
                next(err);
              });
          } else {
            res.status(400)
              .json({
                status: 'error',
                message: 'Sorry, an entry can only be updated the same day it was created',
              });
          }
        } else {
          const error = new Error("Entry doesn't exist");
          error.status = 404;
          next(error);
        }
      })
      .catch((e) => {
        next(e);
      });
  }


  delete(req, res, next) {
    const { id } = req.params;
    this._client.query('DELETE FROM entries WHERE id=($1) AND user_id=($2)', [id, req.userData.id])
      .then((result) => {
        if (result.rowCount > 0) {
          res.status(204);
        } else {
          const error = new Error("Entry doesn't exist");
          error.status = 404;
          next(error);
        }
      })
      .catch((e) => {
        next(e);
      });
  }
}

module.exports = EntryController;
