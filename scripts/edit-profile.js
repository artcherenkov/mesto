'use strict';

(function(){
  const popup = document.querySelector('.popup');
  const closePopupButton = popup.querySelector('.popup__close-button');
  const popupForm = popup.querySelector('.popup__form');
  const nameInput = popup.querySelector('.popup__form-input[name = name]');
  const descriptionInput = popup.querySelector('.popup__form-input[name = description]');

  const profile = document.querySelector('.profile');
  const editButton = profile.querySelector('.profile__edit-button');
  const profileName = profile.querySelector('.profile__name');
  const profileDescription = profile.querySelector('.profile__about');

  const onEditBtnClick = () => {
    nameInput.value = profileName.textContent.trim();
    descriptionInput.value = profileDescription.textContent.trim();
    popup.classList.add('popup_opened');
  };

  const onClosePopup = () => popup.classList.remove('popup_opened');

  const onPopupFormSubmit = (evt) => {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileDescription.textContent = descriptionInput.value;
    onClosePopup();
  }

  editButton.addEventListener('click', onEditBtnClick);
  closePopupButton.addEventListener('click', onClosePopup);
  popupForm.addEventListener('submit', onPopupFormSubmit);
})();
