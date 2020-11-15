'use strict';

(() => {
  const photosContainer = document.querySelector(`.pictures`);
  const photosTemplate = document.querySelector(`#picture`)
    .content
    .querySelector(`.picture`);
  const errorModal = document.querySelector(`#error`).content.querySelector(`section`);
  let galleryData = ``;

  const renderPhoto = (photo, id) => {
    const photosElement = photosTemplate.cloneNode(true);

    photosElement.dataset.id = id;

    photosElement.querySelector(`.picture__comments`).textContent = photo.comments.length;
    photosElement.querySelector(`.picture__likes`).textContent = photo.likes;
    photosElement.querySelector(`.picture__img`).setAttribute(`src`, `${photo.url}`);
    photosElement.querySelector(`.picture__img`).setAttribute(`alt`, `${photo.description}`);

    // photosElement.querySelector(`.picture__img`).dataset.id = id;

    return photosElement;
  };

  const renderAllPhotos = (photos) => {
    const photosFragment = document.createDocumentFragment();
    for (let i = 0; i < photos.length; i++) {
      photosFragment.appendChild(renderPhoto(photos[i], i));
    }
    return photosFragment;
  };

  const onDownloadSuccess = (data) => {
    photosContainer.appendChild(renderAllPhotos(data));
    window.gallery.galleryData = data;
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

  window.download(onDownloadSuccess, onDownloadError);

  window.gallery = {
    photosContainer,
    galleryData
  };
})();
