/* eslint-disable no-unused-vars */
const baseUrl = 'http://127.0.0.1:3000/api/v1';
/** WORKING WITH COOKIES REFERENCE https://www.w3schools.com/js/js_cookies.asp* */
const getCookie = (cname) => {
  const name = `${cname}=`;
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i + 1) {
    let c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
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
