import { INITIAL_CARDS } from "./data.js";
import Card from "./Card.js";
const OPENED_POPUP_CLASS = "popup_opened";

const cardTemplateSelector = "#place-card";
const placesListElement = document.querySelector(".places__list");

function handleEscKeyPress(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
  }
}

function handleOutsideClick(evt) {
  if (evt.target.classList.contains(OPENED_POPUP_CLASS)) {
    closePopup(evt.target);
  }
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

export const closePopup = (popupElement) => {
  popupElement.classList.remove(OPENED_POPUP_CLASS);
  removeCloseHandlers(popupElement);
}

export const openPopup = (popupElement) => {
  popupElement.classList.add(OPENED_POPUP_CLASS);
  setCloseHandlers(popupElement);
}

const renderCards = (cardsList) => {
  cardsList.forEach((c) => {
    const card = new Card(c, cardTemplateSelector);
    const cardElement = card.createCard();
    placesListElement.prepend(cardElement);
  });
};

renderCards(INITIAL_CARDS);
