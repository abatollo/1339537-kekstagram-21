'use strict';

const URL_DOWNLOAD = `https://21.javascript.pages.academy/kekstagram/data`;
const URL_UPLOAD = `https://21.javascript.pages.academy/kekstagram/`;
const STATUS_CODE = {
  OK: 200
};
const TIMEOUT = 10000;

const transferData = (method, url, data, onSuccess, onError) => {
  const xhr = new XMLHttpRequest();
  xhr.responseType = `json`;

  xhr.addEventListener(`load`, () => {
    if (xhr.status === STATUS_CODE.OK) {
      onSuccess(xhr.response);
    } else {
      onError(`Статус ответа: ${xhr.status} ${xhr.statusText}`);
    }
  });

  xhr.addEventListener(`error`, () => {
    onError(`Произошла ошибка соединения`);
  });
  xhr.addEventListener(`timeout`, () => {
    onError(`Запрос не успел выполнится за ${xhr.timeout} мс`);
  });

  xhr.timeout = TIMEOUT;

  xhr.open(method, url);
  xhr.send(data);
};

const download = (onSuccess, onError) => {
  transferData(`GET`, URL_DOWNLOAD, null, onSuccess, onError);
};

const upload = (data, onSuccess, onError) => {
  transferData(`POST`, URL_UPLOAD, data, onSuccess, onError);
};

window.api = {
  download,
  upload,
};
