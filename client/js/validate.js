/* eslint-disable  no-useless-escape */
/* eslint-disable no-unused-vars */

/* REG EXP from https://www.w3resource.com/javascript/form/email-validation.php */
const emailRegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const validateLogin = (email, password) => {
  const message = {};
  message.email = [];
  message.password = [];
  if (email === '') {
    message.email.push('Email cannot be empty');
  } else if (!email.match(emailRegExp)) {
    message.email.push('Email is not a valid');
  }

  if (password === '') {
    message.password.push('Password cannot be empty');
  } else if (password.length < 6) {
    message.password.push('Password cannot be less than 6 characters');
  }
  return message;
};
const validateSignUp = (fullname, email, password, confirmPassword) => {
  const message = {};
  message.fullname = [];
  message.email = [];
  message.password = [];
  message.confirmPassword = [];

  if (fullname === '') {
    message.fullname.push('Full Name cannot be empty');
  } else if (fullname.length < 6) {
    message.fullname.push('Full Name cannot be less than 6 characters');
  }

  if (email === '') {
    message.email.push('Email cannot be empty');
  } else if (!email.match(emailRegExp)) {
    message.email.push('Email is not a valid');
  }

  if (password === '') {
    message.password.push('Password cannot be empty');
  } else if (password.length < 6) {
    message.password.push('Password cannot be less than 6 characters');
  }

  if (confirmPassword === '') {
    message.confirmPassword.push('Confirm Password cannot be empty');
  } else if (confirmPassword.length < 6) {
    message.confirmPassword.push('Confirm Password cannot be less than 6 characters');
  } else if (confirmPassword !== password) {
    message.confirmPassword.push('Password and Confirm Password do not match');
  }

  return message;
};

const validateEntryField = (title, content) => {
  const message = {};
  message.title = [];
  message.content = [];
  if (title === '') {
    message.title.push('Subject field cannot be empty');
  } else if (title.length < 6) {
    message.title.push('Subject cannot be less than 6 characters');
  }

  if (content === '') {
    message.content.push('Content field cannot be empty');
  } else if (content.length < 20) {
    message.content.push('Content cannot be less than 20 characters');
  }
  return message;
};

const validateProfileField = (fullName, email, favQuote) => {
  const message = {};
  message.email = [];
  message.fullName = [];
  message.favQuote = [];
  if (fullName === '') {
    message.fullName.push('Full Name cannot be empty');
  } else if (fullName.length < 6) {
    message.fullName.push('Full Name cannot be less than 6 characters');
  }

  if (favQuote === '') {
    message.favQuote.push('Favorite quote cannot be empty');
  } else if (favQuote.length < 6) {
    message.favQuote.push('Favorite quote cannot be less than 6 characters');
  }

  if (email === '') {
    message.email.push('Email cannot be empty');
  } else if (!email.match(emailRegExp)) {
    message.email.push('Email is not a valid');
  }
  return message;
};
