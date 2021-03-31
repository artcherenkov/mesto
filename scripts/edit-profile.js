import { closePopup, openPopup } from "./index.js";
import FormValidator from "./FormValidator.js";
import { VALIDATION_CONFIG } from "./const.js";

const popupElement = document.querySelector(".popup_action_edit-profile");
const closePopupButton = popupElement.querySelector(".popup__close-button");
const popupFormElement = popupElement.querySelector(".popup__form");
const nameInput = popupElement.querySelector(".popup__form-input[name = name]");
const descriptionInput = popupElement.querySelector(".popup__form-input[name = description]");

const profile = document.querySelector(".profile");
const editButton = profile.querySelector(".profile__edit-button");
const profileName = profile.querySelector(".profile__name");
const profileDescription = profile.querySelector(".profile__about");

const formValidator = new FormValidator(VALIDATION_CONFIG)
formValidator.enableValidation();

function handleEditBtnClick() {
  formValidator.resetValidationErrors(popupFormElement);

  nameInput.value = profileName.textContent.trim();
  descriptionInput.value = profileDescription.textContent.trim();
  openPopup(popupElement);
}

function handlePopupFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  closePopup(popupElement);
}

editButton.addEventListener("click", handleEditBtnClick);
closePopupButton.addEventListener("click", () => closePopup(popupElement));
popupFormElement.addEventListener("submit", handlePopupFormSubmit);
