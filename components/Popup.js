export default class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
    this._closePopupBtn = this._popupElement.querySelector(
      ".popup__close-button"
    );

    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.setEventListeners = this.setEventListeners.bind(this);
  }

  setEventListeners() {
    this._closePopupBtn.addEventListener("click", this.close);
  }

  open() {
    this._popupElement.classList.add("popup_opened");
  }

  close() {
    this._popupElement.classList.remove("popup_opened");
  }

  _handleEscKeyPress() {}
}
