import { openPopup } from "./_index.js";

export default class Card {
  constructor({ title, imageUrl }, templateSelector) {
    this._title = title;
    this._imageUrl = imageUrl;
    this._templateSelector = templateSelector;

    this._element = null;
  }

  _setEventListeners() {
    const placeDeleteButton = this._element.querySelector(".place__delete-button");
    const placeLikeButton = this._element.querySelector(".place__like-button");

    placeDeleteButton.addEventListener("click", () => this._onCardDeletion());
    placeLikeButton.addEventListener("click", () => this._onLikeClick());
    this._element.addEventListener("click", (evt) => this._onCardClick(evt))
  }

  _onCardDeletion() {
    this._element.remove();
  }

  _onLikeClick() {
    this._element
      .querySelector(".place__like-button")
      .classList.toggle("place__like-button_active");
  }

  _onCardClick(evt) {
    const placeDeleteButton = this._element.querySelector(".place__delete-button");
    const placeLikeButton = this._element.querySelector(".place__like-button");

    const imagePopupElement = document.querySelector(".popup_type_fullscreen-image");
    const imagePopupImageElement = imagePopupElement.querySelector(".popup__image");
    const imagePopupImageCaptionElement = imagePopupElement.querySelector(".popup__image-caption");

    if (evt.target !== placeLikeButton && evt.target !== placeDeleteButton) {
      imagePopupImageElement.src = this._imageUrl;
      imagePopupImageElement.alt = this._title;
      imagePopupImageCaptionElement.textContent = this._title;

      openPopup(imagePopupElement);
    }
  }

  _getTemplate() {
    return document
      .querySelector(this._templateSelector)
      .content.querySelector(".place")
      .cloneNode(true);
  }

  createCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    const imageElement = this._element.querySelector(".place__image");
    const placeTitleElement = this._element.querySelector(".place__title");

    imageElement.src = this._imageUrl;
    imageElement.alt = this._title;
    placeTitleElement.textContent = this._title;

    return this._element;
  }
}
