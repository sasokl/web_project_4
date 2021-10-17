/**
 * Shows the target input error. Adds relevant css classes to the input and error elements.
 * @param wrapperElement form or fieldset that wraps the input
 * @param inputElement target input
 * @param errorMessage the message that needs to be showed
 * @param settings object with relevant css classes
 */
const showInputError = (wrapperElement, inputElement, errorMessage, settings) => {
  const errorElement = wrapperElement.querySelector(`.${inputElement.id}-error`);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(settings.errorClass);
  inputElement.classList.add(settings.inputErrorClass);
};

/**
 * Hides the target input error. Removes relevant css classes from the input and error elements.
 * @param wrapperElement form or fieldset that wraps the input
 * @param inputElement target input
 * @param settings object with relevant css classes
 */
const hideInputError = (wrapperElement, inputElement, settings) => {
  const errorElement = wrapperElement.querySelector(`.${inputElement.id}-error`);
  errorElement.textContent = "";
  errorElement.classList.remove(settings.errorClass);
  inputElement.classList.remove(settings.inputErrorClass);
};

/**
 * Checks the target input validity. Shows the relevant error if input value is invalid, and hides error otherwise.
 * @param wrapperElement form or fieldset that wraps the input
 * @param inputElement target input
 * @param settings object with relevant css classes
 */
const checkInputValidity = (wrapperElement, inputElement, settings) => {
  if (!inputElement.validity.valid) {
    showInputError(wrapperElement, inputElement, inputElement.validationMessage, settings);
  } else {
    hideInputError(wrapperElement, inputElement, settings);
  }
};

/**
 * Sets the input listeners for all inputs in the wrapperElement (form \ fieldset). Each listener checks the validity of
 * each input. Shows the relevant errors for inputs and update submit button state.
 * @param wrapperElement form or fieldset that wraps the inputs
 * @param settings object with relevant css classes
 */
const setEventListeners = (wrapperElement, settings) => {
  const inputList = Array.from(wrapperElement.querySelectorAll(settings.inputSelector));
  const buttonElement = wrapperElement.querySelector(settings.submitButtonSelector);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(wrapperElement, inputElement, settings);
      toggleButtonState(inputList, buttonElement, settings);
    });
  });
};

/**
 * Checks if one of the inputs in input list has invalid input.
 * @param inputList list of inputs to check.
 * @returns boolean statement corresponding to the presence of invalid input in input list.
 */
export const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

/**
 * Disable or enable the submit button, corresponding to validity state of inputs in the form.
 * @param inputList list of inputs to check.
 * @param buttonElement target button
 * @param settings object with relevant css classes
 */
const toggleButtonState = (inputList, buttonElement, settings) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(settings.inactiveButtonClass)
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(settings.inactiveButtonClass)
    buttonElement.disabled = false;
  }
};

/**
 * Enables the validation for all forms on the page.
 * @param settings object with relevant css classes
 */
export const enableValidation = (settings) => {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });
    const fieldsetList = Array.from(formElement.querySelectorAll(settings.fieldsetSelector));
    fieldsetList.forEach(fieldset => {
      setEventListeners(fieldset, settings)
      resetValidation(fieldset, settings);
    });
  });
};
/**
 * Hides the validation errors and inactive submit button.
 * @param wrapperElement form or fieldset that wraps the inputs
 * @param settings object with relevant css classes
 */
export const resetValidation = (wrapperElement, settings) => {
  const inputList = Array.from(wrapperElement.querySelectorAll(settings.inputSelector));
  const buttonElement = wrapperElement.querySelector(settings.submitButtonSelector);
  inputList.forEach(input => {
    hideInputError(wrapperElement, input, settings);
  });
  buttonElement.classList.add(settings.inactiveButtonClass);

}