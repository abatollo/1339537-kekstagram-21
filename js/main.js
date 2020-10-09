"use strict";

const PHOTOS_AMOUNT = 25;

const COMMENT_MESSAGES = [
  `Всё отлично!`,
  `В целом всё неплохо. Но не всё.`,
  `Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.`,
  `Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.`,
  `Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.`,
  `Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!`
];

const COMMENT_NAMES = [
  `Артем`,
  `Катя`,
  `Вася`,
  `Аня`,
  `Петя`,
  `Оля`
];

const photosContainer = document.querySelector(`.pictures`);
const photosTemplate = document.querySelector(`#picture`)
	.content
  .querySelector(`.picture`);

const getRandom = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const getRandomFrom = (arr) => arr[getRandom(0, arr.length - 1)];

const generateComments = (amount) => {
  const comments = [];
  for (let i = 0; i < amount; i++) {
    comments.push({
      avatar: `img/avatar-${getRandom(1, 6)}.svg`,
      message: getRandomFrom(COMMENT_MESSAGES),
      name: getRandomFrom(COMMENT_NAMES)
    });
  }
  return comments;
};

const generatePhotos = (amount) => {
  const photos = [];
  for (let i = 0; i < amount; i++) {
    photos.push({
      url: `photos/${i + 1}.jpg`,
      description: `описание фотографии`,
      likes: getRandom(15, 200),
      comments: generateComments(getRandom(1, 6))
    });
  }
  return photos;
};

const renderPhoto = (photo) => {
  const photosElement = photosTemplate.cloneNode(true);

  photosElement.querySelector(`.picture__comments`).textContent = photo.comments.length;
  photosElement.querySelector(`.picture__likes`).textContent = photo.likes;
  photosElement.querySelector(`.picture__img`).setAttribute(`src`, `${photo.url}`);
  photosElement.querySelector(`.picture__img`).setAttribute(`alt`, `${photo.description}`);

  return photosElement;
};

const renderAllPhotos = (photos) => {
  const photosFragment = document.createDocumentFragment();
  for (let i = 0; i < photos.length; i++) {
    photosFragment.appendChild(renderPhoto(photos[i]));
  }
  return photosFragment;
};

const mockPhotos = generatePhotos(PHOTOS_AMOUNT);

photosContainer.appendChild(renderAllPhotos(mockPhotos));

// -=-=-=-=-=-=-=-=-=

const bigPictures = document.querySelector(`.big-picture`);
bigPictures.classList.remove(`hidden`);

bigPictures.querySelector(`.big-picture__img img`).setAttribute(`src`, `${mockPhotos[0].url}`);
bigPictures.querySelector(`.likes-count`).textContent = mockPhotos[0].likes;
bigPictures.querySelector(`.comments-count`).textContent = mockPhotos[0].comments.length;
bigPictures.querySelector(`.social__comments`).innerHTML = ``;
for (let i = 0; i < mockPhotos[0].comments.length; i++) {
  bigPictures.querySelector(`.social__comments`).innerHTML +=
  `<li class="social__comment">
    <img
        class="social__picture"
        src="${mockPhotos[0].comments[i].avatar}"
        alt="${mockPhotos[0].comments[i].name}"
        width="35" height="35">
    <p class="social__text">${mockPhotos[0].comments[i].message}</p>
  </li>`;
}

bigPictures.querySelector(`.social__caption`).textContent = mockPhotos[0].description;

const socialCommentCount = document.querySelector(`.social__comment-count`);
socialCommentCount.classList.add(`hidden`);

const commentsLoader = document.querySelector(`.comments-loader`);
commentsLoader.classList.add(`hidden`);

const body = document.querySelector(`body`);
body.classList.add(`modal-open`);
