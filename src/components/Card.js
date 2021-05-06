export default class Card {
  constructor(
    { data, handleCardClick, handleDeleteClick, handleLikeClick },
    templateSelector
  ) {
    const { title, imageUrl, likes } = data;
    this._title = title;
    this._imageUrl = imageUrl;
    this._likes = likes;
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
      this._handleLikeClick();
    });
    this._cardImage.addEventListener("click", () =>
      this._handleCardClick(this._title, this._imageUrl)
    );
  }

  _onCardDeletion() {
    this._element.remove();
  }

  toggleLike(likesCount) {
    this._likeBtn.classList.toggle("place__like-button_active");
    this._likeCounter.textContent = likesCount;
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

    return this._element;
  }
}
