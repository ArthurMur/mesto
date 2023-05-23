export class UserInfo {
  // Класс принимает объект с селекторами двух элементов: элемента имени пользователя и элемента информации о себе
  constructor({ usernameSelector, userDescrSelector }) {
    this._username = document.querySelector(usernameSelector);
    this._userDescription = document.querySelector(userDescrSelector);
  }

  //Отдаем объект с данными
  getUserInfo() {
    return {
      username: this._username.textContent,
      description: this._userDescription.textContent
    };
  }

  // Принимаем новые данные и отражаем на странице
  setUserInfo({ username, description }) {
    this._username.textContent = username;
    this._userDescription.textContent = description;
  }
}