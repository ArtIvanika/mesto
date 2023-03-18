const arkhyzImage = new URL('../images/arkhyz.jpeg', import.meta.url);
const chelyabinskOblastImage = new URL('../images/chelyabinsk-oblast.jpeg', import.meta.url);
const severnoeSiyanieImage = new URL('../images/severnoe-siyanie.jpeg', import.meta.url);
const kamchatkaBearsImage = new URL('../images/kamchatka-bears.jpeg', import.meta.url);
const elbrusImage = new URL('../images/elbrus.jpeg', import.meta.url);
const baykalImage = new URL('../images/baykal.jpeg', import.meta.url);



export const initialCards = [
  {
    name: "Архыз",
    link: arkhyzImage  
  },
  {
    name: "Челябинская область",
    link: chelyabinskOblastImage
  },
  {
    name: "Северное сияние",
    link: severnoeSiyanieImage
  },
  {
    name: "Камчатка",
    link: kamchatkaBearsImage
  },
  {
    name: "Эльбрус",
    link: elbrusImage
  },
  {
    name: "Байкал",
    link: baykalImage
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
