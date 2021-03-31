import { closePopup, openPopup } from "./index.js";

const popupElement = document.querySelector(".popup_type_fullscreen-image");
const closePopupButton = popupElement.querySelector(".popup__close-button");

export const onCardClick = (title, imageUrl) => {
  const imagePopupElement = document.querySelector(".popup_type_fullscreen-image");
  const imagePopupImageElement = imagePopupElement.querySelector(".popup__image");
  const imagePopupImageCaptionElement = imagePopupElement.querySelector(".popup__image-caption");

  imagePopupImageElement.src = imageUrl;
  imagePopupImageElement.alt = title;
  imagePopupImageCaptionElement.textContent = title;

  openPopup(imagePopupElement);
}

closePopupButton.addEventListener("click", () => closePopup(popupElement));
