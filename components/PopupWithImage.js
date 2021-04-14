import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);

    this._imageElement = this._popupElement.querySelector(".popup__image");
    this._captionElement = this._popupElement.querySelector(
      ".popup__image-caption"
    );
  }

  open({ title, imageUrl }) {
    this._imageElement.src = imageUrl;
    this._imageElement.alt = title;
    this._captionElement.textContent = title;

    super.open();
  }
}
