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
const mouseDownOverlay = (mouseDownEvt) => {
  // Checks if the upper element (which the 'mousedown' was on) is the popup overlay.
  if (mouseDownEvt.target === mouseDownEvt.currentTarget) {
    const mouseUpOverlay = (mouseUpEvt) => {
      // Checks if the upper element (which the 'mouseup' was on) is the popup overlay.
      if (mouseUpEvt.target === mouseDownEvt.target) closePopup(mouseUpEvt.target);
    };
    // 3rd parameter '{once:true}' instead of 'removeEventListener' function.
    // The listener on 'mouseup' listens only once.
    mouseDownEvt.currentTarget.addEventListener('mouseup', mouseUpOverlay, {once: true});
  }
};
//================================================================

/**
 * Closes the popup on 'escape' key press.
 * @param e keypress event
 * @private
 */
const _escClose = (e) => {
  if (e.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_open');
    closePopup(openedPopup);
  }
};
/**
 * Opens the popup. Adds the corresponding listeners.
 * @param popup popup to open
 */
export function openPopup(popup) {
  popup.addEventListener('mousedown', mouseDownOverlay);
  document.addEventListener('keydown', _escClose);
  popup.classList.add('popup_open');
}
/**
 * Closes the popup. Removes the corresponding listeners.
 * @param popup popup to close
 */
export function closePopup(popup) {
  popup.removeEventListener('mousedown', mouseDownOverlay);
  document.removeEventListener('keydown', _escClose);
  popup.classList.remove('popup_open');
}