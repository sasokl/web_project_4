import Popup from "./Popup.js";


export default class PopupWithForm extends Popup {
    constructor(popupSelector, submitButtonSelector, popupOpenClass, popupCloseButtonSelector, settings, submittingText, handleSubmitForm) {
        super(popupSelector, popupOpenClass, popupCloseButtonSelector);
        this._submitButton = this._popupElement.querySelector(submitButtonSelector);
        this._submitButtonDefaultText = this._submitButton.textContent;
        this._submittingText = submittingText;
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
        this._submitButton.textContent = this._submitButtonDefaultText;
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
            this._submitButton.textContent = this._submittingText;
            this._handleSubmitForm(this._getInputValues());
            this.close()
        });
    }
    /**
     * Sets a new submit form function to the form.
     * @param handleSubmitForm new function to submit form
     */
    setSubmitFormHandleFunction(handleSubmitForm) {
        this._handleSubmitForm = handleSubmitForm;
    }
}