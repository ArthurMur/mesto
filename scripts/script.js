
var container = document.querySelector(".container");
var popup = container.querySelector(".popup");
var overlay = container.querySelector(".overlay");
var editButton = container.querySelector(".btn-edit");
var closeButton = popup.querySelector(".popup-close");
var saveButton = popup.querySelector(".btn-save");
var heartButtons = container.querySelectorAll(".btn-heart");
var authorInput = popup.querySelector('.popup-author');
var descrInput = popup.querySelector('.popup-descr');
var profileAuthor = container.querySelector('.profile__author');
var profileDescr = container.querySelector('.profile__descr');

function openPopup() {
  popup.classList.add('popup_opened');
  overlay.classList.add('overlay_dark');
  authorInput.value = profileAuthor.innerText;
  descrInput.value = profileDescr.innerText;
  overlay.addEventListener("click", closePopup);
}

function closePopup() {
  popup.classList.remove('popup_opened');
  overlay.classList.remove('overlay_dark');
  overlay.removeEventListener("click", closePopup);
}

function addAuthor(event) {
  event.preventDefault();
  let author = authorInput.value;
  let descr = descrInput.value;
  profileAuthor.innerText = author;
  profileDescr.innerText = descr;
  closePopup();
}

closeButton.addEventListener('click', closePopup);
editButton.addEventListener('click', openPopup);
saveButton.addEventListener('click', addAuthor);

heartButtons.forEach(button => {
  button.addEventListener('click', () => {
    button.classList.toggle('btn-heart_active');
  });
});