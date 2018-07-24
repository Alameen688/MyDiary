"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Entry = function () {
  function Entry() {
    _classCallCheck(this, Entry);

    this.entries = {};
  }

  _createClass(Entry, [{
    key: "insert",
    value: function insert(entry) {
      this.entries[entry.id] = entry;
      return this.entries[entry.id];
    }
  }, {
    key: "findAll",
    value: function findAll() {
      return Object.values(this.entries);
    }
  }, {
    key: "findOne",
    value: function findOne(id) {
      if (Object.prototype.hasOwnProperty.call(this.entries, id)) {
        return this.entries[id];
      }
      return null;
    }
  }, {
    key: "update",
    value: function update(id, entry) {
      this.entries[id] = entry;
      return this.entries[id];
    }
  }, {
    key: "delete",
    value: function _delete(id) {
      delete this.entries[id];
      return this.entries[id];
    }
  }]);

  return Entry;
}();

module.exports = Entry;