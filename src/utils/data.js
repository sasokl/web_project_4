//=============== Selectors ===============//

// User
export const profileNameSelector = '.profile__name';
export const profileAboutSelector = '.profile__about';
export const profileAvatarImageSelector = '.profile__avatar-image';
// Cards
export const cardsSelector = '.cards';
export const cardTemplateSelector = '#card-template';

// Popups
export const popupProfileSelector = '.popup_type_profile';
export const popupAvatarSelector = '.popup_type_avatar';
export const popupAddCardSelector = '.popup_type_add-card';
export const popupDeleteCardSelector = '.popup_type_delete-card';
export const popupImagePreviewSelector = '.popup_type_image-preview';

// Buttons
export const popupCloseButtonSelector = '.popup__close-button';
export const popupSubmitButtonSelector = '.popup__submit-button';

//=============== Classes ===============//

// Popups
export const popupOpenClass = 'popup_open';

//=============== Elements ===============//

// Buttons =====
// popup profile button
export const buttonOpenProfilePopup = document.querySelector('.profile__edit-button');
// popup add-card button
export const buttonOpenAddCardPopup = document.querySelector('.profile__add-button');
// popup avatar-edit button
export const buttonOpenAvatarEditPopup = document.querySelector('.profile__avatar');

// Inputs =====
// popup profile inputs
export const inputProfileNamePopup = document.querySelector('#profile-name-input');
export const inputProfileAboutPopup = document.querySelector('#profile-about-input');

// Popups =====
// popup profile
export const popupProfileForm = document.querySelector('.popup__form_type_profile');
// popup profile
export const popupAvatarForm = document.querySelector('.popup__form_type_avatar');
// popup add-card
export const popupAddCardForm = document.querySelector('.popup__form_type_add-card');

// popup image-preview
export const popupImagePreview = document.querySelector('.popup_type_image-preview');
export const figureImage = document.querySelector('.popup__figure-image');
export const figureCaption = document.querySelector('.popup__figure-caption');

//=============== Api Settings ===============//

export const apiSettings = {
  baseUrl: "https://around.nomoreparties.co/v1/group-12",
  headers: {
        authorization: "8595ca8e-a8f6-4218-b31d-c12a79561de8",
        'Content-Type': 'application/json'
  },
}
//=============== Form settings object ===============//

export const settings = {
  formSelector: ".popup__form",
  fieldsetSelector: ".popup__fieldset",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit-button",
  inactiveButtonClass: "popup__submit-button_inactive",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active"
};