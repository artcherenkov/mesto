export default class Card {
  constructor(data, templateSelector, onCardClick) {
    const { title, imageUrl } = data;
    this._title = title;
    this._imageUrl = imageUrl;
    this._templateSelector = templateSelector;

    this._element = null;
    this._deleteBtn = null;
    this._likeBtn = null;

    this._onCardClick = onCardClick;
  }

  _setEventListeners() {
    const imageElement = this._element.querySelector(".place__image");
    this._deleteBtn.addEventListener("click", () => this._onCardDeletion());
    this._likeBtn.addEventListener("click", () => this._onLikeClick());
    imageElement.addEventListener("click", () =>
      this._onCardClick(this._title, this._imageUrl)
    );
  }

  _onCardDeletion() {
    this._element.remove();
  }

  _onLikeClick() {
    this._likeBtn.classList.toggle("place__like-button_active");
  }

  _getTemplate() {
    return document
      .querySelector(this._templateSelector)
      .content.querySelector(".place")
      .cloneNode(true);
  }

  createCard() {
    this._element = this._getTemplate();
    this._deleteBtn = this._element.querySelector(".place__delete-button");
    this._likeBtn = this._element.querySelector(".place__like-button");
    this._setEventListeners();

    const imageElement = this._element.querySelector(".place__image");
    const placeTitleElement = this._element.querySelector(".place__title");

    imageElement.src = this._imageUrl;
    imageElement.alt = this._title;
    placeTitleElement.textContent = this._title;

    return this._element;
  }
}
