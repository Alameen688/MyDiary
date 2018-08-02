/* eslint-disable  no-useless-escape */
/* eslint-disable no-unused-vars */
const validateLogin = (email, password) => {
  /* REG EXP from https://www.w3resource.com/javascript/form/email-validation.php */
  const emailRegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
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
  const emailRegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
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
    message.title.push('Title field cannot be empty');
  }

  if (content === '') {
    message.content.push('Content field cannot be empty');
  }
  return message;
};
