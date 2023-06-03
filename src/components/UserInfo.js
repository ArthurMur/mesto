export class UserInfo {
  // Класс принимает объект с селекторами тре элементов: элемента имени пользователя, элемента информации о себе и элемента автара
  constructor({ usernameSelector, userDescrSelector, userAvatarSelector }) {
    this._username = document.querySelector(usernameSelector);
    this._userDescription = document.querySelector(userDescrSelector);
    this._avatarLink = document.querySelector(userAvatarSelector);
  }

  // Отдаем объект с данными
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

  // Изменяем аватар пользователя
  setUserAvatar(avatarLink) {
    this._avatarLink.src = avatarLink;
  }
}