import jwt from 'jsonwebtoken';

class Auth {

}

Auth.isValid = (req, res, next) => {
  try {
    // Removes Bearer keyword and takes the token after the space
    const token = req.headers.authorization.split(' ')[1];
    req.userData = jwt.verify(token, process.env.JWT_KEY);
    next();
  } catch (error) {
    res.status(401)
      .json({
        status: 'error',
        message: 'You are not authorized to perform this action',
      });
  }
};

module.exports = Auth;
