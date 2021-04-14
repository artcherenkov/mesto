export const imagePopupSelector = ".popup_type_fullscreen-image";
export const editProfilePopupSelector = ".popup_action_edit-profile";
export const addPlacePopupSelector = ".popup_action_add-place";

export const editProfileFormElement = document.querySelector(
  ".popup__form[name=user-info]"
);
export const editProfileInputsList = Array.from(
  editProfileFormElement.querySelectorAll(".popup__form-input")
);

export const addPlaceFormElement = document.querySelector(
  ".popup__form[name=add-place]"
);

export const placesListSelector = ".places__list";
export const cardTemplateSelector = "#place-card";

export const profileElement = document.querySelector(".profile");
export const profileNameSelector = ".profile__name";
export const profileInfoSelector = ".profile__about";
export const editProfileButtonElement = profileElement.querySelector(
  ".profile__edit-button"
);
export const addPlaceButtonElement = profileElement.querySelector(
  ".profile__add-button"
);

export const VALIDATION_CONFIG = {
  formSelector: ".popup__form",
  inputSelector: ".popup__form-input",
  submitButtonSelector: ".popup__form-submit",
  inactiveButtonClass: "popup__form-submit_disabled",
  inputErrorClass: "popup__form-input_type_error",
  errorClass: "popup__error_visible",
};

export const INITIAL_CARDS = [
  {
    id: 1,
    title: "Архыз",
    imageUrl:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    id: 2,
    title: "Челябинская область",
    imageUrl:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    id: 3,
    title: "Иваново",
    imageUrl:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    id: 4,
    title: "Камчатка",
    imageUrl:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    id: 5,
    title: "Холмогорский район",
    imageUrl:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    id: 6,
    title: "Байкал",
    imageUrl:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];
