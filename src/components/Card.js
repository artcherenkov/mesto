export default class Card {
  constructor(
    { data, isLiked, handleCardClick, handleDeleteClick, handleLikeClick },
    templateSelector
  ) {
    const { title, imageUrl, likes } = data;
    this._title = title;
    this._imageUrl = imageUrl;
    this._likes = likes;
    this._isLiked = isLiked;

    this._templateSelector = templateSelector;

    this._element = null;
    this._deleteBtn = null;
    this._likeBtn = null;
    this._cardImage = null;

    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
  }

  _setEventListeners() {
    this._deleteBtn.addEventListener("click", () => {
      this._handleDeleteClick();
      this._onCardDeletion();
    });
    this._likeBtn.addEventListener("click", () => {
      this._handleLikeClick(this._isLiked);
    });
    this._cardImage.addEventListener("click", () =>
      this._handleCardClick(this._title, this._imageUrl)
    );
  }

  _onCardDeletion() {
    this._element.remove();
  }

  setLike(newLikes = this._likes) {
    this._isLiked = true;
    this._likes = newLikes;
    this._likeBtn.classList.add("place__like-button_active");
    this._likeCounter.textContent = newLikes.length;
  }

  deleteLike(newLikes) {
    this._isLiked = false;
    this._likes = newLikes;
    this._likeBtn.classList.remove("place__like-button_active");
    this._likeCounter.textContent = newLikes.length;
  }

  _getTemplate() {
    return document
      .querySelector(this._templateSelector)
      .content.querySelector(".place")
      .cloneNode(true);
  }

  createCard() {
    this._element = this._getTemplate();
    this._likeCounter = this._element.querySelector(".place__like-counter");
    this._deleteBtn = this._element.querySelector(".place__delete-button");
    this._likeBtn = this._element.querySelector(".place__like-button");
    this._cardImage = this._element.querySelector(".place__image");

    this._setEventListeners();

    const imageElement = this._element.querySelector(".place__image");
    const placeTitleElement = this._element.querySelector(".place__title");

    imageElement.src = this._imageUrl;
    imageElement.alt = this._title;
    placeTitleElement.textContent = this._title;
    this._likeCounter.textContent = this._likes.length;
    if (this._isLiked) {
      this.setLike();
    }
    return this._element;
  }
}
