//=============== Imports ===============//
import "./index.css";
import FormValidator from '../components/FormValidator.js';
import {
    // selectors
    cardsSelector,
    cardTemplateSelector,
    profileNameSelector,
    profileAboutSelector,
    profileAvatarImageSelector,
    popupProfileSelector,
    popupAvatarSelector,
    popupAddCardSelector,
    popupImagePreviewSelector,
    popupCloseButtonSelector,
    popupSubmitButtonSelector,
    // classes
    popupOpenClass,
    // elements
    buttonOpenProfilePopup,
    buttonOpenAddCardPopup,
    buttonOpenAvatarEditPopup,
    inputProfileNamePopup,
    inputProfileAboutPopup,
    popupProfileForm,
    popupAvatarForm,
    popupAddCardForm,
    figureImage,
    figureCaption,
    // form settings object
    settings,
    // api settings object
    apiSettings, popupDeleteCardSelector,
} from "../utils/data.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Api from "../components/Api";

//=============== Initialization ===============//

// Form validators
const profileFormValidator = new FormValidator(settings, popupProfileForm);
const avatarFormValidator = new FormValidator(settings, popupAvatarForm);
const addCardFormValidator = new FormValidator(settings, popupAddCardForm);
profileFormValidator.enableValidation();
avatarFormValidator.enableValidation();
addCardFormValidator.enableValidation();

// Api
const api = new Api(apiSettings);

// User Info
const profile = new UserInfo({
    nameSelector: profileNameSelector,
    jobSelector: profileAboutSelector,
    avatarSelector: profileAvatarImageSelector
});

// Popups
const cardDeletePopup = new PopupWithForm(
    popupDeleteCardSelector,
    popupSubmitButtonSelector,
    popupOpenClass,
    popupCloseButtonSelector,
    settings,
    "Deleting...",
    () => console.log("Error: didn't find a submit function"));
cardDeletePopup.setEventListeners();

const imagePreviewPopup = new PopupWithImage(
    popupImagePreviewSelector,
    popupOpenClass,
    popupCloseButtonSelector,
    figureImage,
    figureCaption
);
imagePreviewPopup.setEventListeners();

// =============================================================================================== //
// ------------------------------------------ API start ------------------------------------------ //
// =============================================================================================== //

// ========================== Get User Data from the server ========================== //
api.getUser()
    // Some popups and buttons should be set up only after we got our USER DATA
    // ------------------------------------------------------------------------
    .then(user => {
        profile.setUserInfo(user['name'], user['about']);
        profile.setAvatar(user['avatar']);
        profile.setUserId(user['_id']);

        // -------------------------- Profile Popup -------------------------- //

        const profilePopup = new PopupWithForm(
            popupProfileSelector,
            popupSubmitButtonSelector,
            popupOpenClass,
            popupCloseButtonSelector,
            settings,
            "Saving...",
            (inputs) => {
                api.setUser(inputs['name'], inputs['about'])
                    .then(() => {
                        profilePopup.close();
                        profile.setUserInfo(inputs['name'], inputs['about']);
                    })
                    .catch(logError);
            }
        );
        profilePopup.setEventListeners();
        buttonOpenProfilePopup.addEventListener('click', () => {
            profileFormValidator.resetValidation();
            const userData = profile.getUserInfo();
            inputProfileNamePopup.value = userData.userName;
            inputProfileAboutPopup.value = userData.userJob;
            profilePopup.open();
        });

        // -------------------------- Avatar Popup -------------------------- //
        const avatarPopup = new PopupWithForm(
            popupAvatarSelector,
            popupSubmitButtonSelector,
            popupOpenClass,
            popupCloseButtonSelector,
            settings,
            "Saving...",
            (inputs) => {
                api.setAvatarPicture(inputs['avatar-image-link'])
                    .then(() => {
                        avatarPopup.close();
                        profile.setAvatar(inputs['avatar-image-link']);
                    })
                    .catch(logError);
            }
        );
        avatarPopup.setEventListeners();

        buttonOpenAvatarEditPopup.addEventListener('click', () => {
            avatarFormValidator.resetValidation();
            avatarPopup.open();
        });
        // ========================== Get Cards list from the server ========================== //
        api.getCards()
            // Some popups and buttons should be set up only after we got our CARDS LIST
            // ------------------------------------------------------------------------
            .then(cardsResultList => {
                // -------------------------- Cards renderer init-------------------------- //
                const cardsList = new Section(
                    {
                        items: cardsResultList.reverse(),
                        renderer: (item) => {
                            return createCard(
                                {
                                    cardID: item['_id'],
                                    name: item['name'],
                                    link: item['link'],
                                    likes: item['likes'],
                                    ownerID: item['owner']['_id']
                                },
                                cardTemplateSelector,
                                user['_id']
                            );
                        }
                    }, cardsSelector);
                cardsList.renderItems();
                // -------------------------- Add Card Popup -------------------------- //
                const addCardPopup = new PopupWithForm(
                    popupAddCardSelector,
                    popupSubmitButtonSelector,
                    popupOpenClass,
                    popupCloseButtonSelector,
                    settings,
                    "Creating...",
                    (inputs) => {
                        api.addCard(inputs['card-title'], inputs['card-image-link'])
                            .then(newCard => {
                                addCardPopup.close();
                                cardsList.addItem(newCard);
                            })
                            .catch(logError);
                    }
                )
                addCardPopup.setEventListeners();

                buttonOpenAddCardPopup.addEventListener('click', () => {
                    addCardFormValidator.resetValidation();
                    addCardPopup.open();
                });
            }).catch(logError);
    })
    .catch(logError);

//=============== Functions ===============//
/**
 * Creates a new card object and returns its element.
 * @param cardID card id
 * @param name card name
 * @param link card image link
 * @param likes array of liked users
 * @param ownerID card creator (user that created the card)
 * @param templateSelector css selector of the card template
 * @param userID current user id
 * @returns new card element
 */
function createCard({cardID, name, link, likes, ownerID}, templateSelector, userID) {
    const newCard = new Card(
        userID,
        {
            name,
            link,
            likes,
            ownerID
        },
        templateSelector,
        () => {
            imagePreviewPopup.open({
                name: name,
                link: link
            })
        },
        (toLike, submitUpdate) => {
            toLike ?
                api.likeCard(cardID)
                    .then((res)=>{
                        console.log("like");
                        newCard.updateLikes(res['likes']);
                        submitUpdate();
                    })
                    .catch(logError) :
                api.unlikeCard(cardID)
                    .then((res) => {
                        console.log("unlike");
                        newCard.updateLikes(res['likes']);
                        submitUpdate();
                    })
                    .catch(logError);
        },
        (submitDelete) => {
            cardDeletePopup.setSubmitFormHandleFunction(() => {
                api.deleteCard(cardID)
                    .then(() => {
                        cardDeletePopup.close();
                        submitDelete();
                    })
                    .catch(logError);
            });
            cardDeletePopup.open();
        }
    );
    return newCard.getElement();
}

/**
 * Logs the catched error to the console.
 * @param err logged text to console
 */
function logError (err) {
    console.log(err);
}









