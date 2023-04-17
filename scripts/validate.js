

const enableValidation = (obj) => {
  const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-input-error`);
    inputElement.classList.add(`${obj.inputErrorClass}`);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(`${obj.errorClass}`);
  };
  
  const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }
  
  const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-input-error`);
    inputElement.classList.remove(`${obj.inputErrorClass}`);
    errorElement.classList.remove(`${obj.errorClass}`);
    errorElement.textContent = '';
  };
  
  const toggleButtonState = (inputList, buttonElement) => {
    if (hasInvalidInput(inputList)) {
      buttonElement.classList.add(`${obj.inactiveButtonClass}`);
      buttonElement.disabled = true;
    } else {
      buttonElement.classList.remove(`${obj.inactiveButtonClass}`);
      buttonElement.disabled = false;
    }
  }
  
  const checkInputValidity = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      hideInputError(formElement, inputElement);
    }
  };
  
  const setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(`${obj.inputSelector}`));
    const buttonElement = formElement.querySelector(`${obj.submitButtonSelector}`);
  
    toggleButtonState(inputList, buttonElement);
  
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
        checkInputValidity(formElement, inputElement);
        toggleButtonState(inputList, buttonElement);
      });
    });
  };
  
  const formList = Array.from(document.querySelectorAll(`${obj.formSelector}`));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault()
    });
    setEventListeners(formElement);
  });
};

enableValidation({
  formSelector: '.popup-form',
  inputSelector: '.popup-text',
  submitButtonSelector: '.btn-save',
  inactiveButtonClass: 'btn-save_inactive',
  inputErrorClass: 'popup-form__input_type_error',
  errorClass: 'popup-form__input-error_active'
});

