import Popup from "./Popup.js";
import {settings} from "../data.js";


export default class PopupWithForm extends Popup {

    constructor(popupSelector, handleSubmitForm) {
        super(popupSelector);
        this._handleSubmitForm = handleSubmitForm;
        this._form =  document.querySelector(popupSelector).querySelector(settings.formSelector);
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