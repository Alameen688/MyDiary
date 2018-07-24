import Joi from 'joi';

class Entry {

}
// static class property of Entry validation class

Entry.create = {
  body: {
    title: Joi.string().required(),
    content: Joi.string().required(),
  },
};

Entry.getById = {
  params: {
    id: Joi.string().max(16).required(),
  },
};

Entry.update = {
  params: {
    id: Joi.string().max(16).required(),
  },
  body: {
    title: Joi.string().required(),
    content: Joi.string().required(),
  },
};

Entry.delete = {
  params: {
    id: Joi.string().max(16).required(),
  },
};

module.exports = Entry;
