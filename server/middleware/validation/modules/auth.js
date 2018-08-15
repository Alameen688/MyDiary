import Joi from 'joi';

class Auth {

}
// static class property of Auth validation class

Auth.signup = {
  body: {
    fullname: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{3,100}$/).required(),
  },
};

Auth.login = {
  body: {
    email: Joi.string().email().required(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{3,100}$/).required(),
  },
};

Auth.update = {
  body: {
    fullname: Joi.string().required(),
    email: Joi.string().email().required(),
    fav_quote: Joi.string(),
  },
};

Auth.notification = {
  body: {
    status: Joi.any().valid(['on', 'off']).required(),
  },
};

module.exports = Auth;
