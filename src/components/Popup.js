
export default class Popup {
    constructor(popupSelector, popupOpenClass, popupCloseButtonSelector) {
        this._popupElement = document.querySelector(popupSelector)
        this._popupOpenClass = popupOpenClass;
        this._popupCloseButtonSelector = popupCloseButtonSelector;
    }
    /**
     * Opens the popup. Adds the corresponding listeners.
     */
    open() {
        this._popupElement.addEventListener('mousedown', this._handleOverlayClick);
        document.addEventListener('keyup', this._handleEscClose );
        this._popupElement.classList.add(this._popupOpenClass);
    }
    /**
     * Closes the popup. Removes the corresponding listeners.
     */
    close() {
        this._popupElement.removeEventListener('mousedown', this._handleOverlayClick);
        document.removeEventListener('keyup', this._handleEscClose);
        this._popupElement.classList.remove(this._popupOpenClass);
    }
    /**
     * Adds the popup listeners
     */
    setEventListeners() {
        this._popupElement
            .querySelector(this._popupCloseButtonSelector)
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
     * @private
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

    /*
    There is another solution for this problem, but in the case with this solution i didnt like the
    fact that you close the popup with mousedown (you actually don't make a full click).
    */
    /*_handleOverlayClick = (mouseDownEvt) => {
        if (mouseDownEvt.target === mouseDownEvt.currentTarget) {
            this.close();
        }
    };*/
    //================================================================




}