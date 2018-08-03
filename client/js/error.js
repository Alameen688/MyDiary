const errorContainerElement = document.getElementById('error-container');
const errorMsgContentArea = document.getElementById('error-content');

const displayError = () => {
  const currentLocation = new URL(document.location);
  const params = (currentLocation).searchParams;
  let msgFromUrl = params.get('msg');
  if (msgFromUrl !== null) {
    msgFromUrl = decodeURIComponent(msgFromUrl).trim().toString();
    errorMsgContentArea.innerText = msgFromUrl;
  }
};
window.onload = () => {
  if (errorContainerElement !== null) {
    displayError();
  }
};
