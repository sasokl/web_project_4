import {
    popupOpenClass,
    popupCloseButtonSelector
} from "../utils/data.js";

export default class Popup {
    constructor(popupSelector) {
        this._popupElement = document.querySelector(popupSelector)
    }
    /**
     * Opens the popup. Adds the corresponding listeners.
     */
    open() {
        this._popupElement.addEventListener('mousedown', this._handleOverlayClick);
        document.addEventListener('keydown', this._handleEscClose );
        this._popupElement.classList.add(popupOpenClass);
    }
    /**
     * Closes the popup. Removes the corresponding listeners.
     */
    close() {
        this._popupElement.removeEventListener('mousedown', this._handleOverlayClick);
        document.removeEventListener('keydown', this._handleEscClose);
        this._popupElement.classList.remove(popupOpenClass);
    }

    /* === Question for the reviewer: ===
    Why is it written in the task to make this method public, if there is only one listener, which can also be added
    to open and close methods like other listeners?
    ===================================== */
    /**
     * Adds the popup listeners
     */
    setEventListeners() {
        this._popupElement
            .querySelector(popupCloseButtonSelector)
            .addEventListener('click', () => {
                this.close();
            });
    }

    /**
     * Closes the popup on 'escape' key press.
     * @param e keypress event
     * @private
     */
    _handleEscClose  = (e) => {
        if (e.key === 'Escape') {
            this.close();
        }
    }
    //================================================================
    /*
    * The solution of two listeners ('mousedown' and 'mouseup') instead of one ('click') prevents the problem of
    * unexpected closing of the popup with the following actions: mousedown outside the overlay (on a popup container,
    * close button, input, etc.) -> moving the mouse to the overlay -> releasing the mouse button (mouseup).
    */
    /**
     * Checks if the clicked element was really popup overlay and nothing else. If it is - closes the popup.
     * @param mouseDownEvt click event
     */
    _handleOverlayClick = (mouseDownEvt) => {
        // Checks if the upper element (which the 'mousedown' was on) is the popup overlay.
        if (mouseDownEvt.target === mouseDownEvt.currentTarget) {
            const mouseUpOverlay = (mouseUpEvt) => {
                // Checks if the upper element (which the 'mouseup' was on) is the popup overlay.
                if (mouseUpEvt.target === mouseDownEvt.target) this.close();
            };
            // 3rd parameter '{once:true}' instead of 'removeEventListener' function.
            // The listener on 'mouseup' listens only once.
            mouseDownEvt.currentTarget.addEventListener('mouseup', mouseUpOverlay, {once: true});
        }
    };
    //================================================================




}