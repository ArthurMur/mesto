import {Popup} from "./Popup.js";

export class PopupWithForm extends Popup {
  // Принимает в конструктор селектор popup и callback сабмита формы
  constructor(popupSelector, { callbackFormSubmit }) {
    super(popupSelector);
    this._callbackFormSubmit = callbackFormSubmit;
    // this._popupItem находится в родительском классе Popup
    this._popupFormItem = this._popupItem.querySelector('.popup-form');
    this._inputList = Array.from(this._popupFormItem.querySelectorAll('.popup-text'));
    this._sendButton = this._popupItem.querySelector('.btn-save');
    this._sendButtonText = this._sendButton.textContent;
  }

  _getInputValues() {
    // Наполняем данными пустой массив 
    this._formValues = {};
    this._inputList.forEach(inputItem => this._formValues[inputItem.name] = inputItem.value);
    return this._formValues;
  }

  // Используем getInputValues, добавляем обработчик клика и обработчик отправки формы
  setEventListeners() {
    super.setEventListeners();
    this._popupFormItem.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._callbackFormSubmit(this._getInputValues());
    });
  }

  // Добавление кнопке текста сохранения
  putSavingText() {
    this._sendButton.textContent = 'Сохранение...';
  }

  // Добавление дефолтного текста кнопке
  returnSavingText() {
    this._sendButton.textContent = this._sendButtonText;
  }

  close() {
    super.close();
    // Сбрасываем форму
    this._popupFormItem.reset();
  }
}