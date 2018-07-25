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

module.exports = User;
