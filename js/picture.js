'use strict';

(() => {
  const COMMENTS_CHUNK = 5;
  const COMMENTS_IMAGE_SIZE = 35;

  const commentsLoader = document.querySelector(`.comments-loader`);

  const onCommentsLoaderClick = () => {
    const bigPicture = document.querySelector(`.big-picture`);
    const bigPictureId = bigPicture.dataset.id;

    let bigPictureComments;
    for (let pictureComments of window.gallery.galleryData) {
      if (pictureComments.url === bigPictureId) {
        bigPictureComments = pictureComments.comments;
      }
    }

    const socialComments = document.querySelector(`.social__comments`);
    const socialCommentCount = document.querySelector(`.social__comment-count`);
    const shownCommentsCount = +socialCommentCount.innerHTML.split(` `)[0];

    let nextCommentsChunk = [];
    if (bigPictureComments.length - shownCommentsCount > COMMENTS_CHUNK) {
      nextCommentsChunk = bigPictureComments.slice(shownCommentsCount, shownCommentsCount + COMMENTS_CHUNK);
    } else {
      nextCommentsChunk = bigPictureComments.slice(shownCommentsCount, bigPictureComments.length);
      commentsLoader.classList.add(`hidden`);
      commentsLoader.removeEventListener(`click`, onCommentsLoaderClick);
    }

    renderBigPictureComments(nextCommentsChunk, socialComments);

    socialCommentCount.innerHTML = `${shownCommentsCount + nextCommentsChunk.length} из ${bigPictureComments.length} комментариев`;
  };

  const renderBigPicture = (photo, id) => {
    const bigPicture = document.querySelector(`.big-picture`);
    bigPicture.classList.remove(`hidden`);
    bigPicture.dataset.id = id;

    bigPicture.querySelector(`.big-picture__img img`).src = photo.url;
    bigPicture.querySelector(`.likes-count`).textContent = photo.likes;
    bigPicture.querySelector(`.social__comment-count`).innerHTML = `${photo.comments.length >= COMMENTS_CHUNK ? COMMENTS_CHUNK : photo.comments.length} из <span class="comments-count">${photo.comments.length}</span> комментариев`;
    bigPicture.querySelector(`.social__caption`).textContent = photo.description;

    bigPicture.querySelector(`.social__comments`).innerHTML = ``;

    let commentsSlice;
    if (photo.comments.length > COMMENTS_CHUNK) {
      commentsSlice = photo.comments.slice(0, COMMENTS_CHUNK);
      commentsLoader.addEventListener(`click`, onCommentsLoaderClick);
      commentsLoader.classList.remove(`hidden`);
    } else {
      commentsSlice = photo.comments;
      commentsLoader.classList.add(`hidden`);
    }

    renderBigPictureComments(commentsSlice, bigPicture.querySelector(`.social__comments`));

    const body = document.querySelector(`body`);
    body.classList.add(`modal-open`);
  };

  const renderBigPictureComments = (comments, mountingPoint) => {
    for (let i = 0; i < comments.length; i++) {
      const commentListItem = document.createElement(`li`);
      commentListItem.classList.add(`social__comment`);

      const commentImage = document.createElement(`img`);
      commentImage.src = comments[i].avatar;
      commentImage.alt = comments[i].name;
      commentImage.width = COMMENTS_IMAGE_SIZE;
      commentImage.height = COMMENTS_IMAGE_SIZE;
      commentImage.classList.add(`social__picture`);

      const commentText = document.createElement(`p`);
      commentText.classList.add(`social__text`);
      commentText.textContent = comments[i].message;

      commentListItem.appendChild(commentImage);
      commentListItem.appendChild(commentText);

      mountingPoint.appendChild(commentListItem);
    }
  };

  const hideBigPicture = () => {
    document.querySelector(`.big-picture`).classList.add(`hidden`);
    commentsLoader.removeEventListener(`click`, onCommentsLoaderClick);
  };

  const bigPictureCancel = document.querySelector(`.big-picture__cancel`);

  const onBigPictureCancelClick = () => {
    hideBigPicture();

    window.gallery.photosContainer.addEventListener(`click`, onPhotosContainerClick);
    bigPictureCancel.removeEventListener(`click`, onBigPictureCancelClick);
    document.removeEventListener(`keydown`, onBigPictureEscapePress);
  };

  const onBigPictureEscapePress = (evt) => {
    window.util.isEscEvent(evt, () => {
      evt.preventDefault();
      hideBigPicture();

      window.gallery.photosContainer.addEventListener(`click`, onPhotosContainerClick);
      bigPictureCancel.removeEventListener(`click`, onBigPictureCancelClick);
      document.removeEventListener(`keydown`, onBigPictureEscapePress);
    });
  };

  const openBigPicture = (id) => {
    let relevantPicture;
    for (let pic of window.gallery.galleryData) {
      if (pic.url === id) {
        relevantPicture = pic;
      }
    }
    window.picture.renderBigPicture(relevantPicture, id);
    window.gallery.photosContainer.removeEventListener(`click`, onPhotosContainerClick);
    bigPictureCancel.addEventListener(`click`, onBigPictureCancelClick);
    document.addEventListener(`keydown`, onBigPictureEscapePress);
  };

  const onPhotosContainerClick = (evt) => {
    if (evt.target.matches(`.picture__img`)) {
      openBigPicture(evt.target.parentElement.dataset.id);
    } else if (evt.target.matches(`.pictures a`)) {
      openBigPicture(evt.target.dataset.id);
    }
  };

  window.gallery.photosContainer.addEventListener(`click`, onPhotosContainerClick);

  window.picture = {
    renderBigPicture,
    onPhotosContainerClick
  };
})();
