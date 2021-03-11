"use strict";

(function () {
  const popup = document.querySelector(".popup_action_edit-profile");
  const closePopupButton = popup.querySelector(".popup__close-button");
  const popupForm = popup.querySelector(".popup__form");
  const nameInput = popup.querySelector(".popup__form-input[name = name]");
  const descriptionInput = popup.querySelector(
    ".popup__form-input[name = description]"
  );

  const profile = document.querySelector(".profile");
  const editButton = profile.querySelector(".profile__edit-button");
  const profileName = profile.querySelector(".profile__name");
  const profileDescription = profile.querySelector(".profile__about");

  function onEditBtnClick() {
    nameInput.value = profileName.textContent.trim();
    descriptionInput.value = profileDescription.textContent.trim();
    onOpenPopup(popup);
  }

  function onPopupFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileDescription.textContent = descriptionInput.value;
    onClosePopup(popup);
  }

  function onClosePopup(popup) {
    popup.classList.remove("popup_opened");
  }

  function onOpenPopup(popup) {
    popup.classList.add("popup_opened");
  }

  editButton.addEventListener("click", onEditBtnClick);
  closePopupButton.addEventListener("click", onClosePopup.bind(null, popup));
  popupForm.addEventListener("submit", onPopupFormSubmit);

  window.popup = {
    onClosePopup,
    onOpenPopup,
  };
})();
