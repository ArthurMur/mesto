const formValidationConfig = {
  formSelector: '.popup-form',
  inputSelector: '.popup-text',
  submitButtonSelector: '.btn-save',
  inactiveButtonClass: 'btn-save_inactive',
  inputErrorClass: 'popup-form__input_type_error',
  errorClass: 'popup-form__input-error_active'
};

class FormValidator {
  constructor(config, form){
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._formSelector = config.formSelector;
    this._form = form;
  }

  /** Функция валидации формы **/
  enableValidation() {
    this._setEventListener();
  };

  /** Добавить класс ошибки **/
  _showInputError (inputElement) {
    const errorElement = this._form.querySelector(`.${inputElement.id}-input-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this._errorClass);
  };

  /** Есть ли невалидное поле **/
  _handleFormInput(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  }

  /** Убрать класс ошибки **/
  _hideInputError(inputElement) {
    const errorElement = this._form.querySelector(`.${inputElement.id}-input-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  };

  /** Функция переключения кнопки сабмит **/
  _toggleButtonState() {
    this._buttonSubmint = this._form.querySelector(this._submitButtonSelector);
    this._isFormValid = this._form.checkValidity();
    this._buttonSubmint.disabled = !this._isFormValid;
    this._buttonSubmint.classList.toggle(this._inactiveButtonClass, !this._isFormValid);
  }

  /**Объявить функцию слушателей всех инпутов */
  _setEventListener() {
    this._toggleButtonState();
    this._inputList = this._form.querySelectorAll(this._inputSelector);
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._handleFormInput(inputElement);
        this._toggleButtonState();
      });
    })
  };

  /**Сбросить валидацию после закрытия формы */
  clearValidationForm() {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    })
  }
}

export {FormValidator, formValidationConfig}

