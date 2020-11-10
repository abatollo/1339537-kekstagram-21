'use strict';

(() => {
  const DEFAULT_EFFECT_LEVEL = 100;

  const uploadOpener = document.querySelector(`#upload-file`);
  const uploadModal = document.querySelector(`.img-upload__overlay`);
  const uploadCanceler = uploadModal.querySelector(`#upload-cancel`);

  const effectLevelValue = uploadModal.querySelector(`.effect-level__value`);
  const effectLevelDepth = uploadModal.querySelector(`.effect-level__depth`);
  const effectLevelLine = uploadModal.querySelector(`.effect-level__line`);
  const effectLevelPin = effectLevelLine.querySelector(`.effect-level__pin`);

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
  };

  const setEffectLevel = (level) => {
    effectLevelValue.value = level;
    effectLevelPin.style.left = `${level}%`;
    effectLevelDepth.style.width = `${level}%`;
  };

  setEffectLevel(DEFAULT_EFFECT_LEVEL);

  uploadOpener.addEventListener(`change`, onUploadOpenerChange);

  window.uploadModal = {
    uploadModal,
    setEffectLevel
  };
})();
