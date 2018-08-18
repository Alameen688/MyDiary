/* global baseUrl, checkCookie, setCookie, validateLogin,
 validateSignUp, startLoadingBtn, endLoadingBtn */
const errorBoxElement = document.getElementById('error-box');
const fullnameField = document.getElementById('fullname');
const emailField = document.getElementById('email');
const passwordField = document.getElementById('password');
const confirmPasswordField = document.getElementById('confirm-password');
const submitLogin = document.getElementById('submit-login');
const submitSignUp = document.getElementById('submit-signup');

let errorMsgCode;

const login = (event) => {
  event.preventDefault();
  const returnText = submitLogin.value;
  const loadingText = 'Verifying';
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

  startLoadingBtn(submitLogin, loadingText);
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
    .then(({
      status, message, errors, data,
    }) => {
      endLoadingBtn(submitLogin, returnText);
      let errorMsgs = '';
      if (status === 'success') {
        setCookie('token', data.token, 2);
        const userData = {
          fullname: data.fullname,
          email: data.email,
        };
        localStorage.setItem('user', JSON.stringify(userData));

        window.location = `${window.location.protocol}//${window.location.host}/client/list-entry.html`;
      } else if (status === 'error') {
        if (errors) {
          errors.forEach((error) => {
            errorMsgs += `<li>${error}</li>`;
          });
          errorMsgCode = `<ul id="error-msg">${errorMsgs}</ul>`;
        } else if (message) {
          errorMsgs += `<li>${message}</li>`;
          errorMsgCode = `<ul id="error-msg">${errorMsgs}</ul>`;
        }
        errorBoxElement.innerHTML = errorMsgCode;
      }
    })
    .catch(() => {
      endLoadingBtn(submitLogin, returnText);
      const message = 'Oops unable to connect to the server.';
      errorMsgCode = `<ul id="error-msg"><li>${message}</li></ul>`;
      errorBoxElement.innerHTML = errorMsgCode;
    });
};
const signup = (event) => {
  event.preventDefault();
  const returnText = submitSignUp.value;
  const loadingText = 'Please wait..';
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

  startLoadingBtn(submitSignUp, loadingText);

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
    .then(({ status, message, errors }) => {
      endLoadingBtn(submitSignUp, returnText);
      let errorMsgs = '';
      if (status === 'success') {
        window.location = `${window.location.protocol}//${window.location.host}/client/login.html`;
      } else if (status === 'error') {
        if (errors) {
          errors.forEach((error) => {
            errorMsgs += `<li>${error}</li>`;
          });
          errorMsgCode = `<ul id="error-msg">${errorMsgs}</ul>`;
        } else if (message) {
          errorMsgs += `<li>${message}</li>`;
          errorMsgCode = `<ul id="error-msg">${errorMsgs}</ul>`;
        }
        errorBoxElement.innerHTML = errorMsgCode;
      }
    })
    .catch(() => {
      endLoadingBtn(submitSignUp, returnText);
      const message = 'Oops unable to connect to the server.';
      errorMsgCode = `<ul id="error-msg"><li>${message}</li></ul>`;
      errorBoxElement.innerHTML = errorMsgCode;
    });
};
window.onload = () => {
  if (checkCookie('token') === true) {
    window.location = `${window.location.protocol}//${window.location.host}/client/list-entry.html`;
  }
  if (submitLogin !== null) {
    submitLogin.addEventListener('click', login);
  }
  if (submitSignUp !== null) {
    submitSignUp.addEventListener('click', signup);
  }
};
