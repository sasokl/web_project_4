export default class FormValidator {

    constructor(settings, formElement) {
        this._settings = settings;
        this._formElement = formElement;
        this._inputList = Array.from(this._formElement.querySelectorAll(this._settings.inputSelector));
        this._buttonElement = this._formElement.querySelector(this._settings.submitButtonSelector);
    }
    /**
     * Shows the target input error. Adds relevant css classes to the input and error elements.
     * @param inputElement target input
     */
    _showInputError(inputElement) {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        errorElement.textContent = inputElement.validationMessage;
        errorElement.classList.add(this._settings.errorClass);
        inputElement.classList.add(this._settings.inputErrorClass);
    }
    /**
     * Hides the target input error. Removes relevant css classes from the input and error elements.
     * @param inputElement target input
     */
    _hideInputError(inputElement) {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        errorElement.textContent = "";
        errorElement.classList.remove(this._settings.errorClass);
        inputElement.classList.remove(this._settings.inputErrorClass);
    }
    /**
     * Checks the target input validity. Shows the relevant error if input value is invalid, and hides error otherwise.
     * @param inputElement target input
     */
    _checkInputValidity(inputElement) {
        (!inputElement.validity.valid) ?
            this._showInputError(inputElement) :
            this._hideInputError(inputElement);
    }

    /**
     * Checks if one of the inputs in input list has invalid input.
     */
    _hasInvalidInput() {
        return this._inputList.some(inputElement => !inputElement.validity.valid);
    }
    /**
     * Disable or enable the submit button, corresponding to validity state of inputs in the form.
     */
    _toggleButtonState() {
        this._hasInvalidInput() ?
            (
                this._buttonElement.classList.add(this._settings.inactiveButtonClass),
                this._buttonElement.disabled = true
            ) :
            (
                this._buttonElement.classList.remove(this._settings.inactiveButtonClass),
                this._buttonElement.disabled = false
            );
    }
    /**
     * Sets the input listeners for all inputs in the form. Each listener checks the validity of
     * each input. Shows the relevant errors for inputs and update submit button state.
     */
    _setEventListeners() {
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener("input", () => {
                this._checkInputValidity(inputElement);
                this._toggleButtonState();
            });
        });
    }
    /**
     * Hides the validation errors and inactive submit button in the form.
     */
    resetValidation() {
        this._inputList.forEach(inputElement => {
            this._hideInputError(inputElement);
        });
        this._toggleButtonState();
    }

    /*=========================================================================
    My idea with finding fieldsets was that the class would be dynamic and flexible for changes. That is, as we were
    taught in the lessons - to make classes so that you can use it in another project without changing anything inside
    (for example, in a project where there are many fieldsets in one form. Or if I want to add fieldsets to the form in
    this the same project in the future).

    Anyway, now I will do as you say for the successful adoption of the project, but please explain where is the truth.
    - When is it better to make classes dynamic and adaptable to other projects, and when is it better to write a class
    specifically for one project?
    */
    /**
     * Enables the validation for the form.
     */
    enableValidation() {
        this._setEventListeners();
    }


}