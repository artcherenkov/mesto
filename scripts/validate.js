"use strict";

(function () {
  function enableValidation(selectors) {
    if (!enableValidation.selectors) {
      enableValidation.selectors = selectors;
    }

    const formList = Array.from(
      document.querySelectorAll(selectors.formSelector)
    );

    formList.forEach((formElement) => {
      formElement.addEventListener("submit", (evt) => {
        evt.preventDefault();
      });

      setEventListeners(formElement);
    });
  }

  function setEventListeners(formElement) {
    const selectors = enableValidation.selectors;

    const inputsList = Array.from(
      formElement.querySelectorAll(selectors.inputSelector)
    );

    const buttonElement = formElement.querySelector(
      selectors.submitButtonSelector
    );

    toggleButtonState(inputsList, buttonElement);

    inputsList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        checkInputValidity(formElement, inputElement);
        toggleButtonState(inputsList, buttonElement);
      });
    });
  }

  function toggleButtonState(inputsList, buttonElement) {
    const selectors = enableValidation.selectors;

    const shouldBeDisabled = hasInvalidInput(inputsList);

    buttonElement.disabled = shouldBeDisabled;
    if (shouldBeDisabled) {
      buttonElement.classList.add(selectors.inactiveButtonClass);
    } else {
      buttonElement.classList.remove(selectors.inactiveButtonClass);
    }
  }

  function checkInputValidity(formElement, inputElement) {
    if (inputElement.validity.valid) {
      hideInputError(formElement, inputElement);
    } else {
      showInputError(formElement, inputElement, inputElement.validationMessage);
    }
  }

  function hideInputError(formElement, inputElement) {
    const selectors = enableValidation.selectors;

    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(selectors.inputErrorClass);
    errorElement.classList.remove(selectors.errorClass);
    errorElement.textContent = "";
  }

  function showInputError(formElement, inputElement, errorMessage) {
    const selectors = enableValidation.selectors;

    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(selectors.inputErrorClass);
    errorElement.classList.add(selectors.errorClass);
    errorElement.textContent = errorMessage;
  }

  function hasInvalidInput(inputsList) {
    return inputsList.some((inputElement) => !inputElement.validity.valid);
  }

  enableValidation({
    formSelector: ".popup__form",
    inputSelector: ".popup__form-input",
    submitButtonSelector: ".popup__form-submit",
    inactiveButtonClass: "popup__form-submit_disabled",
    inputErrorClass: "popup__form-input_type_error",
    errorClass: "popup__error_visible",
  });
})();
