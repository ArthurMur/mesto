import {Card} from "./cards.js";
import {FormValidator, formValidationConfig} from "./FormValidator.js";

const container = document.querySelector(".container");
const popups = Array.from(document.querySelectorAll('.popup'));
const popupAuthor = document.querySelector(".popup-author");
const popupCard = document.querySelector(".popup-card");
const popupImage = document.querySelector(".popup-image");
const formElementAuthor = popupAuthor.querySelector(".popup-form");
const formElementCard = popupCard.querySelector(".popup-card-form");
const editButton = container.querySelector(".btn-edit");
const addButton = container.querySelector(".btn-add");
const buttonSaveCard = popupCard.querySelector(".btn-save");
const buttonsClose = document.querySelectorAll(".popup-close");
const authorInput = document.querySelector(".popup-text_author");
const descrInput = document.querySelector(".popup-descr");
const profileAuthor = container.querySelector('.profile__author');
const profileDescr = container.querySelector('.profile__descr');
const cardsContainer = container.querySelector('.elements');
const elementsTemplete = document.querySelector('#elements__item').content;
const popupImageImg = popupImage.querySelector('.popup-image-img');
const popupImageText = popupImage.querySelector('.popup-image-text');
const cardNameInput = document.getElementById("card-name");
const cardSourceInput = document.getElementById("card-source");

const cards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

/** Общая функция открытия Popup **/
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEscape);
}

/** Общая функция закртытия Popup **/
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEscape);
}

/**Функция закрытия по клавише Esc **/
function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened') 
    closePopup(openedPopup);
  }
}

/** Функция добавления автора и описания **/
function addAuthor(event) {
  event.preventDefault();
  profileAuthor.textContent = authorInput.value;
  profileDescr.textContent = descrInput.value;
  closePopup(popupAuthor);
}

/** Функция создания карточки **/
const createCardElement = (cardData) => {
  const card = new Card(cardData, '#elements__item', openCardImagePopup);

  return card.generateCard();
}

/** Функция открытия просмотра изображения карточки **/
const openCardImagePopup = (cardImage) => {
  openPopup(popupImage);

  popupImageImg.src = cardImage.link;
  popupImageImg.alt = cardImage.name;
  popupImageText.textContent = cardImage.name;
}

/** Создание карточек из массива **/
cards.forEach((cardData) => {
  cardsContainer.prepend(createCardElement(cardData));
});

const submitCardElement = (event) => {
  event.preventDefault();

  const cardData = {
    name: cardNameInput.value,
    link: cardSourceInput.value,
  }; 

  renderCard(cardData);

  event.target.reset();
  closePopup(popupCard);
  validationFormPlace.enableValidation();
};

/** Функция добавления новой карточки в начало блока **/
const renderCard = (card) => {
  cardsContainer.prepend(createCardElement(card));
};

formElementCard.addEventListener("submit", submitCardElement); 

/** Слушатели на все кнопки для закрытия попапов **/
buttonsClose.forEach(button => {
  const buttonsPopup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(buttonsPopup));
});

editButton.addEventListener("click", () => {
  authorInput.value = profileAuthor.textContent;
  descrInput.value = profileDescr.textContent;
  openPopup(popupAuthor);
});

addButton.addEventListener('click', () => {
  openPopup(popupCard);
});

formElementAuthor.addEventListener('submit', addAuthor);

/** Закрытие по клику на оверлей **/
popups.forEach(popup => {
  popup.children[0].addEventListener('mouseover', () => {
    popup.style.cursor = 'default';
  });
  
  popup.children[0].addEventListener('mouseleave', () => {
    popup.style.cursor = 'pointer';
  });
  
  popup.addEventListener('click', event => {
    if (event.target === popup) {
      closePopup(popup);
    }
  });
});

/** Валидация форм **/
const validationFormProfile = new FormValidator(formValidationConfig, formElementAuthor);
validationFormProfile.enableValidation();

const validationFormPlace = new FormValidator(formValidationConfig, formElementCard);
validationFormPlace.enableValidation();

export {cards}
