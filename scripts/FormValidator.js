export default class FormValidator {
  constructor(selectors) {
    this._selectors = selectors;
  }

  _setEventListeners(formElement) {
    const inputsList = Array.from(
      formElement.querySelectorAll(this._selectors.inputSelector)
    );

    const buttonElement = formElement.querySelector(
      this._selectors.submitButtonSelector
    );

    this._toggleButtonState(inputsList, buttonElement);

    inputsList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(formElement, inputElement);
        this._toggleButtonState(inputsList, buttonElement);
      });
    });
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

  _checkInputValidity(formElement, inputElement) {
    if (inputElement.validity.valid) {
      this._hideInputError(formElement, inputElement);
    } else {
      this._showInputError(formElement, inputElement, inputElement.validationMessage);
    }
  }

  _hideInputError(formElement, inputElement) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._selectors.inputErrorClass);
    errorElement.classList.remove(this._selectors.errorClass);
    errorElement.textContent = "";
  }

  _showInputError(formElement, inputElement, errorMessage) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._selectors.inputErrorClass);
    errorElement.classList.add(this._selectors.errorClass);
    errorElement.textContent = errorMessage;
  }

  _hasInvalidInput(inputsList) {
    return inputsList.some((inputElement) => !inputElement.validity.valid);
  }

  enableValidation() {
    const formList = Array.from(
      document.querySelectorAll(this._selectors.formSelector)
    );

    formList.forEach((formElement) => {
      formElement.addEventListener("submit", (evt) => {
        evt.preventDefault();
      });

      this._setEventListeners(formElement);
    });
  }

  resetValidationErrors(formElement) {
    formElement.reset();
    const inputsList = Array.from(formElement.querySelectorAll(this._selectors.inputSelector));
    const buttonElement = formElement.querySelector(this._selectors.submitButtonSelector);
    inputsList.forEach((inputElement) => this._hideInputError(formElement, inputElement));
    this._toggleButtonState(inputsList, buttonElement);
  }
}
