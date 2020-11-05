'use strict';

(() => {
  const photosContainer = document.querySelector(`.pictures`);
  const photosTemplate = document.querySelector(`#picture`)
    .content
    .querySelector(`.picture`);

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

  photosContainer.appendChild(renderAllPhotos(window.data));

  window.gallery = {
    photosContainer
  };
})();
