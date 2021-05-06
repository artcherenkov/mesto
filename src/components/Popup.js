export default class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
    this._closePopupBtn = this._popupElement.querySelector(
      ".popup__close-button"
    );

    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.setEventListeners = this.setEventListeners.bind(this);
    this.setCloseHandlers = this.setCloseHandlers.bind(this);
    this.removeCloseHandlers = this.removeCloseHandlers.bind(this);
    this._handleEscKeyPress = this._handleEscKeyPress.bind(this);
    this._handleOutsideClick = this._handleOutsideClick.bind(this);
  }

  setLoading(isLoading) {}

  setEventListeners() {
    this._closePopupBtn.addEventListener("click", this.close);
  }

  open() {
    this._popupElement.classList.add("popup_opened");
    this.setCloseHandlers();
  }

  close() {
    this._popupElement.classList.remove("popup_opened");
    this.removeCloseHandlers();
  }

  _handleEscKeyPress(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  _handleOutsideClick(evt) {
    if (evt.target.classList.contains("popup_opened")) {
      this.close();
    }
  }

  setCloseHandlers() {
    document.addEventListener("keydown", this._handleEscKeyPress);
    this._popupElement.addEventListener("click", this._handleOutsideClick);
  }

  removeCloseHandlers() {
    document.removeEventListener("keydown", this._handleEscKeyPress);
    this._popupElement.removeEventListener("click", this._handleOutsideClick);
  }
}
