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
const userInfo = new UserInfo({
  nameSelector: profileNameSelector,
  infoSelector: profileInfoSelector,
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
  placesList.addItem(cardElement);
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
const onCardClick = (data) => () => imagePopup.open(data);
const createCard = (data) => {
  const card = new Card(data, cardTemplateSelector, onCardClick(data));
  return card.createCard();
};
const cardRenderer = (item) => {
  const cardElement = createCard(item);
  placesList.addItem(cardElement);
};
const placesList = new Section(
  {
    items: INITIAL_CARDS,
    renderer: cardRenderer,
  },
  placesListSelector
);
placesList.renderItems();

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
