'use strict';

(() => {
  const effectLevelSliderElement = document.querySelector(`.img-upload__effect-level`);
  const effectLevelBarElement = effectLevelSliderElement.querySelector(`.effect-level__line`);
  const effectLevelPinElement = effectLevelSliderElement.querySelector(`.effect-level__pin`);

  const calculateEffectLevel = (shiftX) => {
    let effectLevel = ((effectLevelPinElement.offsetLeft - shiftX) * 100 / effectLevelBarElement.offsetWidth).toFixed(0);

    if (effectLevel > 100) {
      effectLevel = 100;
    } else if (effectLevel < 0) {
      effectLevel = 0;
    }

    return effectLevel;
  };

  const pinMouseDownHandler = (evt) => {
    evt.preventDefault();

    let startX = evt.clientX;

    const pinMouseMoveHandler = (moveEvt) => {
      moveEvt.preventDefault();

      let shiftX = startX - moveEvt.clientX;

      startX = moveEvt.clientX;

      window.uploadModal.setEffectLevel(calculateEffectLevel(shiftX));
    };

    const pinMouseUpHandler = (upEvt) => {
      upEvt.preventDefault();

      document.removeEventListener(`mousemove`, pinMouseMoveHandler);
      document.removeEventListener(`mouseup`, pinMouseUpHandler);
    };

    document.addEventListener(`mousemove`, pinMouseMoveHandler);
    document.addEventListener(`mouseup`, pinMouseUpHandler);
  };

  window.slider = {
    pinMouseDownHandler
  };
})();
