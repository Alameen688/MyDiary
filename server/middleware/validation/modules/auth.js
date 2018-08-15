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

module.exports = Auth;
