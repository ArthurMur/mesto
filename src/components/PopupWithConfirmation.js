import { Popup } from "./Popup.js";

export class PopupWithConfirmation extends Popup {
// Получает селектор, объект и карточку.
constructor(popupSelector, { callbackConfirmation }) {
  super(popupSelector);
  // this._popupItem находится в родительском классе
  this._submitButton = this._popupItem.querySelector('.popup-form');
  this._callbackConfirmation = callbackConfirmation;
}

  // Получаем данные и наследуем open из родительского класса
  open(cardObject, cardId) {
    this._cardObject = cardObject;
    this._cardId = cardId;
    super.open();
  }

  // Навешиваем обработчики на кнопку подтверждения, наследуем из родителя остальные
  setEventListeners() {
    this._submitButton.addEventListener('submit', (evt) => { 
      evt.preventDefault(); 
      this._callbackConfirmation(this._cardObject, this._cardId) })
    super.setEventListeners();
  }
}