"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Entry = function () {
  function Entry(title, content, createdAt, updatedAt) {
    _classCallCheck(this, Entry);

    this._title = title;
    this._content = content;
    this._createdAt = createdAt;
    this._updatedAt = updatedAt;
  }

  _createClass(Entry, [{
    key: "getEntry",
    value: function getEntry() {
      return {
        title: this._title,
        content: this._content,
        createdAt: this._createdAt,
        updatedAt: this._updatedAt
      };
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
      return this._createdAt;
    }
  }, {
    key: "updatedAt",
    get: function get() {
      return this._updatedAt;
    }
  }]);

  return Entry;
}();

module.exports = Entry;