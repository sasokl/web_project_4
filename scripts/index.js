
//=============== Initialization ===============//

// Buttons
const buttonOpenPopup = document.querySelector('.profile__edit-button');
const buttonClosePopup = document.querySelector('.popup__close-button');

// Inputs
const inputProfileNamePopup = document.querySelector('#name-input');
const inputProfileCareerPopup = document.querySelector('#about-input');

// Text elements
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');

// Popups
const popup = document.querySelector('.popup');
const popupForm = document.querySelector('.popup__form');

// Variables
let profileNameText = profileName.textContent;
let profileAboutText = profileAbout.textContent;


// Listeners
buttonOpenPopup.addEventListener('click', popupOpen);
buttonClosePopup.addEventListener('click', popupClose);

for (let i = 0; i < document.querySelectorAll('.card__like-button').length; i++) {
    document.querySelectorAll('.card__like-button')[i].addEventListener('click',(e) => cardLikeToggle(e.target));
}

popupForm.addEventListener('submit', popupSubmit);

//=============== Functions ===============//

function popupOpen() {
    inputProfileNamePopup.value = profileNameText;
    inputProfileCareerPopup.value = profileAboutText;
    popup.style.display = 'flex';
}

function popupClose() {
    popup.style.setProperty('display','none');
}

function popupSubmit(e) {
    e.preventDefault();

    profileNameText = inputProfileNamePopup.value;
    profileAboutText = inputProfileCareerPopup.value;
    profileName.textContent = profileNameText;
    profileAbout.textContent = profileAboutText;
    popupClose();
}

function cardLikeToggle(button) {
    button.classList.toggle('card__like-button_active');
}

