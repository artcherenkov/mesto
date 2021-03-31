export default class FormValidator {
  constructor(selectors, formElement) {
    this._selectors = selectors;
    this._formElement = formElement;

    this._inputsList = Array.from(
      this._formElement.querySelectorAll(this._selectors.inputSelector)
    );
    this._buttonElement = this._formElement.querySelector(
      this._selectors.submitButtonSelector
    );
  }

  _setEventListeners() {
    this._formElement.addEventListener("submit", (evt) => evt.preventDefault());

    this._inputsList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => this._onInput(inputElement));
    });
  }

  _onInput(inputElement) {
    this._checkInputValidity(inputElement);
    this._toggleButtonState(this._inputsList, this._buttonElement);
  }

  _toggleButtonState(inputsList, buttonElement) {
    const shouldBeDisabled = this._hasInvalidInput(inputsList);

    buttonElement.disabled = shouldBeDisabled;
    if (shouldBeDisabled) {
      buttonElement.classList.add(this._selectors.inactiveButtonClass);
    } else {
      buttonElement.classList.remove(this._selectors.inactiveButtonClass);
    }
  }

  _checkInputValidity(inputElement) {
    if (inputElement.validity.valid) {
      this._hideInputError(inputElement);
    } else {
      this._showInputError(inputElement, inputElement.validationMessage);
    }
  }

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._selectors.inputErrorClass);
    errorElement.classList.remove(this._selectors.errorClass);
    errorElement.textContent = "";
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._selectors.inputErrorClass);
    errorElement.classList.add(this._selectors.errorClass);
    errorElement.textContent = errorMessage;
  }

  _hasInvalidInput(inputsList) {
    return inputsList.some((inputElement) => !inputElement.validity.valid);
  }

  enableValidation() {
    this._toggleButtonState(this._inputsList, this._buttonElement);
    this._setEventListeners();
  }

  resetValidationErrors() {
    this._formElement.reset();
    this._inputsList.forEach((inputElement) => this._hideInputError(inputElement));
    this._toggleButtonState(this._inputsList, this._buttonElement);
  }
}
