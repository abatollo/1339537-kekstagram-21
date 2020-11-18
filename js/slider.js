'use strict';

(() => {
  const MAX_EFFECT_PERCENTAGE = 100;
  const MIN_EFFECT_PERCENTAGE = 0;
  const effectLevelSliderElement = document.querySelector(`.img-upload__effect-level`);
  const effectLevelBarElement = effectLevelSliderElement.querySelector(`.effect-level__line`);
  const effectLevelPinElement = effectLevelSliderElement.querySelector(`.effect-level__pin`);

  const calculateEffectLevel = (shiftX) => {
    let effectLevel = ((effectLevelPinElement.offsetLeft - shiftX) * 100 / effectLevelBarElement.offsetWidth).toFixed(0);

    if (effectLevel > MAX_EFFECT_PERCENTAGE) {
      effectLevel = MAX_EFFECT_PERCENTAGE;
    } else if (effectLevel < MIN_EFFECT_PERCENTAGE) {
      effectLevel = MIN_EFFECT_PERCENTAGE;
    }

    return effectLevel;
  };

  const onEffectLevelPinMouseDown = (evt) => {
    evt.preventDefault();

    let startX = evt.clientX;

    const onPinMouseMove = (moveEvt) => {
      moveEvt.preventDefault();

      let shiftX = startX - moveEvt.clientX;

      startX = moveEvt.clientX;

      window.uploadModal.setEffectLevel(calculateEffectLevel(shiftX));
    };

    const onPinMouseUp = (upEvt) => {
      upEvt.preventDefault();

      document.removeEventListener(`mousemove`, onPinMouseMove);
      document.removeEventListener(`mouseup`, onPinMouseUp);
    };

    document.addEventListener(`mousemove`, onPinMouseMove);
    document.addEventListener(`mouseup`, onPinMouseUp);
  };

  window.slider = {
    onEffectLevelPinMouseDown
  };
})();
