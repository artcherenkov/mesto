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
