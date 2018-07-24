"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* eslint no-underscore-dangle: 0 */
var Entry = function () {
  function Entry(id, title, content, createdAt, updatedAt) {
    _classCallCheck(this, Entry);

    this._id = id;
    this._title = title;
    this._content = content;
    this._created_at = createdAt;
    this._updated_at = updatedAt;
  }

  _createClass(Entry, [{
    key: "getEntry",
    value: function getEntry() {
      return {
        id: this._id,
        title: this._title,
        content: this._content,
        created_at: this._created_at,
        updated_at: this._updated_at
      };
    }
  }, {
    key: "id",
    get: function get() {
      return this._id;
    }
  }, {
    key: "title",
    get: function get() {
      return this._title;
    }
  }, {
    key: "content",
    get: function get() {
      return this._content;
    }
  }, {
    key: "createdAt",
    get: function get() {
      return this._created_at;
    }
  }, {
    key: "updatedAt",
    get: function get() {
      return this._updated_at;
    }
  }]);

  return Entry;
}();

module.exports = Entry;