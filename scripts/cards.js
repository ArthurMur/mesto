import {cards} from './index.js';

class Card {
  constructor(data, templateSelector, openCardImagePopup) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._openCardImagePopup =  openCardImagePopup;
  }

  /**Получить шаблон **/
  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.elements__item')
      .cloneNode(true);

    return cardElement;
  }

  /**Сгенерировать карточку **/
  generateCard() {
    this._element = this._getTemplate();
    this._cardElementTitle = this._element.querySelector('.elements__text');
    this._cardElementPhoto = this._element.querySelector('.elements__img');
    this._cardElementLike = this._element.querySelector('.btn-heart');
    this._cardElementDel = this._element.querySelector('.btn-delete');

    this._cardElementPhoto.src = this._link;
    this._cardElementPhoto.alt = this._name;
    this._cardElementTitle.textContent = this._name;

    this._setEventListeners();

    return this._element;
  }

  /** Функция лайка карточки **/
  _handleLike(){
    this._cardElementLike.classList.toggle("btn-heart_active");
  }

  /** Функция удаления карточки **/
  _handleDelete() {
    this._element.remove();
    this._element = null;
  }

  /**Слушатели событий **/
  _setEventListeners() {
    this._cardElementLike.addEventListener('click', this._handleLike.bind(this));
    this._cardElementDel.addEventListener('click', this._handleDelete.bind(this));
    this._cardElementPhoto.addEventListener('click', () => {
      this._openCardImagePopup({
        link: this._link,
        name: this._name, 
      })
    })
  }
}

export { Card };