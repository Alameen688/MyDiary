import Joi from 'joi';

class User {

}
// static class property of User validation class

User.signup = {
  body: {
    fullname: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{3,100}$/).required(),
  },
};

User.login = {
  body: {
    email: Joi.string().email().required(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{3,100}$/).required(),
  },
};

User.update = {
  body: {
    fullname: Joi.string().required(),
    email: Joi.string().email().required(),
    fav_quote: Joi.string(),
  },
};

User.notification = {
  body: {
    status: Joi.any().valid(['on', 'off']).required(),
  },
};

module.exports = User;
