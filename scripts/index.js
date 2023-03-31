import { cards } from "./cards.js";

const container = document.querySelector(".container");
const popup = document.querySelector(".popup");
const popupCard = document.querySelector(".popup-card");
const popupImage = document.querySelector(".popup-image");
const formElement = popup.querySelector(".popup-form");
const formElementCard = popupCard.querySelector(".popup-card-form");
const editButton = container.querySelector(".btn-edit");
const addButton = container.querySelector(".btn-add");
const closeButton = document.querySelectorAll(".popup-close");
const authorInput = document.getElementById("author");
const descrInput = document.getElementById("descr");
const profileAuthor = container.querySelector('.profile__author');
const profileDescr = container.querySelector('.profile__descr');
const elements = container.querySelector('.elements');

function openPopup() {
  popup.classList.add('popup_opened');
  
  authorInput.value = profileAuthor.innerText;
  descrInput.value = profileDescr.innerText;
}

function openPopupCard() {
  popupCard.classList.add('popup_opened');
}

function closePopup() {
  popup.classList.remove('popup_opened');
  popupCard.classList.remove('popup_opened');
  popupImage.classList.remove('popup_opened');
}

function addAuthor(event) {
  event.preventDefault();

  profileAuthor.innerText = authorInput.value;
  profileDescr.innerText = descrInput.value;

  closePopup();
}

const createCardElement = (cardData) => {
  const elementsTemplete = document.querySelector('#elements__item').content;
  const elementsElement = elementsTemplete.querySelector('.elements__item').cloneNode(true);
  
  const img = elementsElement.querySelector('.elements__img');
  const text = elementsElement.querySelector('.elements__text');

  img.src = cardData.link;
  img.alt = cardData.name;
  text.textContent = cardData.name;

  const heartButton = elementsElement.querySelector(".btn-heart");
  const deleteButton = elementsElement.querySelector(".btn-delete");
  const cardImage = elementsElement.querySelector(".elements__img");

  const handleDelete = () => {
    elementsElement.remove();
  };

  const handleLike = () => {
    heartButton.classList.toggle("btn-heart_active");
  };

  const openCardImage = () => {
    cardImagePopup(cardData);
  };

  cardImage.addEventListener('click', openCardImage);
  deleteButton.addEventListener("click", handleDelete);
  heartButton.addEventListener("click", handleLike);

  return elementsElement;
}

const cardImagePopup = (cardData) => {
  popupImage.querySelector('.popup-image-img').src = cardData.link;
  popupImage.querySelector('.popup-image-img').alt = cardData.name;
  popupImage.querySelector('.popup-image-text').textContent = cardData.name;

  popupImage.classList.add('popup_opened');
}

const renderCardElement = (elementsElement) => {
  elements.prepend(elementsElement);
};

cards.forEach((card) => {
  const element = createCardElement(card);
  renderCardElement(element);
});

const cardSubmit = (event) => {
  event.preventDefault();

  const cardNameInput = document.getElementById("card-name");
  const cardSourceInput = document.getElementById("card-source");

  const name = cardNameInput.value;
  const link = cardSourceInput.value;

  const cardData = {
    name,
    link,
  };  

  renderCardElement(createCardElement(cardData));
  closePopup();
};

formElementCard.addEventListener("submit", cardSubmit); 

closeButton.forEach((button) => button.addEventListener('click', closePopup));
editButton.addEventListener('click', openPopup);
addButton.addEventListener('click', openPopupCard);
formElement.addEventListener('submit', addAuthor);


