/* eslint-disable no-unused-vars, no-plusplus */
const baseUrl = 'https://mydiaryoxygen.herokuapp.com/api/v1';
/** WORKING WITH COOKIES REFERENCE https://www.w3schools.com/js/js_cookies.asp * */
const getCookie = (cname) => {
  const name = `${cname}=`;
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookieArray = decodedCookie.split(';');
  for (let index = 0; index < cookieArray.length; index++) {
    let cookieString = cookieArray[index];
    while (cookieString.charAt(0) === ' ') {
      cookieString = cookieString.substring(1);
    }
    if (cookieString.indexOf(name) === 0) {
      return cookieString.substring(name.length, cookieString.length);
    }
  }
  return '';
};
const setCookie = (cname, cvalue, exdays) => {
  const date = new Date();
  date.setTime(date.getTime() + (exdays * 24 * 60 * 60 * 1000));
  const expires = `expires=${date.toUTCString()}`;
  document.cookie = `${cname}=${cvalue};${expires};path=/`;
};
const checkCookie = (cname) => {
  const cookieName = getCookie(cname);
  if (cookieName !== '') {
    return true;
  }
  return false;
};

let token;
if (checkCookie('token')) {
  token = getCookie('token');
}

const getOptions = (method, payload) => {
  const options = {
    method,
    headers: {
      Accept: 'application/json, text/plain,  */*',
      'Content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  };
  return options;
};

const startLoadingBtn = (element, loadingText) => {
  const elementToDisable = element;
  elementToDisable.disabled = true;
  elementToDisable.value = loadingText;
};

const endLoadingBtn = (element, returnText) => {
  const elementToEnable = element;
  elementToEnable.disabled = false;
  elementToEnable.value = returnText;
};

const logout = (event) => {
  event.preventDefault();
  setCookie('token', '', -2);
  window.location = `${window.location.protocol}//${window.location.host}/MyDiary/client/login.html`;
};
