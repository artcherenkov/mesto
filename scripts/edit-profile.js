"use strict";

(function () {
  const popupElement = document.querySelector(".popup_action_edit-profile");
  const closePopupButton = popupElement.querySelector(".popup__close-button");
  const popupForm = popupElement.querySelector(".popup__form");
  const nameInput = popupElement.querySelector(".popup__form-input[name = name]");
  const descriptionInput = popupElement.querySelector(".popup__form-input[name = description]");

  const profile = document.querySelector(".profile");
  const editButton = profile.querySelector(".profile__edit-button");
  const profileName = profile.querySelector(".profile__name");
  const profileDescription = profile.querySelector(".profile__about");

  function handleEditBtnClick() {
    const popupFormElement = popupElement.querySelector('.popup__form');
    window.resetForm(popupFormElement);

    nameInput.value = profileName.textContent.trim();
    descriptionInput.value = profileDescription.textContent.trim();
    window.popup.openPopup(popupElement);
  }

  function handlePopupFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileDescription.textContent = descriptionInput.value;
    window.popup.closePopup(popupElement);
  }

  editButton.addEventListener("click", handleEditBtnClick);
  closePopupButton.addEventListener("click", () => window.popup.closePopup(popupElement));
  popupForm.addEventListener("submit", handlePopupFormSubmit);
})();
