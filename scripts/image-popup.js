"use strict";

(function () {
  const popupElement = document.querySelector(".popup_type_fullscreen-image");
  const closePopupButton = popupElement.querySelector(".popup__close-button");

  const { onClosePopup } = window.popup;

  closePopupButton.addEventListener("click", onClosePopup.bind(null, popupElement));
})();
