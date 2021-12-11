import Popup from "./Popup.js";


export default class PopupWithForm extends Popup {
    constructor(popupSelector,popupOpenClass, popupCloseButtonSelector, settings, handleSubmitForm) {
        super(popupSelector, popupOpenClass, popupCloseButtonSelector);
        this._handleSubmitForm = handleSubmitForm;
        this._form =  this._popupElement.querySelector(settings.formSelector);
        this._inputsList = Array.from(this._form.querySelectorAll(settings.inputSelector));
    }
    /**
     * Closes the popup. Removes the corresponding listeners.
     * Resets the popup form.
     */
    close(){
        this._form.reset();
        super.close();
    }
    /**
     * Returns an object with inputs and their values.
     * @returns object with input values
     * @private
     */
    _getInputValues() {
        const inputValues = {};
        this._inputsList.forEach((input) => {
           inputValues[input.name] = input.value;
        });
        console.log(inputValues);
        return inputValues;
    }
    /**
     * Adds the popup with form listeners
     */
    setEventListeners() {
        super.setEventListeners();

        this._form.addEventListener('submit', (e) => {
            e.preventDefault();
            this._handleSubmitForm(this._getInputValues());
            this.close()
        });
    }
}