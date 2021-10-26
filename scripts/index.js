//=============== Imports ===============//
import FormValidator from './FormValidator.js';
import {openPopup, closePopup} from './popup.js';
import {
  // elements
  cards,
  buttonOpenProfilePopup,
  buttonCloseProfilePopup,
  buttonOpenAddCardPopup,
  buttonCloseAddCardPopup,
  buttonCloseImagePreviewPopup,
  inputProfileNamePopup,
  inputProfileAboutPopup,
  inputCardTitlePopup,
  inputCardImageLinkPopup,
  profileName,
  profileAbout,
  popupProfile,
  popupProfileForm,
  popupAddCard,
  popupAddCardForm,
  popupImagePreview,
  // initial cards array
  initialCards,
  // form settings object
  settings
} from "./data.js";
import Card from "./Card.js";

//=============== Initialization ===============//
// Cards
initialCards.slice().reverse().forEach((card) => {
  addCard(card.name, card.link);
});
// Form validators
const profileFormValidator = new FormValidator(settings, popupProfileForm);
const addCardFormValidator = new FormValidator(settings, popupAddCardForm);
profileFormValidator.enableValidation();
addCardFormValidator.enableValidation();

//=============== Functions ===============//

function addCard(name, link) {
  cards.prepend(new Card(name, link, '#card-template').getElement());
}

// Listeners
buttonOpenProfilePopup.addEventListener('click', () => {
  profileFormValidator.resetValidation();
  inputProfileNamePopup.value = profileName.textContent;
  inputProfileAboutPopup.value = profileAbout.textContent;
  openPopup(popupProfile);
});
buttonCloseProfilePopup.addEventListener('click', () => closePopup(popupProfile));

buttonOpenAddCardPopup.addEventListener('click', () => {
  popupAddCardForm.reset();
  addCardFormValidator.resetValidation();
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
  closePopup(popupAddCard);
})




