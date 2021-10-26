//=============== Elements ===============//
// Cards container =====
export const cards = document.querySelector('.cards');
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
// popup card-add inputs
export const inputCardTitlePopup = document.querySelector('#card-title-input');
export const inputCardImageLinkPopup = document.querySelector('#card-image-link-input');

// Text elements =====
export const profileName = document.querySelector('.profile__name');
export const profileAbout = document.querySelector('.profile__about');

// Popups =====
// popup profile
export const popupProfile = document.querySelector('.popup_type_profile');
export const popupProfileForm = document.querySelector('.popup__form_type_profile');
// popup add-card
export const popupAddCard = document.querySelector('.popup_type_add-card');
export const popupAddCardForm = document.querySelector('.popup__form_type_add-card');

// popup image-preview
export const popupImagePreview = document.querySelector('.popup_type_image-preview');
export const popupImagePreviewFigure = document.querySelector('.popup__figure');
export const figureImage = popupImagePreviewFigure.querySelector('.popup__figure-image');
export const figureCaption = popupImagePreviewFigure.querySelector('.popup__figure-caption');

//=============== Initial cards array ===============//
export const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://code.s3.yandex.net/web-code/yosemite.jpg"
  },
  {
    name: "Lake Louise",
    link: "https://code.s3.yandex.net/web-code/lake-louise.jpg"
  },
  {
    name: "Bald Mountains",
    link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg"
  },
  {
    name: "Latemar",
    link: "https://code.s3.yandex.net/web-code/latemar.jpg"
  },
  {
    name: "Vanoise National Park",
    link: "https://code.s3.yandex.net/web-code/vanoise.jpg"
  },
  {
    name: "Lago di Braies",
    link: "https://code.s3.yandex.net/web-code/lago.jpg"
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