export const container = document.querySelector(".container");
export const popups = Array.from(document.querySelectorAll('.popup'));
export const popupAuthor = document.querySelector(".popup-author");
export const popupCard = document.querySelector(".popup-card");
export const popupImage = document.querySelector(".popup-image");
export const formElementAuthor = popupAuthor.querySelector(".popup-form");
export const formElementCard = popupCard.querySelector(".popup-card-form");
export const editButton = container.querySelector(".btn-edit");
export const addButton = container.querySelector(".btn-add");
export const buttonSaveCard = popupCard.querySelector(".btn-save");
export const buttonsClose = document.querySelectorAll(".popup-close");
export const authorInput = document.querySelector(".popup-text_author");
export const descrInput = document.querySelector(".popup-descr");
export const profileAuthor = container.querySelector('.profile__author');
export const profileDescr = container.querySelector('.profile__descr');
export const cardsContainer = container.querySelector('.elements');
export const elementsTemplete = document.querySelector('#elements__item').content;
export const popupImageImg = popupImage.querySelector('.popup-image-img');
export const popupImageText = popupImage.querySelector('.popup-image-text');
export const cardNameInput = document.getElementById("card-name");
export const cardSourceInput = document.getElementById("card-source");

export const cards = [
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

