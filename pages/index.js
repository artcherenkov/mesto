import { INITIAL_CARDS } from "../scripts/data.js";
import Card from "../components/Card.js";
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

export const closePopup = (popupElement) => {
  popupElement.classList.remove(OPENED_POPUP_CLASS);
  removeCloseHandlers(popupElement);
}

export const openPopup = (popupElement) => {
  popupElement.classList.add(OPENED_POPUP_CLASS);
  setCloseHandlers(popupElement);
}

export const handleCardClick = (title, imageUrl) => {
  const imagePopupElement = document.querySelector(".popup_type_fullscreen-image");
  const imagePopupImageElement = imagePopupElement.querySelector(".popup__image");
  const imagePopupImageCaptionElement = imagePopupElement.querySelector(".popup__image-caption");

  imagePopupImageElement.src = imageUrl;
  imagePopupImageElement.alt = title;
  imagePopupImageCaptionElement.textContent = title;

  openPopup(imagePopupElement);
}

export const createCard = (data) => {
  const card = new Card(data, cardTemplateSelector, handleCardClick);
  return card.createCard();
}

const renderCards = (cardsList) => {
  cardsList.forEach((card) => {
    const cardElement = createCard(card);
    placesListElement.prepend(cardElement);
  });
};

renderCards(INITIAL_CARDS);
