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
  for (let i = 0; i < photos.length; i++) {
    photos[i].remove();
  }
  window.gallery.photosContainer.classList.remove(`hidden`);
};

const shufflePhotos = (photos) => {
  for (let i = photos.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const element = photos[j];
    photos[j] = photos[i];
    photos[i] = element;
  }
  return photos;
};

const getDefaultPhotos = () => {
  selectFilter(defaultFilterButton);
  clearPhotos();
  photosContainer.appendChild(window.gallery.renderAllPhotos(window.gallery.galleryData));
};

const getCountCommentsPhotos = () => {
  selectFilter(commentsFilterButton);
  const photos = window.gallery.galleryData;
  const commentFilterPhoto = photos.slice();
  clearPhotos();
  photosContainer.appendChild(window.gallery.renderAllPhotos(commentFilterPhoto.sort((left, right) => {
    return right.comments.length - left.comments.length;
  })));
};

const getRandomPhotos = () => {
  selectFilter(randomFilterButton);
  const photos = window.gallery.galleryData;
  let randomFilterPhoto = photos.slice();
  shufflePhotos(randomFilterPhoto);
  randomFilterPhoto = randomFilterPhoto.slice(0, 10);
  clearPhotos();
  photosContainer.appendChild(window.gallery.renderAllPhotos(randomFilterPhoto));
};

const onDefaultFilterClick = window.util.debounce(getDefaultPhotos);
const onCommentsFilterClick = window.util.debounce(getCountCommentsPhotos);
const onRandomFilterClick  = window.util.debounce(getRandomPhotos);

defaultFilterButton.addEventListener(`click`, onDefaultFilterClick);
commentsFilterButton.addEventListener(`click`, onCommentsFilterClick);
randomFilterButton.addEventListener(`click`, onRandomFilterClick);
