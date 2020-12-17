import Joi from 'joi';

class User {

}
// static class property of User validation class

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
