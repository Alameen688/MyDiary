/* eslint no-underscore-dangle: 0 */
import EntryHandler from '../handler/entryHandler';

class EntryController {
  constructor() {
    this._entry = new EntryHandler();
  }

  create(req, res) {
    const result = this._entry.addEntry(req.body.title, req.body.content);
    res.status(200)
      .json({
        status: 'success',
        data: result,
      });
  }

  getAll(req, res) {
    const result = this._entry.getAllEntry();
    res.status(200)
      .json({
        status: 'success',
        data: result,
      });
  }

  getById(req, res) {
    // using obj destructring
    const { id } = req.params;
    const result = this._entry.findEntry(id);
    res.status(200)
      .json({
        status: 'success',
        data: result,
      });
  }

  update(req, res) {
    const { id } = req.params;
    const { body } = req;
    const result = this._entry.updateEntry(id, body);
    if (result !== null) {
      res.status(200)
        .json({
          status: 'success',
          data: result,
        });
    } else {
      // has error property to match the pattern of validation error response
      res.status(404)
        .json({
          status: 'error',
          message: 'Oops entry not found',
          errors: [
            "entry with id doesn't exist",
          ],
        });
    }
  }

  delete(req, res) {
    const { id } = req.params;
    const result = this._entry.deleteEntry(id);
    // if item was deleted successully, it will return undefined
    if (result !== null && result === undefined) {
      res.status(200)
        .json({
          status: 'success',
          data: {},
        });
    } else {
      // has error property to match the pattern of validation error response
      res.status(404)
        .json({
          status: 'error',
          message: 'Unable to delete entry',
          errors: [
            "entry with id doesn't exist",
          ],
        });
    }
  }
}

module.exports = EntryController;
