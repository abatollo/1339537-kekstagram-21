`use strict`;
const photos = document.querySelector(`.pictures`);
const photosTemplate = document.querySelector(`#picture`)
	.content
  .querySelector(`.picture`);

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

const getRandom = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const getRandomFrom = (arr) => arr[getRandom(0, arr.length - 1)];

const generateComments = (amount) => {
	const comments = [];
	for (let i = 0; i < amount; i++) {
		comments.push({
			avatar: `img/avatar-${getRandom(1,6)}.svg`,
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
  };

  return photosFragment;
}

const mockPhotos = generatePhotos(PHOTOS_AMOUNT);

photos.appendChild(renderAllPhotos(mockPhotos));

