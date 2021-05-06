import Api from "../components/Api";
import Adapter from "../components/Adapter";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import {
  INITIAL_CARDS,
  VALIDATION_CONFIG,
  addPlaceButtonElement,
  addPlaceFormElement,
  addPlacePopupSelector,
  cardTemplateSelector,
  editProfileButtonElement,
  editProfileFormElement,
  editProfileInputsList,
  editProfilePopupSelector,
  imagePopupSelector,
  placesListSelector,
  profileInfoSelector,
  profileNameSelector,
} from "../utils/constants.js";

import "./index.css";

// Инициализация API
const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-23",
  headers: {
    authorization: "5a89c943-0743-4e83-b516-7727da7c758b",
    "Content-Type": "application/json",
  },
});

// Инициализация валидаторов
const editProfileValidator = new FormValidator(
  VALIDATION_CONFIG,
  editProfileFormElement
);
const addPlaceValidator = new FormValidator(
  VALIDATION_CONFIG,
  addPlaceFormElement
);
editProfileValidator.enableValidation();
addPlaceValidator.enableValidation();

// Инициализация информации о пользователе
let userInfo;
api.getUserInfo().then((data) => {
  userInfo = new UserInfo({
    data: Adapter.adaptUserInfoToClient(data),
    nameSelector: profileNameSelector,
    infoSelector: profileInfoSelector,
  });
});

// Инициализация попапа с изображением
const imagePopup = new PopupWithImage(imagePopupSelector);
imagePopup.setEventListeners();

// Инициализация попапа редактирования профиля
const onEditProfileFormSubmit = (formData) => {
  userInfo.setUserInfo(formData);
};
const onEditProfileFormReset = () => {
  editProfileValidator.resetValidationErrors();
};
const editProfilePopup = new PopupWithForm(
  editProfilePopupSelector,
  onEditProfileFormSubmit,
  onEditProfileFormReset
);
editProfilePopup.setEventListeners();

// Инициализация попапа добавления места
const onAddPlaceFormSubmit = (formData) => {
  const cardElement = createCard(formData);
  placesList.addItem(cardElement, "prepend");
};
const onAddPlaceFormReset = () => {
  addPlaceValidator.resetValidationErrors();
};
const addPlacePopup = new PopupWithForm(
  addPlacePopupSelector,
  onAddPlaceFormSubmit,
  onAddPlaceFormReset
);
addPlacePopup.setEventListeners();

// Инициализация списка карточек
let placesList;
const onCardClick = (data) => () => imagePopup.open(data);
const createCard = (data) => {
  const card = new Card(
    {
      data,
      handleCardClick: onCardClick(data),
      handleLikeClick: () => {
        api
          .setLike(data._id)
          .then((data) => card.toggleLike(data.likes.length));
      },
      handleDeleteClick: () => {
        console.log("delete clicked");
      },
    },
    cardTemplateSelector
  );
  return card.createCard();
};
const cardRenderer = (item) => {
  const cardElement = createCard(item);
  placesList.addItem(cardElement, "prepend");
};
api.getInitialCards().then((cards) => {
  const adaptedCards = cards.map((card) => Adapter.adaptCardToClient(card));
  placesList = new Section(
    {
      items: adaptedCards,
      renderer: cardRenderer,
    },
    placesListSelector
  );
  placesList.renderItems();
});

// Объявление обработчиков кнопок открытия попапов
const onEditProfileButtonClick = () => {
  const dataToFill = userInfo.getUserInfo();
  editProfilePopup.open();
  editProfileInputsList.forEach(
    (input) => (input.value = dataToFill[input.name])
  );
};
const onAddPlaceButtonClick = () => {
  addPlacePopup.open();
};

// Навешивание обработчиков кнопкам
editProfileButtonElement.addEventListener("click", onEditProfileButtonClick);
addPlaceButtonElement.addEventListener("click", onAddPlaceButtonClick);
