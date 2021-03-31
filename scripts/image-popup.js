import { closePopup } from "./index.js";

const popupElement = document.querySelector(".popup_type_fullscreen-image");
const closePopupButton = popupElement.querySelector(".popup__close-button");

closePopupButton.addEventListener("click", () => closePopup(popupElement));
