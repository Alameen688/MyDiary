/* global baseUrl, checkCookie, getOptions, validateEntryField,
startLoadingBtn, endLoadingBtn, logout */
/* eslint-disable radix */
const errorBoxElement = document.getElementById('error-box');
const entrySubjectField = document.getElementById('write-subject');
const entryContentField = document.getElementById('write-content');
const newEntryButton = document.getElementById('new-entry-btn');
const editEntryButton = document.getElementById('edit-entry-btn');
const gridBoxElement = document.getElementById('grid-box');
const entryGridElement = document.getElementsByClassName('entry-grid')[0];
const viewEntryContentBox = document.getElementById('entry-content-box');
const viewEntryTitle = document.getElementById('entry-title');
const viewEntryContent = document.getElementById('entry-content');
const viewEntryDate = document.getElementById('date');
const floatingActionButton = document.getElementById('floating-button');
const loaderElement = document.getElementsByClassName('loader')[0];
const logoutBtn = document.getElementById('btn-logout');


let errorMsgCode;

/* URL method from https://developer.mozilla.org/en-US/docs/Web/API/URL/searchParams */
const checkUrlForId = () => {
  const currentLocation = new URL(document.location);
  const params = (currentLocation).searchParams;
  if (params.get('id') == null) {
    const msg = '404 not found, no entry id was given';
    window.location = `${window.location.protocol}//${window.location.host}/client/error.html?msg=${msg}`;
  }
};

const formatDate = (date) => {
  const parsedDate = new Date(date);
  const monthText = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const entryDate = `${monthText[parsedDate.getMonth()]} ${parsedDate.getDate()}, ${parsedDate.getFullYear()}`;
  return entryDate;
};
const getEntryItemCode = (id, title, date) => {
  const firstLetter = title.slice(0, 1);
  const entryDate = formatDate(date);

  const entryItemCode = `
    <a class="item" href="/client/view-entry.html?id=${id}">
            
      <div>
        <h1 class="title">${title}</h1>
        <div class="meta">
          <div class="avatar" entry-letter="${firstLetter}">
          </div>
          <div class="date">
            <i class="fa fa-calendar"></i> <span>${entryDate}</span>
          </div>
        </div>
      </div>
          
      </a>
  `;
  return entryItemCode;
};

