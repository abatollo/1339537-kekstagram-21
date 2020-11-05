'use strict';

(() => {
  const uploadOpener = document.querySelector(`#upload-file`);
  const uploadModal = document.querySelector(`.img-upload__overlay`);
  const uploadCanceler = uploadModal.querySelector(`#upload-cancel`);

  const effectLevelValue = uploadModal.querySelector(`.effect-level__value`);
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
    effectLevelPin.addEventListener(`mouseup`, onEffectLevelPinMouseUp);
    uploadOpener.removeEventListener(`change`, onUploadOpenerChange);
    window.form.textHashtags.addEventListener(`input`, window.form.onTextHashtagsInput);
    uploadModal.classList.remove(`hidden`);
  };

  const closeUploadModal = () => {
    uploadCanceler.removeEventListener(`click`, onUploadCancelerClick);
    document.removeEventListener(`keydown`, onDocumentEscapePress);
    effectLevelPin.removeEventListener(`mouseup`, onEffectLevelPinMouseUp);
    uploadOpener.addEventListener(`change`, onUploadOpenerChange);
    window.form.textHashtags.removeEventListener(`input`, window.form.onTextHashtagsInput);
    uploadModal.classList.add(`hidden`);
    uploadOpener.value = ``;
  };

  const onEffectLevelPinMouseUp = () => {
    effectLevelValue.value = effectLevelPin.offsetLeft / effectLevelLine.offsetWidth * 100;
  };

  uploadOpener.addEventListener(`change`, onUploadOpenerChange);

  window.uploadModal = {
    uploadModal
  };
})();
