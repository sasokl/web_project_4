import {figureImage, figureCaption, popupImagePreview} from "./data.js";
import {openPopup, closePopup} from './popup.js';

export default class Card {

  constructor(text, imageLink, templateSelector) {
    this._text = text;
    this._imageLink = imageLink;
    this._templateSelector = templateSelector;
    /**
     * Opens an image review popup with updated content based on the clicked image.
     * @param e (event) image that was clicked
     * @private
     */
    this._openImageReview = (e) => {
      figureImage.src = e.target.src;
      figureImage.alt = e.target.alt;
      figureCaption.textContent = e.target.alt;
      openPopup(popupImagePreview);
    }
    /**
     * Likes the card. Toggles the appropriate css classes.
     * @param e (event) like button that was clicked
     * @private
     */
    this._likeCard = (e) => {
      e.target.classList.toggle('card__like-button_active');
    }
    /**
     * Delete the card with all its content. Removes the listeners from image, like button and delete button.
     * @private
     */
    this._deleteCard = () => {
      this.imageElement.removeEventListener('click', this._openImageReview);
      this.likeButtonElement.removeEventListener('click', this._likeCard);
      this.closeButtonElement.removeEventListener('click', this._deleteCard);
      this.cardNode.remove();
      this.cardNode = null;
      delete this;
    }

    this._createCardElement();
  }

  /**
   * Returns a card node based on the given template.
   * @returns card node
   * @private
   */
  _getCardNode() {
    return document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.card')
      .cloneNode(true);
  }

  /**
   * Creates and initialize a card element and its content.
   * @private
   */
  _createCardElement() {
    this.cardNode = this._getCardNode();
    // elements initialization
    this.imageElement = this.cardNode.querySelector('.card__image');
    this.titleElement = this.cardNode.querySelector('.card__title');
    this.likeButtonElement = this.cardNode.querySelector('.card__like-button');
    this.closeButtonElement = this.cardNode.querySelector('.card__delete-button');
    // image element values update
    this.imageElement.src = this._imageLink;
    this.imageElement.alt = this._text;
    // title element value update
    this.titleElement.textContent = this._text;
    // add listeners
    this.imageElement.addEventListener('click', this._openImageReview);
    this.likeButtonElement.addEventListener('click', this._likeCard);
    this.closeButtonElement.addEventListener('click', this._deleteCard);
  }

  /**
   * Returns a card element.
   * @returns card element
   */
  getElement() {
    return this.cardNode;
  }

}