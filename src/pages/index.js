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
  submitDeletionSelector,
} from "../utils/constants.js";

import "./index.css";
import PopupWithSubmit from "../components/PopupWithSubmit";

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

// Инициализация попапа с подтверждением удаления
const submitPopup = new PopupWithSubmit(submitDeletionSelector);
submitPopup.setEventListeners();

// Инициализация попапа редактирования профиля
const onEditProfileFormSubmit = (formData) => {
  editProfilePopup.setLoading(true);
  api
    .editUserInfo(Adapter.adaptUserInfoToServer(formData))
    .then((info) => {
      userInfo.setUserInfo(Adapter.adaptUserInfoToClient(info));
      editProfilePopup.close();
    })
    .catch((err) => console.log(err))
    .finally(() => editProfilePopup.setLoading(false));
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
  addPlacePopup.setLoading(true);
  api
    .postCard(Adapter.adaptCardToServer(formData))
    .then((card) => {
      const cardElement = createCard(Adapter.adaptCardToClient(card));
      placesList.addItem(cardElement, "prepend");
    })
    .catch((err) => console.log(err))
    .finally(() => addPlacePopup.setLoading(false));
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
const onLikeClick = (data) => {
  return function (isLiked) {
    if (!isLiked) {
      api.setLike(data._id).then((data) => this.setLike(data.likes));
    } else {
      api.deleteLike(data._id).then((data) => this.deleteLike(data.likes));
    }
  };
};
const onDeleteClick = (data) => {
  return function () {
    submitPopup.open();
    submitPopup.setSubmitAction(() => {
      return api.deleteCard(data._id).then(() => this.removeCard());
    });
  };
};
const createCard = (data) => {
  const card = new Card(
    {
      data,
      isLiked: data.likes.some(
        (like) => like._id === userInfo.getUserInfo().id
      ),
      isMine: data.owner._id === userInfo.getUserInfo().id,
      handleCardClick: onCardClick(data),
      handleLikeClick: onLikeClick(data),
      handleDeleteClick: onDeleteClick(data),
    },
    cardTemplateSelector
  );
  return card.createCard();
};
const cardRenderer = (item) => {
  const cardElement = createCard(item);
  placesList.addItem(cardElement, "append");
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
