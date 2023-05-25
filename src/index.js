import './index.css';
import {Card} from "./components/cards.js";
import {FormValidator, formValidationConfig} from "./components/FormValidator.js";
import {Section} from "./components/Section.js";
import {cards} from "./components/utils/constants.js";
import {
  formElementAuthor, formElementCard,
  editButton, addButton,
  authorInput, descrInput,
} from "./components/utils/constants.js";
import {PopupWithImage} from "./components/PopupWithImage.js";
import {PopupWithForm} from "./components/PopupWithForm.js";
import {UserInfo} from "./components/UserInfo.js";

// Объявление popup всплывающей картинки
const popupImageZoom = new PopupWithImage('.popup-image');
popupImageZoom.setEventListeners();

// Функция всплытия картинки
const handleCardClick = function (cardData) {
  popupImageZoom.open(cardData);
}

// Получение данных пользователя
const userInfo = new UserInfo({
  usernameSelector: '.profile__author',
  userDescrSelector: '.profile__descr'
});

/** Функция создания карточки **/
const createCardElement = (cardData) => {
  const card = new Card(cardData, '#elements__item', handleCardClick);
  return card.generateCard();
}

/** Создание и наполнение страницы карточками **/
const makeCards = new Section({
    items: cards,
    renderer: (item) => {
      makeCards.addItem(createCardElement(item))
    }
  }, '.elements');

makeCards.renderItems();

// Объявление popup добавления новой карточки
const popupAddCard = new PopupWithForm('.popup-card', {
  callbackFormSubmit: (formValues) => {
    makeCards.addItem(createCardElement({
      name: formValues.cardname,
      link: formValues.cardsource 
    }));
    popupAddCard.close();
  }
});

popupAddCard.setEventListeners();

// Объявление popup редактирования профиля
const popupEditeProfile = new PopupWithForm('.popup-author', {
  callbackFormSubmit: (profileData) => {
    userInfo.setUserInfo({
      username: profileData['popup-author'],
      description: profileData['popup-descr']
    });
    popupEditeProfile.close();
  }
});

popupEditeProfile.setEventListeners();

/** Валидация форм **/
const validationFormProfile = new FormValidator(formValidationConfig, formElementAuthor);
validationFormProfile.enableValidation();

const validationFormPlace = new FormValidator(formValidationConfig, formElementCard);
validationFormPlace.enableValidation();

// Слушатель на кнопку редактирования профиля
editButton.addEventListener('click', () => {
  popupEditeProfile.open();
  const userInfoActual = userInfo.getUserInfo();
  authorInput.value = userInfoActual.username;
  descrInput.value = userInfoActual.description;
});

// Слушатель на иконку добавления карточки
addButton.addEventListener('click', () => {
  popupAddCard.open();
  validationFormPlace.clearValidationForm();
});

export {cards}