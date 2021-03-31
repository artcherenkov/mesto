import { INITIAL_CARDS } from "./data.js";
import Card from "./Card.js";

const cardTemplateSelector = "#place-card";

const placesListElement = document.querySelector(".places__list");

const renderCards = (cardsList) => {
  cardsList.forEach((c) => {
    const card = new Card(c, cardTemplateSelector);
    const cardElement = card.createCard();
    placesListElement.prepend(cardElement);
  });
};

renderCards(INITIAL_CARDS);
