import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, onFormSubmit, onFormReset) {
    super(popupSelector);

    this._formElement = this._popupElement.querySelector(".popup__form");
    this._inputsList = Array.from(
      this._formElement.querySelectorAll(".popup__form-input")
    );
    this._submitButtonElement = this._popupElement.querySelector(
      ".popup__form-submit"
    );

    this._formValues = {};

    this._onFormSubmit = onFormSubmit.bind(this);
    this._onFormReset = onFormReset.bind(this);
    this._getInputValues = this._getInputValues.bind(this);
  }

  setLoading() {
    this._submitButtonElement.textContent = "Сохранение...";
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._onFormSubmit(this._getInputValues());
    });
  }

  close() {
    super.close();
    this._onFormReset();
  }

  _getInputValues() {
    this._inputsList.forEach(
      (input) => (this._formValues[input.name] = input.value)
    );

    return this._formValues;
  }
}
