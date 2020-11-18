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

  const shuffle = (shuffleArray) => {
    for (let i = shuffleArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const element = shuffleArray[j];
      shuffleArray[j] = shuffleArray[i];
      shuffleArray[i] = element;
    }
    return shuffleArray;
  };

  window.util = {
    isEscEvent,
    shuffle,
    debounce
  };
})();
