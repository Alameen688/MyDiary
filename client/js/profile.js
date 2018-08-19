/* global baseUrl, checkCookie, getOptions, validateProfileField, logout */
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
const logoutBtn = document.getElementById('btn-logout');


let errorMsgCode;

const disableInput = () => {
  fullnameField.disabled = true;
  emailField.disabled = true;
  favQuoteTextField.disabled = true;
  editReminderButton.disabled = true;
};

const activateReminderAction = () => {
  editReminderButton.disabled = false;
  editReminderButton.classList.add('reminder-btn-active');
};

const displayProfile = () => {
  const url = `${baseUrl}/users/profile`;
  const options = getOptions('GET');

  fetch(url, options)
    .then(res => res.json())
    .then(({
      status, data, message, errors,
    }) => {
      if (status === 'success') {
        const userDetails = {
          fullname: data.fullname,
          email: data.email,
          favQuote: data.fav_quote,
          entryCount: data.entry_count,
          notificationStatus: data.notification,
        };
        const {
          fullname, email, favQuote, entryCount, notificationStatus,
        } = userDetails;
        document.title = `${fullname} | MyDiary`;
        fullNameHeading.innerText = fullname;
        fullnameField.value = fullname;
        emailField.value = email;
        favQuoteTextField.value = favQuote || '';
        const favoriteQuote = favQuote || 'A wise man once said, put your favorite quote here';
        favoriteQuoteHeading.innerHTML = `<i class="fa fa-quote-left"></i>${favoriteQuote}<i class="fa fa-quote-right"></i>`;
        entriesCountField.firstElementChild.innerHTML = entryCount || '?';
        reminderOption.value = notificationStatus;
      } else if (status === 'error') {
        let msg = '';
        if (errors !== undefined) {
          const { firstMessage } = errors[0];
          msg = firstMessage;
        } else if (message !== undefined) {
          msg = message;
        }
        msg = encodeURIComponent(msg);
        window.location = `${window.location.protocol}//${window.location.host}/MyDiary/client/error.html?msg=${msg}`;
      }
    })
    .catch((err) => {
      window.location = `${window.location.protocol}//${window.location.host}/MyDiary/client/error.html?msg=${err}`;
    });
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
    .then(({ status, message, errors }) => {
      let errorMsgs = '';
      if (status === 'success') {
        window.location = `${window.location.protocol}//${window.location.host}/MyDiary/client/profile.html`;
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
    .catch((err) => {
      const message = `<li>${err}</li>`;
      errorMsgCode = `<ul id="error-msg">${message}</ul>`;
      errorBoxElement.innerHTML = errorMsgCode;
    });
};

const enableInput = () => {
  fullnameField.disabled = false;
  emailField.disabled = false;
  favQuoteTextField.disabled = false;
  editProfileButton.value = 'Save';
  editProfileButton.id = 'save-profile-btn';
  favQuoteTextField.focus();
  const saveProfileButton = document.getElementById('save-profile-btn');
  saveProfileButton.addEventListener('click', updateProfile);
};

const updateNotification = (event) => {
  event.preventDefault();
  const url = `${baseUrl}/users/notification`;
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
      window.location = `${window.location.protocol}//${window.location.host}/MyDiary/client/login.html`;
    } else {
      disableInput();
      displayProfile();
      editProfileButton.addEventListener('click', enableInput);
      editReminderButton.addEventListener('click', updateNotification);
      reminderOption.addEventListener('change', activateReminderAction);
      logoutBtn.addEventListener('click', logout);
    }
  }
};
