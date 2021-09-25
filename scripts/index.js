//=============== Initialization ===============//
const cards = document.querySelector('.cards');
// Buttons =====
// popup profile buttons
const buttonOpenProfilePopup = document.querySelector('.profile__edit-button');
const buttonCloseProfilePopup = document.querySelector('.popup__close-button_type_profile');
// popup card-add buttons
const buttonOpenAddCardPopup = document.querySelector('.profile__add-button');
const buttonCloseAddCardPopup = document.querySelector('.popup__close-button_type_add-card');

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
// popup profile
const popupAddCard = document.querySelector('.popup_type_add-card');
const popupAddCardForm = document.querySelector('.popup__form_type_add-card');

// Templates =====
// template card
const templateCard = document.querySelector('#card-template').content;

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

initialCards.forEach((card) => {
    addCard(card.name, card.link);
});
//=============== Functions ===============//

function popupClose(popup) {
    popup.classList.toggle('popup_open');
}

function popupOpen(popup) {
    popup.classList.toggle('popup_open');
}

function addCard(name, link){
    const newCard = templateCard.querySelector('.card').cloneNode(true);
    newCard.querySelector('.card__image').alt = name;
    newCard.querySelector('.card__image').src = link;
    newCard.querySelector('.card__title').textContent = name;
    cards.append(newCard);
}
/*function cardLikeToggle(button) {
    button.classList.toggle('card__like-button_active');
}*/

// Listeners
buttonOpenProfilePopup.addEventListener('click', () => {
    inputProfileNamePopup.value = profileName.textContent;
    inputProfileAboutPopup.value = profileAbout.textContent;
    popupOpen(popupProfile);
});
buttonCloseProfilePopup.addEventListener('click', () => popupClose(popupProfile));

buttonOpenAddCardPopup.addEventListener('click', () => popupOpen(popupAddCard));
buttonCloseAddCardPopup.addEventListener('click', () => popupClose(popupAddCard));

/*for (let i = 0; i < document.querySelectorAll('.card__like-button').length; i++) {
    document.querySelectorAll('.card__like-button')[i].addEventListener('click',(e) => cardLikeToggle(e.target));
}*/

popupProfileForm.addEventListener('submit', (e) => {
    e.preventDefault();
    profileName.textContent = inputProfileNamePopup.value;
    profileAbout.textContent = inputProfileAboutPopup.value;
    popupClose(popupProfile);
});

popupAddCardForm.addEventListener('submit',(e) => {
    e.preventDefault();
    addCard(inputCardTitlePopup.value, inputCardImageLinkPopup.value);
    popupClose(popupAddCard);
})

