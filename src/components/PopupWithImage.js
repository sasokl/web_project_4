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
     * @param name image title
     * @param link image link
     */
    open({name, link}) {
        this._figureImageElement.src = link;
        this._figureImageElement.alt = name;
        this._figureCaptionElement.textContent = name;
        super.open();
    }
}