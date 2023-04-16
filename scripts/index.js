import { cards } from "./cards.js";

const container = document.querySelector(".container");
const popups = Array.from(document.querySelectorAll('.popup'));
const popupAuthor = document.querySelector(".popup-author");
const popupCard = document.querySelector(".popup-card");
const popupImage = document.querySelector(".popup-image");
const formElementAuthor = popupAuthor.querySelector(".popup-form");
const formElementCard = popupCard.querySelector(".popup-card-form");
const editButton = container.querySelector(".btn-edit");
const addButton = container.querySelector(".btn-add");
const saveButtonCard = popupCard.querySelector(".btn-save");
const closeButtons = document.querySelectorAll(".popup-close");
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

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEscape);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEscape);
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
    openCardImagePopup(cardData);
  };

  cardImage.addEventListener('click', openCardImage);
  deleteButton.addEventListener("click", handleDelete);
  heartButton.addEventListener("click", handleLike);

  return elementsElement;
}

const openCardImagePopup = (cardData) => {
  popupImageImg.src = cardData.link;
  popupImageImg.alt = cardData.name;
  popupImageText.textContent = cardData.name;

  openPopup(popupImage);
}

const renderCardElement = (elementsElement) => {
  cardsContainer.prepend(elementsElement);
  
};

cards.forEach((card) => {
  const element = createCardElement(card);
  renderCardElement(element);
});

const submitCardElement = (event) => {
  event.preventDefault();

  const name = cardNameInput.value;
  const link = cardSourceInput.value;

  const cardData = {
    name,
    link,
  };  

  renderCardElement(createCardElement(cardData));

  event.target.reset();
  closePopup(popupCard);
};

formElementCard.addEventListener("submit", submitCardElement); 

closeButtons.forEach(button => {
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
  saveButtonCard.classList.add('btn-save_inactive'); 
});
formElementAuthor.addEventListener('submit', addAuthor);

function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened') 
    closePopup(openedPopup);
  }
}

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

