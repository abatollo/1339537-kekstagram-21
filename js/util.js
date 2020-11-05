'use strict';

(() => {
  const ESC_KEYCODE = 27;

  const isEscEvent = function (evt, action) {
    if (evt.keyCode === ESC_KEYCODE) {
      action();
    }
  };

  window.util = {
    isEscEvent
  };
})();
