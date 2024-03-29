import Popup from "./Popup";

export default class PopupWithSubmit extends Popup {
  constructor(popupSelector) {
    super(popupSelector);

    this._buttonElement = this._popupElement.querySelector(
      ".popup__form-submit"
    );
    this._handleSubmitCallback = null;
  }

  setLoading(isLoading) {
    if (isLoading) {
      this._buttonElement.textContent = "Удаление...";
    } else {
      this._buttonElement.textContent = "Да";
    }
  }

  setEventListeners() {
    super.setEventListeners();

    this._buttonElement.addEventListener("click", (evt) => {
      evt.preventDefault();
      this.setLoading(true);
      this._handleSubmitCallback()
        .then(() => this.close())
        .catch((err) => console.log(err))
        .finally(() => this.setLoading(false));
    });
  }

  setSubmitAction(cb) {
    this._handleSubmitCallback = cb;
  }
}
