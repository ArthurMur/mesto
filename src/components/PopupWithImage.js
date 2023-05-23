import {Popup} from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupDescription = this._popupItem.querySelector('.popup-image-text');
    this._popupImage = this._popupItem.querySelector('.popup-image-img');
  }

  open(cardData){
    // Вставляем в popup картинку с ссылкой изображения и описанием
    this._popupDescription.textContent = cardData.name;
    this._popupImage.src = cardData.link;
    this._popupImage.alt = cardData.name;
    super.open();
  }
}