import express from 'express';
import expressValidation from 'express-validation';
import swaggerUi from 'swagger-ui-express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import swaggerDoc from '../swagger.json';
import router from './router/index';

const app = express();
const port = process.env.PORT || 3000;
app.use(morgan('dev'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.all('/*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept, X-Requested-With, X-Access-Token, X-Key, Authorization');
  if (req.method === 'OPTIONS') {
    res.status(200).end();
  } else {
    next();
  }
});

app.use('/api/v1/entries', router.entries);
app.use('/api/v1/auth', router.users);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

// when there is no fitting route set error and run the next func
app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

// this func then returns the json error message
app.use((error, req, res, next) => {
  if (error instanceof expressValidation.ValidationError) {
    // extract error messages from validation error
    const messages = error.errors.reduce((msg, obj) => {
      // take the first error message of the property only
      msg.push(obj.messages[0]);
      return msg;
    }, []);

    res.status(error.status)
      .json({
        status: 'error',
        message: error.statusText,
        errors: messages,
      });
  } else {
    res.status(error.status || 500);
    res.json({
      status: 'error',
      message: error.message || 'An error occured',
    });
  }
  next();
});


// listen only when not testing
// this is to avoid Uncaught Error: listen EADDRINUSE :::3000
if (!module.parent) {
  app.listen(port, () => {
    // console.log(`Listening on port ${port}`);
  });
}

// export app for testing
module.exports = app;
