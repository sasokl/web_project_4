//=============== Imports ===============//
import FormValidator from './components/FormValidator.js';
import {
    // selectors
    cardsSelector,
    cardTemplateSelector,
    profileNameSelector,
    profileAboutSelector,
    popupProfileSelector,
    popupAddCardSelector,
    popupImagePreviewSelector,
    // elements
    buttonOpenProfilePopup,
    buttonCloseProfilePopup,
    buttonOpenAddCardPopup,
    buttonCloseAddCardPopup,
    buttonCloseImagePreviewPopup,
    inputProfileNamePopup,
    inputProfileAboutPopup,
    popupProfileForm,
    popupAddCardForm,
    // initial cards array
    initialCards,
    // form settings object
    settings,
} from "./data.js";
import Card from "./components/Card.js";
import Section from "./components/Section.js";
import PopupWithForm from "./components/PopupWithForm.js";
import UserInfo from "./components/UserInfo.js";
import PopupWithImage from "./components/PopupWithImage.js";

//=============== Initialization ===============//

// User info
const userInfo = new UserInfo({
  nameSelector: profileNameSelector,
  jobSelector: profileAboutSelector
});

// Popups
const imagePreviewPopup = new PopupWithImage(popupImagePreviewSelector);
imagePreviewPopup.setEventListeners();

const profilePopup = new PopupWithForm(
    popupProfileSelector,
    (inputs) => {
      userInfo.setUserInfo(inputs['name'],inputs['about']);
    }
)
profilePopup.setEventListeners();

const addCardPopup = new PopupWithForm(
    popupAddCardSelector,
    (inputs) => {
      const card = new Card(
          inputs['card-title'],
          inputs['card-image-link'],
          cardTemplateSelector,
          () => {
              imagePreviewPopup.open({
                  text: inputs['card-title'],
                  imageLink: inputs['card-image-link']
              });
          });
      cardsList.addItem(card.getElement());
    }
)
addCardPopup.setEventListeners();

// Cards
const cardsList = new Section(
    {
        items: initialCards,
        renderer: (item) => {
            const card = new Card(
                item.text,
                item.imageLink,
                cardTemplateSelector,
                () => {
                    imagePreviewPopup.open({
                        text: item.text,
                        imageLink: item.imageLink
                    })
                });
            cardsList.addItem(card.getElement());
        }
    }, cardsSelector);
cardsList.renderItems();

// Form validators
const profileFormValidator = new FormValidator(settings, popupProfileForm);
const addCardFormValidator = new FormValidator(settings, popupAddCardForm);
profileFormValidator.enableValidation();
addCardFormValidator.enableValidation();

//=============== Functions ===============//

// Listeners
buttonOpenProfilePopup.addEventListener('click', () => {
  profileFormValidator.resetValidation();
  inputProfileNamePopup.value = userInfo.getUserInfo().userName;
  inputProfileAboutPopup.value = userInfo.getUserInfo().userJob;
  profilePopup.open();
});
buttonCloseProfilePopup.addEventListener('click', () => profilePopup.close());

buttonOpenAddCardPopup.addEventListener('click', () => {
  popupAddCardForm.reset();
  addCardFormValidator.resetValidation();
  addCardPopup.open();
});
buttonCloseAddCardPopup.addEventListener('click', () => addCardPopup.close());

buttonCloseImagePreviewPopup.addEventListener('click', () => imagePreviewPopup.close());






