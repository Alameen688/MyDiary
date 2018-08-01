/* global baseUrl, setCookie, validateLogin, validateSignUp */
const errorBoxElement = document.getElementById('error-box');
const fullnameField = document.getElementById('fullname');
const emailField = document.getElementById('email');
const passwordField = document.getElementById('password');
const confirmPasswordField = document.getElementById('confirm-password');
const submitLogin = document.getElementById('submit-login');
const submitSignUp = document.getElementById('submit-signup');

let errorMsgCode;

const login = (e) => {
  e.preventDefault();
  const errorMsgElement = document.getElementById('error-msg');
  if (errorMsgElement !== null) {
    errorMsgElement.parentNode.removeChild(errorMsgElement);
  }
  const url = `${baseUrl}/auth/login`;
  const email = emailField.value.trim();
  const password = passwordField.value.trim();
  const validationMsg = validateLogin(email, password);

  if (validationMsg.email.length !== 0 || validationMsg.password.length !== 0) {
    // take first error message of each field
    let errorMsgs = (validationMsg.email[0]) ? `<li>${(validationMsg.email[0])}</li>` : '';
    errorMsgs += (validationMsg.password[0]) ? `<li>${(validationMsg.password[0])}</li>` : '';
    errorMsgCode = `<ul id="error-msg">${errorMsgs}</ul>`;
    errorBoxElement.innerHTML = errorMsgCode;
    return;
  }

  const loginData = {
    email,
    password,
  };
  const options = {
    method: 'POST',
    headers: {
      Accept: 'application/json, text/plain,  */*',
      'Content-type': 'application/json',
    },
    body: JSON.stringify(loginData),
  };
  fetch(url, options)
    .then(res => res.json())
    .then((result) => {
      const { status, message, errors } = result;
      let errorMsgs = '';
      if (status === 'success') {
        setCookie('token', result.data.token, 2);
        window.location = `${window.location.protocol}//${window.location.host}/client/list-entry.html`;
      } else if (status === 'error') {
        if (Object.prototype.hasOwnProperty.call(result, 'errors')) {
          errors.forEach((error) => {
            errorMsgs += `<li>${error}</li>`;
          });
          errorMsgCode = `<ul id="error-msg">${errorMsgs}</ul>`;
        } else if (Object.prototype.hasOwnProperty.call(result, 'message')) {
          errorMsgs += `<li>${message}</li>`;
          errorMsgCode = `<ul id="error-msg">${errorMsgs}</ul>`;
        }
        errorBoxElement.innerHTML = errorMsgCode;
      }
    })
    .catch(() => {

    });
};
const signup = (e) => {
  e.preventDefault();
  const errorMsgElement = document.getElementById('error-msg');
  if (errorMsgElement !== null) {
    errorMsgElement.parentNode.removeChild(errorMsgElement);
  }
  const url = `${baseUrl}/auth/signup`;
  const fullname = fullnameField.value.trim();
  const email = emailField.value.trim();
  const password = passwordField.value.trim();
  const confirmPassword = confirmPasswordField.value.trim();
  const validationMsg = validateSignUp(fullname, email, password, confirmPassword);

  if (validationMsg.fullname.length !== 0 || validationMsg.email.length !== 0
    || validationMsg.password.length !== 0 || validationMsg.confirmPassword.length !== 0) {
    // take first error message of each field
    let errorMsgs = (validationMsg.fullname[0]) ? `<li>${(validationMsg.fullname[0])}</li>` : '';
    errorMsgs += (validationMsg.email[0]) ? `<li>${(validationMsg.email[0])}</li>` : '';
    errorMsgs += (validationMsg.password[0]) ? `<li>${(validationMsg.password[0])}</li>` : '';
    errorMsgs += (validationMsg.confirmPassword[0]) ? `<li>${(validationMsg.confirmPassword[0])}</li>` : '';
    errorMsgCode = `<ul id="error-msg">${errorMsgs}</ul>`;
    errorBoxElement.innerHTML = errorMsgCode;
    return;
  }

  const signUpData = {
    fullname,
    email,
    password,
  };
  const options = {
    method: 'POST',
    headers: {
      Accept: 'application/json, text/plain,  */*',
      'Content-type': 'application/json',
    },
    body: JSON.stringify(signUpData),
  };
  fetch(url, options)
    .then(res => res.json())
    .then((result) => {
      const { status, message, errors } = result;
      let errorMsgs = '';
      if (result.status === 'success') {
        window.location = `${window.location.protocol}//${window.location.host}/client/login.html`;
      } else if (status === 'error') {
        if (Object.prototype.hasOwnProperty.call(result, 'errors')) {
          errors.forEach((error) => {
            errorMsgs += `<li>${error}</li>`;
          });
          errorMsgCode = `<ul id="error-msg">${errorMsgs}</ul>`;
        } else if (Object.prototype.hasOwnProperty.call(result, 'message')) {
          errorMsgs += `<li>${message}</li>`;
          errorMsgCode = `<ul id="error-msg">${errorMsgs}</ul>`;
        }
        errorBoxElement.innerHTML = errorMsgCode;
      }
    })
    .catch(() => {

    });
};
window.onload = () => {
  if (submitLogin !== null) {
    submitLogin.addEventListener('click', login);
  }
  if (submitSignUp !== null) {
    submitSignUp.addEventListener('click', signup);
  }
};
