"use strict";

(function () {
  const OPENED_POPUP_CLASS = "popup_opened";

  function handleEscKeyPress(evt) {
    if (evt.key === "Escape") {
      const openedPopup = document.querySelector('.popup_opened');
      closePopup(openedPopup);
    }
  }

  function handleOutsideClick(evt) {
    if (evt.target.classList.contains(OPENED_POPUP_CLASS)) {
      closePopup(evt.target);
    }
  }

  function closePopup(popupElement) {
    popupElement.classList.remove(OPENED_POPUP_CLASS);
    removeCloseHandlers(popupElement);
  }

  function openPopup(popupElement) {
    popupElement.classList.add(OPENED_POPUP_CLASS);
    setCloseHandlers(popupElement);
  }

  function setCloseHandlers(popupElement) {
    document.addEventListener("keydown", handleEscKeyPress);
    popupElement.addEventListener("click", handleOutsideClick);
  }

  function removeCloseHandlers(popupElement) {
    document.removeEventListener("keydown", handleEscKeyPress);
    popupElement.removeEventListener("click", handleOutsideClick);
  }

  window.enableValidation({
    formSelector: ".popup__form",
    inputSelector: ".popup__form-input",
    submitButtonSelector: ".popup__form-submit",
    inactiveButtonClass: "popup__form-submit_disabled",
    inputErrorClass: "popup__form-input_type_error",
    errorClass: "popup__error_visible",
  });

  window.popup = { closePopup, openPopup };
})();