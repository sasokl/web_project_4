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

//=============== Functions ===============//

function popupOpen() {
    inputProfileNamePopup.value = profileName.textContent;
    inputProfileCareerPopup.value = profileAbout.textContent;
    popup.classList.toggle('popup_open');
}

function popupClose() {
    popup.classList.toggle('popup_open');
}

function popupSubmit(e) {
    e.preventDefault();

    /*
    With creating interim variables my point was to store the data (name and about info) in more safe place than html
    tags. I mean when if i had a database i wouldn't store data in HTML tags, where anyone can change data via browser
    inspector. So by creating variables storing this data, I tried to do some kind of little simulation of real work with
    the database ... =)
    */
    profileName.textContent = inputProfileNamePopup.value;
    profileAbout.textContent = inputProfileCareerPopup.value;
    popupClose();
}

/*function cardLikeToggle(button) {
    button.classList.toggle('card__like-button_active');
}*/

// Listeners
buttonOpenPopup.addEventListener('click', popupOpen);
buttonClosePopup.addEventListener('click', popupClose);

/*for (let i = 0; i < document.querySelectorAll('.card__like-button').length; i++) {
    document.querySelectorAll('.card__like-button')[i].addEventListener('click',(e) => cardLikeToggle(e.target));
}*/

popupForm.addEventListener('submit', popupSubmit);

