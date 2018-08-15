/* global baseUrl, checkCookie, getOptions, validateProfileField */
const errorBoxElement = document.getElementsByClassName('error-box')[0];
const notificationErrorBox = document.getElementsByClassName('error-box')[1];
const profileSettingsBox = document.getElementById('settings-box');
const fullNameHeading = document.getElementById('fullname-heading');
const fullnameField = document.getElementById('full-name');
const emailField = document.getElementById('email');
const favoriteQuoteHeading = document.getElementById('fav-quote');
const favQuoteTextField = document.getElementById('fav-quote-text');
const entriesCountField = document.getElementsByClassName('entries-count')[0];
const editProfileButton = document.getElementById('edit-profile-btn');
const editReminderButton = document.getElementById('edit-rem-btn');
const reminderOption = document.getElementById('reminder-option');

let errorMsgCode;

const displayProfile = () => {
  const userDetails = JSON.parse(localStorage.getItem('user'));
  const {
    fullname, email, favQuote, entryCount,
  } = userDetails;
  document.title = `${fullname} | MyDiary`;
  fullNameHeading.innerText = fullname;
  fullnameField.value = fullname;
  emailField.value = email;
  favQuoteTextField.value = favQuote || '';
  const favoriteQuote = favQuote || 'A wise man once said, put your favorite quote here';
  favoriteQuoteHeading.innerHTML = `<i class="fa fa-quote-left"></i>${favoriteQuote}<i class="fa fa-quote-right"></i>`;
  entriesCountField.firstElementChild.innerHTML = entryCount || '?';
};

const updateProfile = (event) => {
  event.preventDefault();
  const url = `${baseUrl}/users/update`;
  const userFullName = fullnameField.value;
  const userEmail = emailField.value;
  const userFavQuote = favQuoteTextField.value;
  const validationMsg = validateProfileField(userFullName, userEmail, userFavQuote);

  if (validationMsg.email.length !== 0
    || validationMsg.fullName.length !== 0
    || validationMsg.favQuote.length !== 0) {
    // take first error message of each field
    let errorMsgs = (validationMsg.email[0]) ? `<li>${(validationMsg.email[0])}</li>` : '';
    errorMsgs += (validationMsg.fullName[0]) ? `<li>${(validationMsg.fullName[0])}</li>` : '';
    errorMsgs += (validationMsg.favQuote[0]) ? `<li>${(validationMsg.favQuote[0])}</li>` : '';
    errorMsgCode = `<ul id="error-msg">${errorMsgs}</ul>`;
    errorBoxElement.innerHTML = errorMsgCode;
    return;
  }
  const editProfileData = {
    fullname: userFullName,
    email: userEmail,
    fav_quote: userFavQuote,
  };

  const options = getOptions('PUT', editProfileData);

  fetch(url, options)
    .then(res => res.json())
    .then((result) => {
      const {
        status, message, errors, data,
      } = result;
      let errorMsgs = '';
      if (status === 'success') {
        const userData = {
          fullname: data.fullname,
          email: data.email,
          favQuote: data.fav_quote,
          entryCount: data.entryCount || null,
        };
        localStorage.setItem('user', JSON.stringify(userData));

        window.location = `${window.location.protocol}//${window.location.host}/client/profile.html`;
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
    .catch((err) => {
      const message = `<li>${err}</li>`;
      errorMsgCode = `<ul id="error-msg">${message}</ul>`;
      errorBoxElement.innerHTML = errorMsgCode;
    });
};

const updateNotification = (event) => {
  event.preventDefault();
  const url = `${baseUrl}/user/notification`;
  const option = reminderOption.value;
  if (option === '') {
    return;
  }

  const payload = {
    status: option,
  };
  const requestOptions = getOptions('PUT', payload);
  fetch(url, requestOptions)
    .then(res => res.json())
    .then(({
      status, message, errors, data,
    }) => {
      let errorMsgs = '';
      if (status === 'success') {
        const info = `<li>Succesfully turned ${data.notification} notification</li>`;
        errorMsgCode = `<ul id="error-msg">${info}</ul>`;
        notificationErrorBox.innerHTML = errorMsgCode;
      } else if (status === 'error') {
        if (errors) {
          errors.forEach((error) => {
            errorMsgs += `<li>${error}</li>`;
          });
          errorMsgCode = `<ul id="error-msg">${errorMsgs}</ul>`;
        } else {
          errorMsgs += `<li>${message}</li>`;
          errorMsgCode = `<ul id="error-msg">${errorMsgs}</ul>`;
        }
        notificationErrorBox.innerHTML = errorMsgCode;
      }
    })
    .catch((err) => {
      const message = `<li>${err}</li>`;
      errorMsgCode = `<ul id="error-msg">${message}</ul>`;
      notificationErrorBox.innerHTML = errorMsgCode;
    });
};

window.onload = () => {
  if (profileSettingsBox !== null) {
    if (checkCookie('token') === false) {
      const msg = 'You are not authorized to perform this action, login to continue';
      window.location = `${window.location.protocol}//${window.location.host}/client/error.html?msg=${msg}`;
    }
    editProfileButton.addEventListener('click', updateProfile);
    editReminderButton.addEventListener('click', updateNotification);
    displayProfile();
  }
};
