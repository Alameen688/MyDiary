/* eslint no-underscore-dangle: 0 */
import Store from '../memory/store';
import Schema from '../model/index';
import util from '../helpers/utils';

class EntryHandler {
  constructor() {
    this._entryStore = new Store.Entry();
    this.entries = [];
    this._entry = {};
  }

  addEntry(title, content) {
    const id = util.generateId();
    const newEntry = new Schema.Entry(id, title, content, Date.now(), Date.now());
    this._entry = this._entryStore.insert(newEntry.getEntry());
    return this._entry;
  }

  getAllEntry() {
    this._entries = this._entryStore.findAll();
    return this._entries;
  }

  findEntry(id) {
    this._entry = this._entryStore.findOne(id);
    return this._entry;
  }

  updateEntry(id, body) {
    const entry = this._entryStore.findOne(id);
    if (entry !== null) {
      const keys = Object.keys(entry);
      const entryUpdate = {};
      keys.forEach((key) => {
        entryUpdate[key] = (body[key] !== undefined) ? body[key] : entry[key];
      });
      // update date
      entryUpdate.updated_at = Date.now();
      this._entry = this._entryStore.update(id, entryUpdate);

      return this._entry;
    }
    return null;
  }

  deleteEntry(id) {
    const entry = this._entryStore.findOne(id);
    if (entry !== null) {
      this._entry = this._entryStore.delete(id);

      return this._entry;
    }
    return null;
  }
}

module.exports = EntryHandler;
