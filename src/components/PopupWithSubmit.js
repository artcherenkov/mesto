import Popup from "./Popup";

export default class PopupWithSubmit extends Popup {
  constructor(popupSelector) {
    super(popupSelector);

    this._buttonElement = this._popupElement.querySelector(
      ".popup__form-submit"
    );
    this._handleSubmitCallback = null;
  }

  setEventListeners() {
    super.setEventListeners();

    this._buttonElement.addEventListener("click", (evt) => {
      evt.preventDefault();
      this._handleSubmitCallback().then(() => this.close());
    });
  }

  setSubmitAction(cb) {
    this._handleSubmitCallback = cb;
  }
}
