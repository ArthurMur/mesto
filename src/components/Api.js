export class Api {
  constructor({link, headers}) {
    this._link = link;
    this._headers = headers;
  }
  //Метод отбраоботки сервера 
  _serverResponse(res){
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }
  //Инициализация карточек с сервака
  getInitialCards(){
    return fetch(`${this._link}cards`, {
    headers: this._headers
    })
    .then(res => this._serverResponse(res));
  }

  // Получение информации карточек и информации от пользователя
  getAppInfo() {
    return Promise.all([this.getInitialCards(), this.getUserData()]); // передаю массив промисов. Первыми - карточки, вторым запрос к информации о пользователе
  }

  //Добавление новой карточки на сервак
  addNewCard({name, link}){
    return fetch(`${this._link}cards`, {
      headers: this._headers,
      method: 'POST',
      body: JSON.stringify({ name, link })
    })
      .then(res => { return this._serverResponse(res); })
  }
  
  // Удаления карточки с сервака
  deleteCard(cardId) {
    return fetch(`${this._link}cards/${cardId}`, {
      headers: this._headers,
      method: 'DELETE',
    })
      .then(res => { return this._serverResponse(res); })
  }

  // Получение данных пользователя с сервака
  getUserData() {
  return fetch(`${this._link}users/me`, {
    headers: this._headers
  })
    .then(res => { return this._serverResponse(res); })
  }

  // Отправка данных пользователя на сервак
  sendUserData(profileData) {
    return fetch(`${this._link}users/me`, {
      headers: this._headers,
      method: 'PATCH',
      body: JSON.stringify({ name: profileData.username, about: profileData.description })
    })
      .then(res => { return this._serverResponse(res); })
  }

  // Отправка данных о новом аватаре на сервак
  sendAvatarData(avatarLink) {
    return fetch(`${this._link}users/me/avatar`, {
      headers: this._headers,
      method: 'PATCH',
      body: JSON.stringify({ avatar: avatarLink.avatar })
    })
      .then(res => { return this._serverResponse(res); })
  }

  // Отправка лайка на сервак
  putLike(cardId) {
    return fetch(`${this._link}cards/${cardId}/likes`, {
      headers: this._headers,
      method: 'PUT',
    })
      .then(res => { return this._serverResponse(res); })
  }

  // Удаление лайка с сервака
  deleteLike(cardId) {
    return fetch(`${this._link}cards/${cardId}/likes`, {
      headers: this._headers,
      method: 'DELETE',
    })
      .then(res => { return this._serverResponse(res); })
  }
}