const addNewEntry = (event) => {
  event.preventDefault();
  const returnText = newEntryButton.value;
  const loadingText = 'Creating..';
  const errorMsgElement = document.getElementById('error-msg');
  if (errorMsgElement !== null) {
    errorMsgElement.parentNode.removeChild(errorMsgElement);
  }
  const url = `${baseUrl}/entries`;
  const title = entrySubjectField.value;
  const content = entryContentField.value;
  const validationMsg = validateEntryField(title, content);

  if (validationMsg.title.length !== 0 || validationMsg.content.length !== 0) {
    // take first error message of each field
    let errorMsgs = (validationMsg.title[0]) ? `<li>${(validationMsg.title[0])}</li>` : '';
    errorMsgs += (validationMsg.content[0]) ? `<li>${(validationMsg.content[0])}</li>` : '';
    errorMsgCode = `<ul id="error-msg">${errorMsgs}</ul>`;
    errorBoxElement.innerHTML = errorMsgCode;
    return;
  }

  startLoadingBtn(newEntryButton, loadingText);

  const newEntryData = {
    title,
    content,
  };
  const options = getOptions('POST', newEntryData);

  fetch(url, options)
    .then(res => res.json())
    .then(({ status, message, errors }) => {
      endLoadingBtn(newEntryButton, returnText);
      let errorMsgs = '';
      if (status === 'success') {
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
    .catch((err) => {
      endLoadingBtn(newEntryButton, returnText);
      const message = `<li>${err}</li>`;
      errorMsgCode = `<ul id="error-msg">${message}</ul>`;
      errorBoxElement.innerHTML = errorMsgCode;
    });
};

const saveEditEntry = (event, id) => {
  event.preventDefault();
  const returnText = editEntryButton.value;
  const loadingText = 'Updating..';
  const url = `${baseUrl}/entries/${id}`;
  const title = entrySubjectField.value;
  const content = entryContentField.value;
  const validationMsg = validateEntryField(title, content);

  if (validationMsg.title.length !== 0 || validationMsg.content.length !== 0) {
    // take first error message of each field
    let errorMsgs = (validationMsg.title[0]) ? `<li>${(validationMsg.title[0])}</li>` : '';
    errorMsgs += (validationMsg.content[0]) ? `<li>${(validationMsg.content[0])}</li>` : '';
    errorMsgCode = `<ul id="error-msg">${errorMsgs}</ul>`;
    errorBoxElement.innerHTML = errorMsgCode;
    return;
  }

  startLoadingBtn(editEntryButton, loadingText);

  const editEntryData = {
    title,
    content,
  };
  const options = getOptions('PUT', editEntryData);

  fetch(url, options)
    .then(res => res.json())
    .then(({ status, message, errors }) => {
      endLoadingBtn(editEntryButton, returnText);
      let errorMsgs = '';
      if (status === 'success') {
        window.location = `${window.location.protocol}//${window.location.host}/client/view-entry.html?id=${id}`;
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
      endLoadingBtn(editEntryButton, returnText);
      const message = `<li>${err}</li>`;
      errorMsgCode = `<ul id="error-msg">${message}</ul>`;
      errorBoxElement.innerHTML = errorMsgCode;
    });
};

const populateEntryToEdit = (id) => {
  const url = `${baseUrl}/entries/${id}`;
  const options = getOptions('GET');

  fetch(url, options)
    .then(res => res.json())
    .then(({
      status, message, errors, data,
    }) => {
      if (status === 'success') {
        entrySubjectField.value = data.title;
        entryContentField.value = data.content;
      } else if (status === 'error') {
        let msg = '';
        if (errors !== undefined) {
          const { firstMessage } = errors[0];
          msg = firstMessage;
        } else if (message !== undefined) {
          msg = message;
        }
        msg = encodeURIComponent(msg);
        window.location = `${window.location.protocol}//${window.location.host}/client/error.html?msg=${msg}`;
      }
    })
    .catch((err) => {
      const message = `<li>${err}</li>`;
      errorMsgCode = `<ul id="error-msg">${message}</ul>`;
      errorBoxElement.innerHTML = errorMsgCode;
    });
};

const getAllEntries = () => {
  const url = `${baseUrl}/entries`;
  const options = getOptions('GET');

  fetch(url, options)
    .then(res => res.json())
    .then((result) => {
      loaderElement.parentNode.removeChild(loaderElement);
      const { status, data, message } = result;
      if (status === 'success') {
        if (data.length > 0) {
          data.forEach((entry) => {
            const entryItemCode = getEntryItemCode(entry.id, entry.title, entry.created_at);
            entryGridElement.innerHTML += entryItemCode;
          });
        } else {
          const emptyEntryMsg = 'You do not have any diary entry yet. Add a diary entry';
          entryGridElement.innerHTML += `<div class="empty-entry-info">${emptyEntryMsg}</div>`;
        }
      } else if (status === 'error') {
        errorMsgCode = `<div id="error-msg">${message}</div>`;
        entryGridElement.innerHTML = errorMsgCode;
      }
    })
    .catch((err) => {
      errorMsgCode = `<div id="error-msg">${err}</div>`;
      entryGridElement.innerHTML = errorMsgCode;
    });
};

const getEntryById = (id) => {
  const url = `${baseUrl}/entries/${id}`;
  const options = getOptions('GET');

  fetch(url, options)
    .then(res => res.json())
    .then(({
      status, data, message, errors,
    }) => {
      if (status === 'success') {
        const entryDate = formatDate(data.created_at);
        const entryTitleCode = `
          ${data.title}
          <span><a href="edit-entry.html?id=${data.id}" class="fa fa-edit"></a></span>`;
        const entryDateCode = `<h3>${entryDate}</h3>`;
        viewEntryTitle.innerHTML = entryTitleCode;
        viewEntryDate.innerHTML = entryDateCode;
        viewEntryContent.innerHTML = data.content;
        document.title = `${data.title} | MyDiary`;
        floatingActionButton.firstElementChild.setAttribute('href', `/client/edit-entry.html?id=${data.id}`);
      } else if (status === 'error') {
        if (errors) {
          let errorMsgs = '';
          errors.forEach((error) => {
            errorMsgs += `<li>${error}</li>`;
          });
          errorMsgCode = `<div id="error-msg"><ul>${errorMsgs}</ul></div>`;
        } else if (message) {
          errorMsgCode = `<div id="error-msg">${message}</div>`;
        }
        viewEntryContentBox.innerHTML = errorMsgCode;
      }
    })
    .catch((err) => {
      errorMsgCode = `<div id="error-msg">${err}</div>`;
      viewEntryContentBox.innerHTML = errorMsgCode;
    });
};

window.onload = () => {
  // add profile image if user is logged in
  if (checkCookie('token') === true) {
    logoutBtn.addEventListener('click', logout);
    if (newEntryButton !== null) {
      newEntryButton.addEventListener('click', addNewEntry);
    }
    if (editEntryButton !== null) {
      checkUrlForId();
      const currentLocation = new URL(document.location);
      const params = (currentLocation).searchParams;
      const urlIdParam = params.get('id').trim();
      const entryId = parseInt(urlIdParam);
      populateEntryToEdit(entryId);
      editEntryButton.addEventListener('click', (event) => {
        saveEditEntry(event, entryId);
      });
    }
    if (gridBoxElement !== null) {
      getAllEntries();
    }
    if (viewEntryContentBox !== null) {
      checkUrlForId();
      const currentLocation = new URL(document.location);
      const params = (currentLocation).searchParams;
      const urlIdParam = params.get('id').trim();
      const entryId = parseInt(urlIdParam);
      getEntryById(entryId);
    }
  } else {
    window.location = `${window.location.protocol}//${window.location.host}/client/login.html`;
  }
};
