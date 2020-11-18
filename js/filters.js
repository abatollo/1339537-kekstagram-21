'use strict';

const defaultFilterButton = document.querySelector(`#filter-default`);
const commentsFilterButton = document.querySelector(`#filter-discussed`);
const randomFilterButton = document.querySelector(`#filter-random`);
const filters = document.querySelector(`.img-filters`);
const photosContainer = document.querySelector(`.pictures`);

const selectFilter = (buttonElement) => {
  filters.querySelectorAll(`.img-filters__button--active`).forEach((element) => {
    element.classList.remove(`img-filters__button--active`);
  });
  buttonElement.classList.add(`img-filters__button--active`);
};

const clearPhotos = () => {
  window.gallery.photosContainer.classList.add(`hidden`);
  const photos = document.querySelectorAll(`.picture`);
  for (let photo of photos) {
    photo.remove();
  }
  window.gallery.photosContainer.classList.remove(`hidden`);
};

const showDefault = () => {
  selectFilter(defaultFilterButton);
  clearPhotos();
  photosContainer.appendChild(window.gallery.renderAllPhotos(window.gallery.galleryData));
};

const showCommented = () => {
  selectFilter(commentsFilterButton);
  const photos = window.gallery.galleryData;
  const commentFilterPhoto = photos.slice();
  clearPhotos();
  photosContainer.appendChild(window.gallery.renderAllPhotos(commentFilterPhoto.sort((left, right) => {
    return right.comments.length - left.comments.length;
  })));
};

const showRandom = () => {
  selectFilter(randomFilterButton);
  const photos = window.gallery.galleryData;
  let randomFilterPhoto = photos.slice();
  window.util.shuffle(randomFilterPhoto);
  randomFilterPhoto = randomFilterPhoto.slice(0, 10);
  clearPhotos();
  photosContainer.appendChild(window.gallery.renderAllPhotos(randomFilterPhoto));
};

const onDefaultFilterClick = window.util.debounce(showDefault);
const onCommentsFilterClick = window.util.debounce(showCommented);
const onRandomFilterClick = window.util.debounce(showRandom);

defaultFilterButton.addEventListener(`click`, onDefaultFilterClick);
commentsFilterButton.addEventListener(`click`, onCommentsFilterClick);
randomFilterButton.addEventListener(`click`, onRandomFilterClick);
