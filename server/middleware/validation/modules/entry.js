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
    id: Joi.number().required(),
  },
};

Entry.update = {
  params: {
    id: Joi.number().required(),
  },
  body: {
    title: Joi.string().required(),
    content: Joi.string().required(),
  },
};

Entry.delete = {
  params: {
    id: Joi.number().required(),
  },
};

module.exports = Entry;
