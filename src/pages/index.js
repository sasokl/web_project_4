//=============== Imports ===============//
import "./index.css";
import FormValidator from '../components/FormValidator.js';
import {
    // selectors
    cardsSelector,
    cardTemplateSelector,
    profileNameSelector,
    profileAboutSelector,
    popupProfileSelector,
    popupAddCardSelector,
    popupImagePreviewSelector,
    popupCloseButtonSelector,
    // classes
    popupOpenClass,
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
    figureImage,
    figureCaption,
    // initial cards array
    initialCards,
    // form settings object
    settings,
} from "../utils/data.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithImage from "../components/PopupWithImage.js";

//=============== Initialization ===============//

// User info
const userInfo = new UserInfo({
    nameSelector: profileNameSelector,
    jobSelector: profileAboutSelector
});

// Popups
const imagePreviewPopup = new PopupWithImage(
    popupImagePreviewSelector,
    popupOpenClass,
    popupCloseButtonSelector,
    figureImage,
    figureCaption
);
imagePreviewPopup.setEventListeners();

const profilePopup = new PopupWithForm(
    popupProfileSelector,
    popupOpenClass,
    popupCloseButtonSelector,
    settings,
    (inputs) => {
        userInfo.setUserInfo(inputs['name'], inputs['about']);
    }
)
profilePopup.setEventListeners();

const addCardPopup = new PopupWithForm(
    popupAddCardSelector,
    popupOpenClass,
    popupCloseButtonSelector,
    settings,
    (inputs) => {
        cardsList.addItem(
            {
                text: inputs['card-title'],
                imageLink: inputs['card-image-link']
            }
        );
    }
)
addCardPopup.setEventListeners();

// Cards
const cardsList = new Section(
    {
        items: initialCards,
        renderer: (item) => {
            return createCard(
                item.text,
                item.imageLink,
                cardTemplateSelector
            );
        }
    }, cardsSelector);
cardsList.renderItems();

// Form validators
const profileFormValidator = new FormValidator(settings, popupProfileForm);
const addCardFormValidator = new FormValidator(settings, popupAddCardForm);
profileFormValidator.enableValidation();
addCardFormValidator.enableValidation();

//=============== Functions ===============//
function createCard(text, imageLink, templateSelector) {
    return new Card(
        text,
        imageLink,
        templateSelector,
        () => {
            imagePreviewPopup.open({
                text: text,
                imageLink: imageLink
            })
        }).getElement();
}

// Listeners
buttonOpenProfilePopup.addEventListener('click', () => {
    profileFormValidator.resetValidation();
    const userData = userInfo.getUserInfo();
    inputProfileNamePopup.value = userData.userName;
    inputProfileAboutPopup.value = userData.userJob;
    profilePopup.open();
});

buttonOpenAddCardPopup.addEventListener('click', () => {
    addCardFormValidator.resetValidation();
    addCardPopup.open();
});







