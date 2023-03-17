export const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

//Переменные для попап редактирования профиля
export const popupAuthor = document.querySelector(".popup_type_author");
export const formAuthor = popupAuthor.querySelector(".popup__form_type_author");
export const popupAuthorOpenBtn = document.querySelector(
  ".profile__edit-button"
);
export const nameInput = formAuthor.querySelector(".popup__info_input_name");
export const jobInput = formAuthor.querySelector(".popup__info_input_job");
export const profileName = document.querySelector(".profile__text-title");
export const profileJob = document.querySelector(".profile__text-subtitle");

// Переменные для popup card
export const popupCard = document.querySelector(".popup_type_card");
export const formCard = document.forms["card-form"];
export const popupCardOpenBtn = document.querySelector(".button-add");
export const nameCardInput = formCard.querySelector(
  ".popup__info_input_card-name"
);
export const linkCardInput = formCard.querySelector(
  ".popup__info_input_card-link"
);

// Переменные для попапа с картинкой
export const popupImage = document.querySelector(".popup_type_image");

//Переменные для темпла
export const cardsContainer = document.querySelector(".card__list");

export const config = {
  formSelector: ".popup__form",
  inputSelector: ".popup__info",
  submitButtonSelector: ".popup__save",
  inactiveButtonClass: "popup__save_inactive",
  inputErrorClass: "popup__info_type_active",
  errorClass: "popup__info-error_active",
};
