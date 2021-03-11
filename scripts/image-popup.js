"use strict";

(function () {
  const popupElement = document.querySelector(".popup_type_fullscreen-image");
  const closePopupButton = popupElement.querySelector(".popup__close-button");

  const { closePopup } = window.popup;

  closePopupButton.addEventListener("click", () => closePopup(popupElement));
})();
