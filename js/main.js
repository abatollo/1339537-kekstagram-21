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

const HASTAG_MAX_LENGTH = 20;

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

// -=-=-=-=-=-=-=-=-=-

const renderBigPicture = (photo) => {
  const bigPicture = document.querySelector(`.big-picture`);
  bigPicture.classList.remove(`hidden`);

  bigPicture.querySelector(`.big-picture__img img`).setAttribute(`src`, `${photo.url}`);
  bigPicture.querySelector(`.likes-count`).textContent = photo.likes;
  bigPicture.querySelector(`.comments-count`).textContent = photo.comments.length;
  bigPicture.querySelector(`.social__caption`).textContent = photo.description;

  bigPicture.querySelector(`.social__comments`).innerHTML = ``;
  renderBigPictureComments(photo.comments, bigPicture.querySelector(`.social__comments`));

  const socialCommentCount = document.querySelector(`.social__comment-count`);
  socialCommentCount.classList.add(`hidden`);

  const commentsLoader = document.querySelector(`.comments-loader`);
  commentsLoader.classList.add(`hidden`);

  const body = document.querySelector(`body`);
  body.classList.add(`modal-open`);
};

const renderBigPictureComments = (comments, mountingPoint) => {
  for (let i = 0; i < comments.length; i++) {
    const commentListItem = document.createElement(`li`);
    commentListItem.classList.add(`social__comment`);

    const commentImage = document.createElement(`img`);
    commentImage.setAttribute(`src`, `${comments[i].avatar}`);
    commentImage.setAttribute(`alt`, `${comments[i].name}`);
    commentImage.setAttribute(`width`, `35`);
    commentImage.setAttribute(`height`, `35`);
    commentImage.classList.add(`social__picture`);

    const commentText = document.createElement(`p`);
    commentText.classList.add(`social__text`);
    commentText.textContent = comments[i].message;

    commentListItem.appendChild(commentImage);
    commentListItem.appendChild(commentText);

    mountingPoint.appendChild(commentListItem);
  }
};

renderBigPicture(mockPhotos[5]);

// -=-=-=-=-=-=-=-=-=-

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
  if (evt.key === `Escape` && evt.target !== textHashtags) {
    evt.preventDefault();
    closeUploadModal();
  }
};

const openUploadModal = () => {
  uploadCanceler.addEventListener(`click`, onUploadCancelerClick);
  document.addEventListener(`keydown`, onDocumentEscapePress);
  effectLevelPin.addEventListener(`mouseup`, onEffectLevelPinMouseUp);
  uploadOpener.removeEventListener(`change`, onUploadOpenerChange);
  textHashtags.addEventListener(`input`, onTextHashtagsInput);
  uploadModal.classList.remove(`hidden`);
};

const closeUploadModal = () => {
  uploadCanceler.removeEventListener(`click`, onUploadCancelerClick);
  document.removeEventListener(`keydown`, onDocumentEscapePress);
  effectLevelPin.removeEventListener(`mouseup`, onEffectLevelPinMouseUp);
  uploadOpener.addEventListener(`change`, onUploadOpenerChange);
  textHashtags.removeEventListener(`input`, onTextHashtagsInput);
  uploadModal.classList.add(`hidden`);
  uploadOpener.value = ``;
};

const onEffectLevelPinMouseUp = () => {
  effectLevelValue.value = effectLevelPin.offsetLeft / effectLevelLine.offsetWidth * 100;
};

uploadOpener.addEventListener(`change`, onUploadOpenerChange);

// -=-=-=-=-=-=-=-=-=-

const textHashtags = uploadModal.querySelector(`.text__hashtags`);

const re = /^[\w]*$/;

const validateTextHashtags = () => {
  const textHashtagsParsed = textHashtags.value.trim().split(` `);
  let customValidityMessage = ``;
  let isSameHashtagFound = false;

  for (let i = 0; i < textHashtagsParsed.length; i++) {
    if (textHashtagsParsed[i].startsWith(`#`) && textHashtagsParsed[i].length === 1) {
      customValidityMessage += `Хеш-тег не может состоять из одного октоторпа. `;
    }

    if (!textHashtagsParsed[i].startsWith(`#`) && re.test(textHashtagsParsed[i]) && textHashtagsParsed[i].length > 0) {
      customValidityMessage += `Хеш-тег “${textHashtagsParsed[i]}” должен предваряться октоторпом. `;
    }

    if (textHashtagsParsed[i].length > HASTAG_MAX_LENGTH) {
      customValidityMessage += `Хеш-тег “${textHashtagsParsed[i]}” должен быть короче 20 символов. Удалите лишние ${textHashtagsParsed[i].length - HASTAG_MAX_LENGTH} симв. `;
    }

    if (!textHashtagsParsed[i].startsWith(`#`) && !re.test(textHashtagsParsed[i])) {
      customValidityMessage += `Нельзя использовать спецсимволы (#, @, $ и т. п.), за исключением октоторпа в начале хеш-тега, символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д. `;
    }

    if (textHashtagsParsed[i].startsWith(`#`) && textHashtagsParsed[i].length > 1 && !re.test(textHashtagsParsed[i].substring(1))) {
      customValidityMessage += `После октоторпа не должны стоять спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д. `;
    }

    if (!isSameHashtagFound) {
      for (let j = 0; j < textHashtagsParsed.length; j++) {
        if (textHashtagsParsed[i] === textHashtagsParsed[j] && textHashtagsParsed[i].length > 0 && j !== i) {
          customValidityMessage += `Хеш-теги не должны повторяться. `;
          isSameHashtagFound = true;
        }
      }
    }
  }

  if (textHashtagsParsed.length > 5) {
    customValidityMessage += `Нельзя указывать больше пяти хеш-тегов. `;
  }

  textHashtags.setCustomValidity(customValidityMessage);
  textHashtags.reportValidity();
};

const onTextHashtagsInput = () => {
  validateTextHashtags();
};
