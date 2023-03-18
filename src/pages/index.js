import "./../index.html";
import "./index.css";
import {
  initialCards,
  popupAuthor,
  popupAuthorOpenBtn,
  nameInput,
  jobInput,
  profileName,
  profileJob,
  popupCard,
  popupCardOpenBtn,
  nameCardInput,
  linkCardInput,
  popupImage,
  cardsContainer,
  config,
} from "../utils/constants.js";
import Section from "../components/Section.js";
import Card from "../components/Сard.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";

const formValidators = {};

// Включение валидации
const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));

  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);
    // получаем данные из атрибута `name` у формы
    const formName = formElement.getAttribute("name");

    // вот тут в объект записываем под именем формы
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(config);

const popupEditProfile = new PopupWithForm(
  popupAuthor,
  handleProfileFormSubmit
);
popupEditProfile.setEventListeners();

const userInfo = new UserInfo({
  name: profileName,
  info: profileJob,
});

//Открытие попапа автора
popupAuthorOpenBtn.addEventListener("click", function () {
  popupEditProfile.open();
  formValidators["profile-form"].resetValidation();
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
});

//Сохранение данных автора
function handleProfileFormSubmit(values) {
  userInfo.setUserInfo({
    nameInput: values.name,
    infoInput: values.job,
  });
}

//Работа с карточками

// создаем карточку
const createCard = (data) => {
  const card = new Card(data, ".card-template", openPopupFoto);
  return card.generateCard();
};

//отрисовываем карточку
const cardList = new Section(
  {
    items: initialCards,
    renderer: createCard,
  },
  cardsContainer
);

cardList.renderItems();

//Открытие попапа для фото
const popupAddCard = new PopupWithForm(popupCard, handleAddCardFormSubmit);
popupAddCard.setEventListeners();

popupCardOpenBtn.addEventListener("click", function () {
  popupAddCard.open();
  formValidators["card-form"].resetValidation();
});

function handleAddCardFormSubmit() {
  const cardElement = createCard({
    name: nameCardInput.value,
    link: linkCardInput.value,
  });
  cardList.addItem(cardElement);
}

//Открытие большой картинки
const popupWithFoto = new PopupWithImage(popupImage);

function openPopupFoto(name, link) {
  popupWithFoto.open(name, link);
}
popupWithFoto.setEventListeners();
