/* eslint no-underscore-dangle: 0 */
class Entry {
  constructor(id, title, content, createdAt, updatedAt) {
    this._id = id;
    this._title = title;
    this._content = content;
    this._created_at = createdAt;
    this._updated_at = updatedAt;
  }

  get id() {
    return this._id;
  }

  get title() {
    return this._title;
  }

  get content() {
    return this._content;
  }

  get createdAt() {
    return this._created_at;
  }

  get updatedAt() {
    return this._updated_at;
  }

  getEntry() {
    return {
      id: this._id,
      title: this._title,
      content: this._content,
      created_at: this._created_at,
      updated_at: this._updated_at,
    };
  }
}
module.exports = Entry;
