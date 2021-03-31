import { closePopup, openPopup } from './index.js';
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import { VALIDATION_CONFIG } from "./const.js";

const popupElement = document.querySelector(".popup_action_add-place");
const closePopupButton = popupElement.querySelector(".popup__close-button");
const popupFormElement = popupElement.querySelector(".popup__form");
const placeNameInput = popupElement.querySelector(".popup__form-input[name = place-name]");
const imageLinkInput = popupElement.querySelector(".popup__form-input[name = image-link]");

const profileElement = document.querySelector(".profile");
const addPlaceButton = profileElement.querySelector(".profile__add-button");

const placesListElement = document.querySelector(".places__list");

const formValidator = new FormValidator(VALIDATION_CONFIG)
formValidator.enableValidation();

function handleFormSubmit(evt) {
  evt.preventDefault();

  const title = placeNameInput.value;
  const imageUrl = imageLinkInput.value;

  const card = new Card({title, imageUrl}, '#place-card');
  const placeElement = card.createCard();
  placesListElement.prepend(placeElement);

  evt.target.reset();
  closePopup(popupElement);
}

closePopupButton.addEventListener("click", () => closePopup(popupElement));
addPlaceButton.addEventListener("click", () => {
  formValidator.resetValidationErrors(popupFormElement);
  openPopup(popupElement);
});
popupFormElement.addEventListener("submit", handleFormSubmit);
