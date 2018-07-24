/* eslint-env mocha */
/* eslint no-unused-vars: 0 */
import chai from 'chai';
import EntryValidation from '../dist/middleware/validation/modules/entry';
import EntryController from '../dist/controller/entryController';
import EntryHandler from '../dist/handler/entryHandler';
import Util from '../dist/helpers/utils';
import Schema from '../dist/model/index';
import Storage from '../dist/memory/store';


/** disabled no-unused-vars for this file
 *  to prevent 'should' from throwing error
 * on this line based on airbnb style guide
 * */
const should = chai.should();
const assert = chai.assert;



describe('EntryValidation class', () => {
  describe('#constructor()', () => {
    it('should create an object', () => {
      const entry =  new EntryValidation();
      entry.should.be.an.instanceOf(Object);
    });

    it('should throw type error if called like a function', () => {
      assert.throws(EntryValidation, TypeError);
    });
  })
});

describe('EntryController class', () => {
  describe('#constructor()', () => {
    it('should create an object', () => {
      const entry =  new EntryController();
      entry.should.be.an.instanceOf(Object);
    });

    it('should throw type error if called like a function', () => {
      assert.throws(EntryController, TypeError);
    });
  })
});

describe('EntryHandler class', () => {
  describe('#constructor()', () => {
    it('should create an object', () => {
      const entry =  new EntryHandler();
      entry.should.be.an.instanceOf(Object);
    });

    it('should throw type error if called like a function', () => {
      assert.throws(EntryHandler, TypeError);
    });
  })
});

describe('Util class', () => {
  describe('#constructor()', () => {
    it('should create an object', () => {
      const util =  new Util();
      util.should.be.an.instanceOf(Object);
    });

    it('should throw type error if called like a function', () => {
      assert.throws(Util, TypeError);
    });
  })
});

describe('Entry Storage class', () => {
  describe('#constructor()', () => {
    it('should create an object', () => {
      const entryStorage =  new Storage.Entry();
      entryStorage.should.be.an.instanceOf(Object);
    });

    it('should throw type error if called like a function', () => {
      assert.throws(Storage.Entry, TypeError);
    });
  })
});

describe('Entry Schema class', () => {
  describe('#constructor()', () => {
    const entry = {
      id: "7375105d2457eb0a",
      title: "A day to always",
      content: "In times like this we must always remember that there will always be times like this",
      created_at: 1532037377895,
      updated_at: 1532037377895
    };

    let EntrySchema;

    before(() => {
      EntrySchema =  new Schema.Entry(entry.id, entry.title, entry.content, entry.created_at, entry.updated_at);
      
    });

    it('should create an object', () => {
      const insertedEntry = EntrySchema.getEntry();
      EntrySchema.should.be.an.instanceOf(Object);
      insertedEntry.should.be.ok;
    });

    it('returns the id', () => {
      EntrySchema.id.should.equal(entry.id);
    });

    it('returns the title', () => {
      EntrySchema.title.should.equal(entry.title);
    });

    it('returns the content', () => {
      EntrySchema.content.should.equal(entry.content);
    });

    it('returns the created_at', () => {
      EntrySchema.createdAt.should.equal(entry.created_at);
    });

    it('returns the updated_at', () => {
      EntrySchema.updatedAt.should.equal(entry.updated_at);
    });

    it('should throw type error if called like a function', () => {
      assert.throws(Schema.Entry, TypeError);
    });
  })
});