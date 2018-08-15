import express from 'express';
import validate from 'express-validation';
import UserController from '../../controller/userController';
import Validation from '../../middleware/validation';
import authorization from '../../middleware/authorization/auth';

const router = express.Router();
const user = new UserController();


router.put('/update', [authorization.isValid, validate(Validation.User.update)], (req, res, next) => {
  user.update(req, res, next);
});

router.put('/notification', [authorization.isValid], validate(Validation.User.notification), (req, res, next) => {
  user.notificationSettings(req, res, next);
});

module.exports = router;
