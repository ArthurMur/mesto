let container = document.querySelector(".container");
let popup = document.querySelector(".popup");
let formElement = popup.querySelector(".popup-form");
let editButton = container.querySelector(".btn-edit");
let heartButtons = container.querySelectorAll(".btn-heart");
let closeButton = popup.querySelector(".popup-close");
let authorInput = document.getElementById("author");
let descrInput = document.getElementById("descr");
let profileAuthor = container.querySelector('.profile__author');
let profileDescr = container.querySelector('.profile__descr');

function openPopup() {
  popup.classList.add('popup_opened');
  authorInput.value = profileAuthor.innerText;
  descrInput.value = profileDescr.innerText;
}

function closePopup() {
  popup.classList.remove('popup_opened');
}

function addAuthor(event) {
  event.preventDefault();
  profileAuthor.innerText = authorInput.value;
  profileDescr.innerText = descrInput.value;
  closePopup();
}

closeButton.addEventListener('click', closePopup);
editButton.addEventListener('click', openPopup);
formElement.addEventListener('submit', addAuthor);

heartButtons.forEach(button => {
  button.addEventListener('click', () => {
    button.classList.toggle('btn-heart_active');
  });
});