class Card {
  constructor(data, templateSelector, userId, authorData, handleActions) {
    this._card = data;
    this._name = this._card.name;
    this._link = this._card.link;
    this._templateSelector = templateSelector;
    this._handleCardClick =  handleCardClick;

    this._userId = userId;
    this._cardId = authorData.cardId;
    this._authorId = authorData.authorId;

    this._cardClick = handleActions.handleCardClick;
    this._cardDelete = handleActions.handleDelete;
    this._putLike = handleActions.handleLike;
    this._deleteLike = handleActions.handleDeleteLike;
  }

  /** Получить шаблон **/
  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.elements__item')
      .cloneNode(true);

    return cardElement;
  }

  /** Сгенерировать карточку **/
  generateCard() {
    this._element = this._getTemplate();
    this._cardElementTitle = this._element.querySelector('.elements__text');
    this._cardElementPhoto = this._element.querySelector('.elements__img');
    this._cardElementLike = this._element.querySelector('.btn-heart');
    this._cardElementDel = this._element.querySelector('.btn-delete');
    this.likeSelector = this._element.querySelector('.btn-heart-counter');

    this._cardElementPhoto.src = this._link;
    this._cardElementPhoto.alt = this._name;
    this._cardElementTitle.textContent = this._name;
    this.renderLike(this._card);

    this._setEventListeners();

    return this._element;
  }

  /** Отображение лайков и их количества **/
  renderLike(card) {
    this._likeArea = card.likes;
    if (this._likeArea.length === 0) {
      this.likeSelector.textContent = '';
    } else {
      // Отображение количества лайков из ответа сервера
      this.likeSelector.textContent = this._likeArea.length;
    }
    if (this._likedCard()) {
      this._cardElementLike.classList.add('btn-heart_active');
    } else {
      this._cardElementLike.classList.remove('btn-heart_active');
    }
  }

  // Проверка присутствия лайка на карточке
  _likedCard() {
    return this._likeArea.find(userLike => userLike._id === this._userId);
  }

  // Обработка добавления и снятия лайков
  _interactLike() {
    if (this._likedCard()) {
      this._deleteLike(this._cardId);
    } else {
      this._putLike(this._cardId);
    }
  }

  /** Функция удаления карточки **/
  _handleDelete() {
    this._element.remove();
    this._element = null;
  }

  /**Слушатели событий **/
  _setEventListeners() {
    this._cardElementLike.addEventListener('click', () => this._interactLike());
    this._cardElementDel.addEventListener('click', this._handleDelete.bind(this));
    this._cardElementPhoto.addEventListener('click', () => this._cardClick(this._name, this._link));

    if (this._userId === this._authorId) {
      this._cardElementDel.addEventListener('click', () =>  this._cardDelete(this, this._cardId));
    } else {
      this._cardElementDel.remove();
    }
  }
}

export { Card };