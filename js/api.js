'use strict';

const TIMEOUT = 10000;
const Endpoint = {
  DOWNLOAD: `https://21.javascript.pages.academy/kekstagram/data`,
  UPLOAD: `https://21.javascript.pages.academy/kekstagram/`
};
const StatusCode = {
  OK: 200,
  NOT_FOUND: 404
};

const transferData = (method, url, data, onSuccess, onError) => {
  const xhr = new XMLHttpRequest();
  xhr.responseType = `json`;

  xhr.addEventListener(`load`, () => {
    if (xhr.status === StatusCode.OK) {
      onSuccess(xhr.response);
    } else if (xhr.status === StatusCode.NOT_FOUND) {
      onError(`Узел не найден`);
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
  transferData(`GET`, Endpoint.DOWNLOAD, null, onSuccess, onError);
};

const upload = (data, onSuccess, onError) => {
  transferData(`POST`, Endpoint.UPLOAD, data, onSuccess, onError);
};

window.api = {
  download,
  upload,
};
