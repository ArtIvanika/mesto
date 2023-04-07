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
export const popupAvatarOpenBtn = document.querySelector('.profile__foto-btn')
export const profileAvatar = document.querySelector('.profile__foto')

// Переменные для popup card
export const formCard = document.forms["card-form"];
export const popupCardOpenBtn = document.querySelector(".button-add");

export const config = {
  formSelector: ".popup__form",
  inputSelector: ".popup__info",
  submitButtonSelector: ".popup__save",
  inactiveButtonClass: "popup__save_inactive",
  inputErrorClass: "popup__info_type_active",
  errorClass: "popup__info-error_active",
};
