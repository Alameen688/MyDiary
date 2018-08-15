import express from 'express';
import validate from 'express-validation';
import UserController from '../../controller/userController';
import Validation from '../../middleware/validation/index';
import auth from '../../middleware/authorization/auth';

const router = express.Router();
const user = new UserController();


// add a new user
router.post('/signup', validate(Validation.User.signup), (req, res, next) => {
  user.create(req, res, next);
});

// login user
router.post('/login', validate(Validation.User.login), (req, res, next) => {
  user.login(req, res, next);
});

router.put('/updateuser', [auth.isValid, validate(Validation.User.update)], (req, res, next) => {
  user.update(req, res, next);
});

router.put('/notification', [auth.isValid], validate(Validation.User.notification), (req, res, next) => {
  user.notificationSettings(req, res, next);
});

module.exports = router;
