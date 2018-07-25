import express from 'express';
import validate from 'express-validation';
import UserController from '../../controller/userController';
import Validation from '../../middleware/validation/index';

const router = express.Router();
const user = new UserController();


// add a new user
router.post('/signup', validate(Validation.User.signup), (req, res, next) => {
  user.create(req, res, next);
});


module.exports = router;
