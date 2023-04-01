import { cards } from "./cards.js";

const container = document.querySelector(".container");
const popupAuthor = document.querySelector(".popup-author");
const popupCard = document.querySelector(".popup-card");
const popupImage = document.querySelector(".popup-image");
const formElementAuthor = popupAuthor.querySelector(".popup-form");
const formElementCard = popupCard.querySelector(".popup-card-form");
const editButton = container.querySelector(".btn-edit");
const addButton = container.querySelector(".btn-add");
const closeButtons = document.querySelectorAll(".popup-close");
const authorInput = document.getElementById("author");
const descrInput = document.getElementById("descr");
const profileAuthor = container.querySelector('.profile__author');
const profileDescr = container.querySelector('.profile__descr');
const cardsContainer = container.querySelector('.elements');
const elementsTemplete = document.querySelector('#elements__item').content;
const popupImageImg = popupImage.querySelector('.popup-image-img');
const popupImageText = popupImage.querySelector('.popup-image-text');
const cardNameInput = document.getElementById("card-name");
const cardSourceInput = document.getElementById("card-source");

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(...popups) {
  popups.forEach(popup => {
    if (popup) {
      popup.classList.remove('popup_opened');
    }
  });
}

function addAuthor(event) {
  event.preventDefault();

  profileAuthor.textContent = authorInput.value;
  profileDescr.textContent = descrInput.value;

  closePopup(popupAuthor);
}

const createCardElement = (cardData) => {

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

  cardNameInput.value = '';
  cardSourceInput.value = '';

  return elementsElement;
}

const cardImagePopup = (cardData) => {
  popupImageImg.src = cardData.link;
  popupImageImg.alt = cardData.name;
  popupImageText.textContent = cardData.name;

  popupImage.classList.add('popup_opened');
}

const renderCardElement = (elementsElement) => {
  cardsContainer.prepend(elementsElement);
  
};

cards.forEach((card) => {
  const element = createCardElement(card);
  renderCardElement(element);
});

const cardSubmit = (event) => {
  event.preventDefault();

  const name = cardNameInput.value;
  const link = cardSourceInput.value;

  const cardData = {
    name,
    link,
  };  

  renderCardElement(createCardElement(cardData));
  closePopup(popupCard);
};

formElementCard.addEventListener("submit", cardSubmit); 
closeButtons.forEach((button) => button.addEventListener('click', () => {closePopup(popupAuthor, popupCard, popupImage);}));
editButton.addEventListener("click", () => {openPopup(popupAuthor);});
addButton.addEventListener('click', () => {openPopup(popupCard);});
formElementAuthor.addEventListener('submit', addAuthor);


