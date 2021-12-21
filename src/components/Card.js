export default class Card {

  constructor(userID, {name, link, likes, ownerID}, templateSelector, handleCardClick, handleLikeClick, handleDeleteClick) {
    this._userID = userID;
    this._name = name;
    this._link = link;
    this._likes = likes;
    this._ownerID = ownerID;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._handleDeleteClick = handleDeleteClick;
    this._likeStatus = false;
    this._updateLikeStatus();

    this._createCardElement();
  }
  /**
   * Likes the card. Toggles the appropriate css classes.
   * @private
   */
  _likeCard = () => {
    this._likeButtonElement.classList.toggle('card__like-button_active');
    this._likeStatus = !this._likeStatus;
  }
  /**
   * Delete the card with all its content.
   * @private
   */
  _deleteCard = () => {
    this._cardNode.remove();
    this._cardNode = null;
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
    this._cardNode = this._getCardNode();
    // elements initialization
    this._imageElement = this._cardNode.querySelector('.card__image');
    this._titleElement = this._cardNode.querySelector('.card__title');
    this._likeButtonElement = this._cardNode.querySelector('.card__like-button');
    this._likesCountElement = this._cardNode.querySelector('.card__likes-count');
    this._deleteButtonElement = this._cardNode.querySelector('.card__delete-button');
    if (this._ownerID === this._userID) {
      this._deleteButtonElement.classList.add('card__delete-button_enabled');
    }
    // image element values update
    this._imageElement.src = this._link;
    this._imageElement.alt = this._name;
    // title element value update
    this._titleElement.textContent = this._name;
    // likes element update
    this._likesCountElement.textContent = this._likes.length;
    // like button element update
    if(this._likeStatus) this._likeButtonElement.classList.add('card__like-button_active');
    // add listeners
    this._setEventListeners();
  }
  /**
   * Set event listeners for card elements.
   * @private
   */
  _setEventListeners(){
    this._imageElement.addEventListener('click', this._handleCardClick);
    this._likeButtonElement.addEventListener('click', () => {
      this._handleLikeClick(!this._likeStatus, this._likeCard);
    });
    this._deleteButtonElement.addEventListener('click', () => {
      this._handleDeleteClick(this._deleteCard);
    });
  }

  /**
   * Checks if you already liked the card, and updates the status.
   * @private
   */
  _updateLikeStatus(){
    this._likes.forEach(likedUser => {
      if (likedUser['_id'] === this._userID) {
        this._likeStatus = true;
      }
    })
  }

  /**
   * Updates the count of likes.
   * @param likesArr likes array
   */
  updateLikes(likesArr){
    this._likesCountElement.textContent = likesArr.length;
  }
  /**
   * Returns a card element.
   * @returns card element
   */
  getElement() {
    return this._cardNode;
  }

}