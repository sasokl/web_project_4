//=============== Selectors ===============//

// User
export const profileNameSelector = '.profile__name';
export const profileAboutSelector = '.profile__about';
// Cards
export const cardsSelector = '.cards';
export const cardTemplateSelector = '#card-template';

// Popups
export const popupProfileSelector = '.popup_type_profile';
export const popupAddCardSelector = '.popup_type_add-card';
export const popupImagePreviewSelector = '.popup_type_image-preview';

export const popupCloseButtonSelector = '.popup__close-button';

//=============== Classes ===============//

// Popups
export const popupOpenClass = 'popup_open';

//=============== Elements ===============//

// Buttons =====
// popup profile buttons
export const buttonOpenProfilePopup = document.querySelector('.profile__edit-button');
export const buttonCloseProfilePopup = document.querySelector('.popup__close-button_type_profile');
// popup card-add buttons
export const buttonOpenAddCardPopup = document.querySelector('.profile__add-button');
export const buttonCloseAddCardPopup = document.querySelector('.popup__close-button_type_add-card');
// popup image-preview buttons
export const buttonCloseImagePreviewPopup = document.querySelector('.popup__close-button_type_image-preview');

// Inputs =====
// popup profile inputs
export const inputProfileNamePopup = document.querySelector('#profile-name-input');
export const inputProfileAboutPopup = document.querySelector('#profile-about-input');

// Popups =====
// popup profile
export const popupProfileForm = document.querySelector('.popup__form_type_profile');
// popup add-card
export const popupAddCardForm = document.querySelector('.popup__form_type_add-card');

// popup image-preview
export const popupImagePreview = document.querySelector('.popup_type_image-preview');
export const figureImage = document.querySelector('.popup__figure-image');
export const figureCaption = document.querySelector('.popup__figure-caption');

//=============== Initial cards array ===============//

export const initialCards = [
  {
    text: "Yosemite Valley",
    imageLink: "https://code.s3.yandex.net/web-code/yosemite.jpg"
  },
  {
    text: "Lake Louise",
    imageLink: "https://code.s3.yandex.net/web-code/lake-louise.jpg"
  },
  {
    text: "Bald Mountains",
    imageLink: "https://code.s3.yandex.net/web-code/bald-mountains.jpg"
  },
  {
    text: "Latemar",
    imageLink: "https://code.s3.yandex.net/web-code/latemar.jpg"
  },
  {
    text: "Vanoise National Park",
    imageLink: "https://code.s3.yandex.net/web-code/vanoise.jpg"
  },
  {
    text: "Lago di Braies",
    imageLink: "https://code.s3.yandex.net/web-code/lago.jpg"
  }
];

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