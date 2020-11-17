'use strict';

(() => {
  const ESC_KEYCODE = 27;
  const DEBOUNCE_INTERVAL = 500;

  const isEscEvent = function (evt, action) {
    if (evt.keyCode === ESC_KEYCODE) {
      action();
    }
  };

  const debounce = (cb) => {

    let lastTimeout = null;

    return (...parameters) => {
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(() => {
        cb.apply(...parameters);
      }, DEBOUNCE_INTERVAL);
    };
  };

  window.util = {
    isEscEvent,
    debounce
  };
})();
