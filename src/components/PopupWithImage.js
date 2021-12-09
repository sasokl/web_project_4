import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(popupSelector,popupOpenClass, popupCloseButtonSelector, figureImageElement, figureCaptionElement) {
        super(popupSelector, popupOpenClass, popupCloseButtonSelector);
        this._figureImageElement = figureImageElement;
        this._figureCaptionElement = figureCaptionElement;
    }
    /**
     * Opens the popup. Adds the corresponding listeners.
     * Updates the image and caption that needs to be shown.
     * @param text image title
     * @param imageLink image link
     */
    open({text, imageLink}) {
        this._figureImageElement.src = imageLink;
        this._figureImageElement.alt = text;
        this._figureCaptionElement.textContent = text;
        super.open();
    }
}