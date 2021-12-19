export default class Api {
    constructor({ baseUrl, headers}) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }
    /**
     * Checks the status of a request response. Returns corresponding result.
     * @param res request response
     * @returns {any|Promise<never>}
     * @private
     */
    _checkRes(res){
        return res.ok
            ? res.json()
            : Promise.reject(`Error: ${res.status}\n${res.statusText}`);
    }
    /**
     * Returns cards from the server.
     * @returns {Promise<never>}
     */
    getCards() {
        return fetch(`${this._baseUrl}/cards`,{ headers: this._headers })
            .then(this._checkRes);
    }
    /**
     * Adds a card to the server
     * @param name name of the card
     * @param link link to the card image
     * @returns {Promise<Response>}
     */
    addCard(name, link) {
        return fetch(`${this._baseUrl}/cards`, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                link: link
            })
        })
            .then(this._checkRes);
    }
    /**
     * Deletes a card from the server
     * @param cardID card id
     * @returns {Promise<never>}
     */
    deleteCard(cardID){
        return fetch(`${this._baseUrl}/cards/${cardID}`, {
            method: "DELETE",
            headers: this._headers
        })
            .then(this._checkRes);
    }
    /**
     * Returns user's info from the server
     * @returns {Promise<never>}
     */
    getUser() {
        return fetch(`${this._baseUrl}/users/me`, {headers: this._headers})
            .then(this._checkRes);
    }
    /**
     * Update user's info on the server
     * @param name name of the user
     * @param about user's job
     * @returns {Promise<Response>}
     */
    setUser(name, about) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                about: about
            })
        })
            .then(this._checkRes);
    }
    /**
     * Changes the avatar picture.
     * @param avatar link to the avatar picture
     * @returns {Promise<never>}
     */
    setAvatarPicture(avatar){
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
                avatar: avatar,
            })
        })
            .then(this._checkRes);
    }
    /**
     * Likes the card by id. Updates the like property on the server.
     * @param cardID card id
     * @returns {Promise<never>}
     */
    likeCard(cardID) {
        return fetch(`${this._baseUrl}/cards/likes/${cardID}`, {
            method: "PUT",
            headers: this._headers,
        })
            .then(this._checkRes);
    }
    /**
     * Unlikes the card by id. Updates the like property on the server.
     * @param cardID card id
     * @returns {Promise<never>}
     */
    unlikeCard(cardID) {
        return fetch(`${this._baseUrl}/cards/likes/${cardID}`, {
            method: "DELETE",
            headers: this._headers,
        })
            .then(this._checkRes);
    }
}
