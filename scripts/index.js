import {initialCards} from "./cards.js"
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";


//Переменные для попап редактирования профиля
const popupAuthor = document.querySelector(".popup_type_author");
const formAuthor = popupAuthor.querySelector(".popup__form_type_author");
const popupAuthorOpenBtn = document.querySelector(".profile__edit-button");
const nameInput = formAuthor.querySelector(".popup__info_input_name");
const jobInput = formAuthor.querySelector(".popup__info_input_job");
const profileName = document.querySelector(".profile__text-title");
const profileJob = document.querySelector(".profile__text-subtitle");

// Переменные для popup card
const popupCard = document.querySelector(".popup_type_card");
const formCard = popupCard.querySelector(".popup__form_type_card");
const popupCardOpenBtn = document.querySelector(".button-add");
const nameCardInput = formCard.querySelector(".popup__info_input_card-name");
const linkCardInput = formCard.querySelector(".popup__info_input_card-link");


// Переменные для попапа с картинкой
const popupImage = document.querySelector(".popup_type_image");
const imageLink = popupImage.querySelector(".popup__image-foto");
const imageSign = popupImage.querySelector(".popup__image-sign");

//Переменные для темпла
const cardsContainer = document.querySelector(".card__list");

const config = {
  formSelector: ".popup__form",
  inputSelector: ".popup__info",
  submitButtonSelector: ".popup__save",
  inactiveButtonClass: "popup__save_inactive",
  inputErrorClass: "popup__info_type_active",
  errorClass: "popup__info-error_active",
};

const editFormValidator = new FormValidator(config, popupAuthor);
const addFormValidator = new FormValidator(config, popupCard);

//функция закрытия popup по нажатию на клавишу Esc
function closeEscPopup(evt) {
  if (evt.key === "Escape") {
    const popup = document.querySelector(".popup_opened");
    closePopup(popup);
  }
}

//Функция для открытия и закрытия попапов
const openPopup = function (popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keyup", closeEscPopup); // слушатель клика ESC
};
const closePopup = function (popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keyup", closeEscPopup); // удалить событие keyup ESC
};

//Закрытие попапа по крестику и внешней области
const popupContainers = document.querySelectorAll(".popup");
popupContainers.forEach((popup) => {
  const buttonClosePopup = popup.querySelector(".popup__close");
  popup.addEventListener("click", function (event) {
    if (event.target === event.currentTarget || event.target === buttonClosePopup) {
      closePopup(popup);
    }
  });
});

//Открытие попапа автора
popupAuthorOpenBtn.addEventListener("click", function () {
  openPopup(popupAuthor);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
});

//Сохранение данных автора
function handleFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popupAuthor);
  
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formAuthor.addEventListener("submit", handleFormSubmit);

//Открытие попапа для фото
popupCardOpenBtn.addEventListener("click", function () {
  nameCardInput.value = "";
  linkCardInput.value = "";
  openPopup(popupCard);
});

//Работа с карточками


// //Открытие большой картинки
function openPopupFoto(name, link) {
  imageLink.src = link;
  imageLink.alt = name;
  imageSign.textContent = name;

  openPopup(popupImage);
};

const createCard = (data) => {
  const card = new Card(data, ".card-template", openPopupFoto);
  return card.generateCard();
 
}

initialCards.forEach((data) => {
  const cardElement = createCard(data);
  cardsContainer.append(cardElement);
});


// Добовление карточки пользователем
formCard.addEventListener("submit", (e) => {
  e.preventDefault();

  const cardElement = createCard({
    name: nameCardInput.value,
    link: linkCardInput.value,
  });

  cardsContainer.prepend(cardElement);
  closePopup(popupCard);
  e.submitter.classList.add('popup__save_inactive');
  e.submitter.disabled = true;
});


editFormValidator.enableValidation();
addFormValidator.enableValidation();

