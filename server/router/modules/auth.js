import express from 'express';
import validate from 'express-validation';
import AuthController from '../../controller/authController';
import Validation from '../../middleware/validation';
import authorization from '../../middleware/authorization/auth';

const router = express.Router();
const auth = new AuthController();


// add a new user
router.post('/signup', validate(Validation.Auth.signup), (req, res, next) => {
  auth.create(req, res, next);
});

// login user
router.post('/login', validate(Validation.Auth.login), (req, res, next) => {
  auth.login(req, res, next);
});

router.put('/updateuser', [authorization.isValid, validate(Validation.Auth.update)], (req, res, next) => {
  auth.update(req, res, next);
});

router.put('/notification', [authorization.isValid], validate(Validation.Auth.notification), (req, res, next) => {
  auth.notificationSettings(req, res, next);
});

module.exports = router;
