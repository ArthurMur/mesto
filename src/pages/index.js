import './index.css';
import {Card} from "../components/Card.js";
import {FormValidator, formValidationConfig} from "../components/FormValidator.js";
import {Section} from "../components/Section.js";
import {
  formElementAuthor, formElementCard,
  formElementAvatar, buttonEditAvatar,
  editButton, addButton,
  authorInput, descrInput
} from "../utils/constants.js";
import {apiFindings} from '../utils/apiFindings.js';
import {PopupWithImage} from "../components/PopupWithImage.js";
import {PopupWithForm} from "../components/PopupWithForm.js";
import {PopupWithConfirmation} from "../components/PopupWithConfirmation.js";
import {UserInfo} from "../components/UserInfo.js";
import { Api } from '../components/Api.js';

// Объявление экземпляра API
const api = new Api(apiFindings);

// Переменная для хранения ID пользователя
let userId;

// Получение данных пользователя
const userInfo = new UserInfo({
  usernameSelector: '.profile__author',
  userDescrSelector: '.profile__descr',
  userAvatarSelector: '.profile__avatar',
});

/** Функция создания карточки **/
const createCardElement = (cardData) => {
  const card = new Card(cardData, '#elements__item', userId, { cardId: cardData._id, authorId: cardData.owner._id, }, {
    // Просмотр картинки
    handleCardClick: (name, image) => { popupImageZoom.open(name, image) },
    // Удаление карточки
    handleDelete: (cardElement, cardId) => { popupConfirmationDelete.open(cardElement, cardId) },                  
    handleLike: (cardId) => { api.putLike(cardId)
      .then((res) => {
        card.renderLike(res);
      })
      .catch((err) => { console.log(`При лайке возникла ошибка, ${err}`) })
    },
    // Удаление лайка
    handleDeleteLike: (cardId) => { api.deleteLike(cardId)
      .then((res) => {
        card.renderLike(res);
      })
      .catch((err) => { console.log(`При дизлайке карточки возникла ошибка, ${err}`) })
    },
  });
  return card.generateCard();
}

/** Создание и наполнение страницы карточками **/
const makeCards = new Section({
    renderer: (cardData) => {
      makeCards.addItem(createCardElement(cardData))
    }
  }, '.elements');

api.getAppInfo().then(([cardData, userProfileData]) => {
  userId = userProfileData._id;
  userInfo.setUserInfo({ username: userProfileData.name, description: userProfileData.about });
  makeCards.renderItems(cardData.reverse());     
  userInfo.setUserAvatar(userProfileData.avatar);
}).catch((err) => { console.log(`Возникла ошибка, ${err}`) });

// Объявление popup всплывающей картинки
const popupImageZoom = new PopupWithImage('.popup-image');
popupImageZoom.setEventListeners();

// Объявление popup добавления новой карточки
const popupAddCard = new PopupWithForm('.popup-card', {
  callbackFormSubmit: (formValues) => { popupAddCard.putSavingText(); api.addNewCard({ name: formValues.cardname, link: formValues.cardsource })
  .then((card) => {
    makeCards.addItem(createCardElement(card));
    popupAddCard.close();
  })
  .catch((err) => { console.log(`При добавлении карточки возникла ошибка, ${err}`) })
  .finally(() => {
    popupAddCard.returnSavingText();
  })
  }
});

popupAddCard.setEventListeners();

// Объявление popup редактирования профиля
const popupEditeProfile = new PopupWithForm('.popup-author', {
  callbackFormSubmit: (userProfileData) => { popupEditeProfile.putSavingText(); api.sendUserData(userProfileData)
    .then((res) => {
      userInfo.setUserInfo({ username: res.name, description: res.about });
      popupEditeProfile.close();
    })
    .catch((err) => { console.log(`При редактировании профиля возникла ошибка, ${err}`) })
    .finally(() => {
      popupEditeProfile.returnSavingText();
    })
  }
});

popupEditeProfile.setEventListeners();

// Объявление popup редактирования аватара
const popupEditeAvatar = new PopupWithForm('.popup-avatar', {
  callbackFormSubmit: (userProfileData) => {popupEditeAvatar.putSavingText(), api.sendAvatarData(userProfileData)
    .then((res) => {
      userInfo.setUserAvatar(res.avatar);
      popupEditeAvatar.close();
    })
    .catch((err) => { console.log(`При обновлении аватара возникла ошибка, ${err}`) })
    .finally(() => {
      popupEditeAvatar.returnSavingText();  
    })
  }
});

popupEditeAvatar.setEventListeners();

// Объявление popup подтверждения удаления карточки
const popupConfirmationDelete = new PopupWithConfirmation(".popup-delete", {
  callbackConfirmation: (cardElement, cardId) => { api.deleteCard(cardId)
      .then(() => {
        cardElement.handleDelete();
        popupConfirmationDelete.close();
      })
      .catch((err) => { console.log(`При удалении карточки возникла ошибка, ${err}`) })
  }
});
popupConfirmationDelete.setEventListeners();

/** Валидация форм **/
const validationFormProfile = new FormValidator(formValidationConfig, formElementAuthor);
validationFormProfile.enableValidation();

const validationFormPlace = new FormValidator(formValidationConfig, formElementCard);
validationFormPlace.enableValidation();

const validationFormAvatar = new FormValidator(formValidationConfig, formElementAvatar);
validationFormAvatar.enableValidation();

// Слушатель на кнопку редактирования профиля
editButton.addEventListener('click', () => {
  popupEditeProfile.open();
  const userInfoActual = userInfo.getUserInfo();
  authorInput.value = userInfoActual.username;
  descrInput.value = userInfoActual.description;
});

//Слушатель на конопку редактирования профиля
buttonEditAvatar.addEventListener('click', function () {
  popupEditeAvatar.open();
  validationFormAvatar.clearValidationForm();
});

// Слушатель на иконку добавления карточки
addButton.addEventListener('click', () => {
  popupAddCard.open();
  validationFormPlace.clearValidationForm();
});