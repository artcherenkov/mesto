"use strict";

(function () {
  const popup = document.querySelector(".popup_action_edit-profile");
  const closePopupButton = popup.querySelector(".popup__close-button");
  const popupForm = popup.querySelector(".popup__form");
  const nameInput = popup.querySelector(".popup__form-input[name = name]");
  const descriptionInput = popup.querySelector(".popup__form-input[name = description]");

  const profile = document.querySelector(".profile");
  const editButton = profile.querySelector(".profile__edit-button");
  const profileName = profile.querySelector(".profile__name");
  const profileDescription = profile.querySelector(".profile__about");

  function handleEditBtnClick() {
    nameInput.value = profileName.textContent.trim();
    descriptionInput.value = profileDescription.textContent.trim();
    window.popup.openPopup(popup);
  }

  function handlePopupFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileDescription.textContent = descriptionInput.value;
    window.popup.closePopup(popup);
  }

  editButton.addEventListener("click", handleEditBtnClick);
  closePopupButton.addEventListener("click", () => window.popup.closePopup(popup));
  popupForm.addEventListener("submit", handlePopupFormSubmit);
})();
