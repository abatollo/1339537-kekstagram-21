'use strict';

(() => {
  const DEFAULT_EFFECT_LEVEL = 100;
  const NO_EFFECT_VALUE = `none`;
  const DEFAULT_SCALE_CONTROL_VALUE = `100%`;

  let currentEffect = ``;
  let effectLevel = DEFAULT_EFFECT_LEVEL;

  const uploadOpener = document.querySelector(`#upload-file`);
  const uploadModal = document.querySelector(`.img-upload__overlay`);
  const uploadCanceler = uploadModal.querySelector(`#upload-cancel`);

  const imagePreviewElement = uploadModal.querySelector(`.img-upload__preview img`);

  const effectLevelValue = uploadModal.querySelector(`.effect-level__value`);
  const effectLevelDepth = uploadModal.querySelector(`.effect-level__depth`);
  const effectLevelLine = uploadModal.querySelector(`.effect-level__line`);
  const effectLevelPin = effectLevelLine.querySelector(`.effect-level__pin`);

  const effectsListElement = document.querySelector(`.effects__list`);

  const scaleControl = document.querySelector(`.img-upload__scale`);
  const scaleControlBigger = scaleControl.querySelector(`.scale__control--smaller`);
  const scaleControlSmaller = scaleControl.querySelector(`.scale__control--bigger`);
  const scaleControlValue = scaleControl.querySelector(`.scale__control--value`);

  scaleControlValue.value = DEFAULT_SCALE_CONTROL_VALUE;

  const onUploadOpenerChange = () => {
    openUploadModal();
  };

  const onUploadCancelerClick = () => {
    closeUploadModal();
  };

  const onDocumentEscapePress = (evt) => {
    if (evt.key === `Escape` && evt.target !== window.form.textHashtags && evt.target !== window.form.textDescription) {
      evt.preventDefault();
      closeUploadModal();
    }
  };

  const openUploadModal = () => {
    uploadCanceler.addEventListener(`click`, onUploadCancelerClick);
    document.addEventListener(`keydown`, onDocumentEscapePress);
    window.gallery.photosContainer.removeEventListener(`click`, window.picture.onPhotosContainerClick);
    effectLevelPin.addEventListener(`mousedown`, window.slider.pinMouseDownHandler);
    uploadOpener.removeEventListener(`change`, onUploadOpenerChange);
    window.form.textHashtags.addEventListener(`input`, window.form.onTextHashtagsInput);
    uploadModal.classList.remove(`hidden`);
    effectsListElement.addEventListener(`change`, effectsListClickHandler);
    scaleControl.addEventListener(`click`, scaleControlHandler);
  };

  const closeUploadModal = () => {
    uploadCanceler.removeEventListener(`click`, onUploadCancelerClick);
    document.removeEventListener(`keydown`, onDocumentEscapePress);
    window.gallery.photosContainer.addEventListener(`click`, window.picture.onPhotosContainerClick);
    effectLevelPin.addEventListener(`mousedown`, window.slider.pinMouseDownHandler);
    uploadOpener.addEventListener(`change`, onUploadOpenerChange);
    window.form.textHashtags.removeEventListener(`input`, window.form.onTextHashtagsInput);
    uploadModal.classList.add(`hidden`);
    uploadOpener.value = ``;
    effectsListElement.removeEventListener(`change`, effectsListClickHandler);
    scaleControl.removeEventListener(`click`, scaleControlHandler);
  };

  const scaleControlHandler = (evt) => {
    if (evt.target === scaleControlBigger && scaleControlValue.value.slice(0, -1) > 25) {
      scaleControlValue.value = +scaleControlValue.value.slice(0, -1) - 25 + `%`;
      imagePreviewElement.style.transform = `scale(0.${scaleControlValue.value.slice(0, -1)})`;
    } else if (evt.target === scaleControlSmaller && scaleControlValue.value.slice(0, -1) < 100) {
      scaleControlValue.value = +scaleControlValue.value.slice(0, -1) + 25 + `%`;
      if (scaleControlValue.value.slice(0, -1) < 100) {
        imagePreviewElement.style.transform = `scale(0.${scaleControlValue.value.slice(0, -1)})`;
      } else if (+scaleControlValue.value.slice(0, -1) === 100) {
        imagePreviewElement.style.transform = ``;
      }
    }
  };

  const setEffectLevel = (level) => {
    effectLevelValue.value = level;
    effectLevelPin.style.left = `${level}%`;
    effectLevelDepth.style.width = `${level}%`;
    switch (currentEffect) {
      case `effects__preview--chrome`:
        imagePreviewElement.style.filter = `grayscale(${level / 100})`;
        break;
      case `effects__preview--sepia`:
        imagePreviewElement.style.filter = `sepia(${level / 100})`;
        break;
      case `effects__preview--marvin`:
        imagePreviewElement.style.filter = `invert(${level}%)`;
        break;
      case `effects__preview--phobos`:
        imagePreviewElement.style.filter = `blur(${level * 3 / 100}px)`;
        break;
      case `effects__preview--heat`:
        imagePreviewElement.style.filter = `brightness(${level * 2 / 100 + 1})`;
        break;
      default:
        imagePreviewElement.style.filter = NO_EFFECT_VALUE;
        break;
    }
  };

  const resetPreviewEffectClasses = () => {
    if (currentEffect !== ``) {
      imagePreviewElement.style.filter = null;
      imagePreviewElement.classList.remove(currentEffect);
    }
  };

  const effectsListClickHandler = (evt) => {
    resetPreviewEffectClasses();

    if (evt.target.value !== NO_EFFECT_VALUE) {
      currentEffect = `effects__preview--${evt.target.value}`;
      imagePreviewElement.classList.add(currentEffect);
      effectLevel = DEFAULT_EFFECT_LEVEL;
      setEffectLevel(effectLevel);
      // effectLevelSliderElement.classList.remove(`hidden`);
      return;
    }

    currentEffect = ``;
    // effectLevelSliderElement.classList.add(`hidden`);
  };

  setEffectLevel(DEFAULT_EFFECT_LEVEL);

  uploadOpener.addEventListener(`change`, onUploadOpenerChange);

  window.uploadModal = {
    uploadModal,
    setEffectLevel
  };
})();
