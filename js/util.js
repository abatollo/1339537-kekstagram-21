'use strict';

(() => {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  window.isEscEvent = function (evt, action) {
    if (evt.keyCode === ESC_KEYCODE) {
      action();
    }
  };
})();
