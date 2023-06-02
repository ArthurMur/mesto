import {Popup} from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupDescription = this._popupItem.querySelector('.popup-image-text');
    this._popupImage = this._popupItem.querySelector('.popup-image-img');
  }

  open(description, image){
    // Вставляем в popup картинку с ссылкой изображения и описанием
    this._popupDescription.textContent = description;
    this._popupImage.src = image;
    this._popupImage.alt = description;
    super.open();
  }
}