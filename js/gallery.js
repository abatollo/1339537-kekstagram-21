'use strict';

(() => {
  const photosContainer = document.querySelector(`.pictures`);
  const photosTemplate = document.querySelector(`#picture`)
    .content
    .querySelector(`.picture`);
  const errorModal = document.querySelector(`#error`).content.querySelector(`section`);
  const filter = document.querySelector(`.img-filters`);
  let galleryData = [];

  const renderPhoto = (photo, id) => {
    const photosElement = photosTemplate.cloneNode(true);

    photosElement.dataset.id = id;

    photosElement.querySelector(`.picture__comments`).textContent = photo.comments.length;
    photosElement.querySelector(`.picture__likes`).textContent = photo.likes;
    photosElement.querySelector(`.picture__img`).setAttribute(`src`, `${photo.url}`);
    photosElement.querySelector(`.picture__img`).setAttribute(`alt`, `${photo.description}`);

    return photosElement;
  };

  const renderAllPhotos = (photos) => {
    const photosFragment = document.createDocumentFragment();
    for (let i = 0; i < photos.length; i++) {
      photosFragment.appendChild(renderPhoto(photos[i], photos[i].url));
    }
    return photosFragment;
  };

  const onDownloadSuccess = (data) => {
    window.gallery.galleryData = data;
    photosContainer.appendChild(renderAllPhotos(data));
    filter.classList.remove(`img-filters--inactive`);
  };

  const onDownloadError = (error) => {
    const errorWindow = errorModal.cloneNode(true);
    const errorContainer = errorWindow.querySelector(`.error__inner`);
    const errorButton = errorWindow.querySelector(`.error__button`);
    errorContainer.removeChild(errorButton);
    errorContainer.style.width = `${700}px`;
    errorWindow.querySelector(`.error__title`).textContent = error;
    photosContainer.append(errorWindow);
  };

  window.api.download(onDownloadSuccess, onDownloadError);

  window.gallery = {
    photosContainer,
    galleryData,
    renderAllPhotos
  };
})();
