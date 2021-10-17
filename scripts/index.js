//=============== Imports ===============//
import {enableValidation, resetValidation, hasInvalidInput} from './validate.js';

//=============== Initialization ===============//
// Cards container =====
const cards = document.querySelector('.cards');
// Buttons =====
// popup profile buttons
const buttonOpenProfilePopup = document.querySelector('.profile__edit-button');
const buttonCloseProfilePopup = document.querySelector('.popup__close-button_type_profile');
// popup card-add buttons
const buttonOpenAddCardPopup = document.querySelector('.profile__add-button');
const buttonCloseAddCardPopup = document.querySelector('.popup__close-button_type_add-card');
// popup image-preview buttons
const buttonCloseImagePreviewPopup = document.querySelector('.popup__close-button_type_image-preview');
// Inputs =====
// popup profile inputs
const inputProfileNamePopup = document.querySelector('#profile-name-input');
const inputProfileAboutPopup = document.querySelector('#profile-about-input');
// popup card-add inputs
const inputCardTitlePopup = document.querySelector('#card-title-input');
const inputCardImageLinkPopup = document.querySelector('#card-image-link-input');

// Text elements =====
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');

// Popups =====
// popup profile
const popupProfile = document.querySelector('.popup_type_profile');
const popupProfileForm = document.querySelector('.popup__form_type_profile');
// popup add-card
const popupAddCard = document.querySelector('.popup_type_add-card');
const popupAddCardForm = document.querySelector('.popup__form_type_add-card');
// popup image-preview
const popupImagePreview = document.querySelector('.popup_type_image-preview');
const popupImagePreviewFigure = document.querySelector('figure');
// Templates =====
// template card
const templateCard = document.querySelector('#card-template').content;

// Settings
const settings = {
  formSelector: ".popup__form",
  fieldsetSelector: ".popup__fieldset",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit-button",
  inactiveButtonClass: "popup__submit-button_inactive",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active"
};
enableValidation(settings);

// Cards
const initialCards = [
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

initialCards.slice().reverse().forEach((card) => {
  addCard(card.name, card.link);
});

//=============== Functions ===============//
let downObj;
const overlayDown = (downEvt) => {
  downObj = downEvt.target;
};

const overlayUp = (upEvt) => {
  if (upEvt.target === downObj) closePopup(downObj);
};

const escClose = (e) => {
  if (e.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_open');
    closePopup(openedPopup);
  }
};

function openPopup(popup) {
  popup.addEventListener('mousedown', overlayDown);
  popup.addEventListener('mouseup', overlayUp);
  document.addEventListener('keydown', escClose);
  popup.classList.add('popup_open');
}

function closePopup(popup) {
  popup.removeEventListener('mousedown', overlayDown);
  popup.removeEventListener('mouseup', overlayUp);
  document.removeEventListener('keydown', escClose);
  popup.classList.remove('popup_open');
}

function addCard(name, link) {
  const newCard = templateCard.querySelector('.card').cloneNode(true);
  const newCardImage = newCard.querySelector('.card__image');
  newCardImage.alt = name;
  newCardImage.src = link;
  newCard.querySelector('.card__title').textContent = name;
  newCardImage.addEventListener('click', () => {
    const figureImage = popupImagePreviewFigure.querySelector('.popup__figure-image');
    const figureCaption = popupImagePreviewFigure.querySelector('.popup__figure-caption');
    figureImage.src = newCardImage.src;
    figureImage.alt = newCardImage.alt;
    figureCaption.textContent = newCardImage.alt;
    openPopup(popupImagePreview);
  });
  newCard.querySelector('.card__delete-button').addEventListener('click', () => {
    newCard.remove();
  });
  newCard.querySelector('.card__like-button').addEventListener('click', (e) => {
    e.target.classList.toggle('card__like-button_active');
  });
  cards.prepend(newCard);
}


// Listeners
buttonOpenProfilePopup.addEventListener('click', () => {
  resetValidation(popupProfileForm, settings);
  inputProfileNamePopup.value = profileName.textContent;
  inputProfileAboutPopup.value = profileAbout.textContent;
  openPopup(popupProfile);
});
buttonCloseProfilePopup.addEventListener('click', () => closePopup(popupProfile));

buttonOpenAddCardPopup.addEventListener('click', () => {
  popupAddCardForm.reset();
  resetValidation(popupAddCardForm, settings);
  openPopup(popupAddCard);
});
buttonCloseAddCardPopup.addEventListener('click', () => closePopup(popupAddCard));

buttonCloseImagePreviewPopup.addEventListener('click', () => closePopup(popupImagePreview));

popupProfileForm.addEventListener('submit', (e) => {
  e.preventDefault();
  profileName.textContent = inputProfileNamePopup.value;
  profileAbout.textContent = inputProfileAboutPopup.value;
  closePopup(popupProfile);

});
popupAddCardForm.addEventListener('submit', (e) => {
  e.preventDefault();
  addCard(inputCardTitlePopup.value, inputCardImageLinkPopup.value);
  inputCardTitlePopup.value = "";
  inputCardImageLinkPopup.value = "";
  closePopup(popupAddCard);
})

