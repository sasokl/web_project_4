
export default class FormValidator {

  constructor(settings, formElement) {
    this._settings = settings;
    this._formElement = formElement;
  }
  /**
   * Shows the target input error. Adds relevant css classes to the input and error elements.
   * @param wrapperElement form or fieldset that wraps the input
   * @param inputElement target input
   * @param errorMessage the message that needs to be showed
   */
  _showInputError (wrapperElement, inputElement, errorMessage) {
    const errorElement = wrapperElement.querySelector(`.${inputElement.id}-error`);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._settings.errorClass);
    inputElement.classList.add(this._settings.inputErrorClass);
  }
  /**
   * Hides the target input error. Removes relevant css classes from the input and error elements.
   * @param wrapperElement form or fieldset that wraps the input
   * @param inputElement target input
   */
  _hideInputError (wrapperElement, inputElement) {
    const errorElement = wrapperElement.querySelector(`.${inputElement.id}-error`);
    errorElement.textContent = "";
    errorElement.classList.remove(this._settings.errorClass);
    inputElement.classList.remove(this._settings.inputErrorClass);
  }
  /**
   * Checks the target input validity. Shows the relevant error if input value is invalid, and hides error otherwise.
   * @param wrapperElement form or fieldset that wraps the input
   * @param inputElement target input
   */
  _checkInputValidity(wrapperElement, inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(wrapperElement, inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(wrapperElement, inputElement);
    }
  }
  /**
   * Checks if one of the inputs in input list has invalid input.
   * @param inputList list of inputs to check.
   * @returns boolean statement corresponding to the presence of invalid input in input list.
   */
  _hasInvalidInput (inputList) {
    return inputList.some(inputElement => !inputElement.validity.valid);
  }
  /**
   * Disable or enable the submit button, corresponding to validity state of inputs in the form.
   * @param inputList list of inputs to check.
   * @param buttonElement target button
   */
  _toggleButtonState (inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(this._settings.inactiveButtonClass);
      buttonElement.disabled = true;
    } else {
      buttonElement.classList.remove(this._settings.inactiveButtonClass);
      buttonElement.disabled = false;
    }
  }
  /**
   * Sets the input listeners for all inputs in the wrapperElement (form \ fieldset). Each listener checks the validity of
   * each input. Shows the relevant errors for inputs and update submit button state.
   * @param wrapperElement form or fieldset that wraps the inputs
   */
  _setEventListeners(wrapperElement) {
    const inputList = Array.from(wrapperElement.querySelectorAll(this._settings.inputSelector));
    const buttonElement = wrapperElement.querySelector(this._settings.submitButtonSelector);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(wrapperElement, inputElement);
        this._toggleButtonState(inputList, buttonElement);
      });
    });
  }
  /**
   * Hides the validation errors and inactive submit button in the form.
   */
  resetValidation () {
    const inputList = Array.from(this._formElement.querySelectorAll(this._settings.inputSelector));
    const buttonElement = this._formElement.querySelector(this._settings.submitButtonSelector);
    inputList.forEach(input => {
      this._hideInputError(this._formElement, input);
    });
    buttonElement.classList.add(this._settings.inactiveButtonClass);
  }
  /**
   * Enables the validation for the form.
   */
  enableValidation() {
    const fieldsetList = Array.from(this._formElement.querySelectorAll(this._settings.fieldsetSelector));
    if (fieldsetList) {
      fieldsetList.forEach(fieldset => {
        this._setEventListeners(fieldset);
        this.resetValidation(fieldset);
      });
    } else {
      this._setEventListeners(this._formElement);
      this.resetValidation(this._formElement);
    }
  };

}