"use strict";

(function () {
  const INITIAL_CARDS = [
    {
      id: 1,
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      id: 2,
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      id: 3,
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      id: 4,
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      id: 5,
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      id: 6,
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];

  const popupElement = document.querySelector(".popup_action_add-place");
  const closePopupButton = popupElement.querySelector(".popup__close-button");
  const popupFormElement = popupElement.querySelector(".popup__form");
  const placeNameInput = popupElement.querySelector(".popup__form-input[name = place-name]");
  const imageLinkInput = popupElement.querySelector(".popup__form-input[name = image-link]");

  const profileElement = document.querySelector(".profile");
  const addPlaceButton = profileElement.querySelector(".profile__add-button");

  const placesListElement = document.querySelector(".places__list");

  const placeCardTemplate = document.getElementById("place-card").content;

  const imagePopupElement = document.querySelector('.popup_type_fullscreen-image');
  const imagePopupImageElement = imagePopupElement.querySelector('.popup__image');
  const imagePopupImageCaptionElement = imagePopupElement.querySelector('.popup__image-caption');

  const { closePopup, openPopup } = window.popup;

  function createCardElement(title, link) {
    const placeCardElement = placeCardTemplate
      .querySelector(".place")
      .cloneNode(true);
    const imageElement = placeCardElement.querySelector(".place__image");
    const placeTitleElement = placeCardElement.querySelector(".place__title");
    const placeDeleteButton = placeCardElement.querySelector('.place__delete-button');
    const placeLikeButton = placeCardElement.querySelector('.place__like-button');

    imageElement.src = link;
    imageElement.alt = title;
    placeTitleElement.textContent = title;

    placeDeleteButton.addEventListener("click", handleCardDeletion);
    placeCardElement.addEventListener("click", (evt) => {
      if (evt.target !== placeLikeButton && evt.target !== placeDeleteButton) {
        imagePopupImageElement.src = link;
        imagePopupImageElement.alt = title;
        imagePopupImageCaptionElement.textContent = title;

        openPopup(imagePopupElement);
      }
    });
    placeLikeButton.addEventListener("click", () => placeLikeButton.classList.toggle('place__like-button_active'));

    return placeCardElement;
  }

  function renderCard(container) {
    return function (card) {
      const cardElement = createCardElement(card.name, card.link);
      container.prepend(cardElement);
    }
  }
  function renderCards() {
    const cardsToRenderFragment = document.createDocumentFragment();

    INITIAL_CARDS.forEach(renderCard(cardsToRenderFragment));

    placesListElement.append(cardsToRenderFragment);
  }

  function handleCardDeletion(evt) {
    const cardToDeleteElement = evt.target.closest('.place');
    cardToDeleteElement.remove();
  }
  function handleFormSubmit(evt) {
    evt.preventDefault();

    const title = placeNameInput.value;
    const imageLink = imageLinkInput.value;

    const placeElement = createCardElement(title, imageLink);
    placesListElement.append(placeElement);

    evt.target.reset();
    closePopup(popupElement);
  }

  closePopupButton.addEventListener("click", () => closePopup(popupElement));
  addPlaceButton.addEventListener("click", () => openPopup(popupElement));
  popupFormElement.addEventListener("submit", handleFormSubmit);

  renderCards();
})();
