import "./../index.html";
import "./index.css";
import {
  popupAuthorOpenBtn,
  nameInput,
  jobInput,
  profileName,
  profileJob,
  popupAvatarOpenBtn,
  profileAvatar,
  popupCardOpenBtn,
  config,
} from "../utils/constants.js";
import Section from "../components/Section.js";
import Card from "../components/Сard.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation";

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-63",
  headers: {
    authorization: "22a3f4d4-5ffd-4789-9813-a7106adf4dad",
    "Content-Type": "application/json",
  },
});

//-------------------------------------------- Валидация ----------------------------------------
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

// ------------------------------------------ Работа с данными --------------------------------------
let userId;

// данные пользователя с сервера
Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cards]) => {
    userId = userData._id;
    userInfo.setUserInfo(userData);
    userInfo.setAvatarInfo(userData);
    cardList.renderItems(cards);
  })
  .catch((err) => console.log(err));

const userInfo = new UserInfo({
  name: profileName,
  about: profileJob,
  avatar: profileAvatar,
});
//---------------------------------------------- Попап Автора ---------------------------------
// Попап редактирования данных автора
const popupEditProfile = new PopupWithForm(
  ".popup_type_author",
  handleProfileFormSubmit
);
popupEditProfile.setEventListeners();

//Открытие попапа автора
popupAuthorOpenBtn.addEventListener("click", function () {
  popupEditProfile.open();
  formValidators["profile-form"].resetValidation();
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
});

//Сохранение данных автора
function handleProfileFormSubmit(data) {
  popupEditProfile.renderLoading(true, "Сохраниние...");
  api
    .editUserInfo(data)
    .then((res) => {
      userInfo.setUserInfo(res);
    })
    .then(() => popupEditProfile.close())
    .catch((err) => console.log(err))
    .finally(() => {
      popupEditProfile.renderLoading(false);
    });
}

//---------------------------------------------- Попап Аватарки ---------------------------------

//Попап редактирования аватарки
const popupEditAvatar = new PopupWithForm(
  ".popup_type_ava",
  handleAvatarFormSubmit
);
popupEditAvatar.setEventListeners();

popupAvatarOpenBtn.addEventListener("click", function () {
  popupEditAvatar.open();
  formValidators["ava-form"].resetValidation();
});

function handleAvatarFormSubmit(data) {
  popupEditAvatar.renderLoading(true, "Сохраниние...");
  api
    .editUserAvatar(data)
    .then((res) => {
      userInfo.setAvatarInfo(res);
    })
    .then(() => popupEditAvatar.close())
    .catch((err) => console.log(err))
    .finally(() => {
      popupEditAvatar.renderLoading(false);
    });
}
//-------------------------------------------------- Попап для добовления фото ---------------------------------
//Открытие попапа для фото
const popupAddCard = new PopupWithForm(
  ".popup_type_card",
  handleAddCardFormSubmit
);
popupAddCard.setEventListeners();

popupCardOpenBtn.addEventListener("click", function () {
  popupAddCard.open();
  formValidators["card-form"].resetValidation();
});

function handleAddCardFormSubmit(data) {
  popupAddCard.renderLoading(true, "Сохраниние...");
  api
    .addNewCard(data)
    .then((res) => {
      const cardElement = createCard(res, ".card-template");
      cardList.addPrependItem(cardElement);
      // cardList.addItem(createCard(res));

    })
    .then(() => popupAddCard.close())
    .catch((err) => console.log(err))
    .finally(() => {
      popupAddCard.renderLoading(false);
    });
}

//--------------------------------------------------- Работа с карточками ------------------------
let cardList;

//отрисовываем карточку
cardList = new Section(
  {
    renderer: (item) => {
      const cardElement = createCard(item, ".card-template");
      cardList.addItem(cardElement);
    },
  },
  ".card__list"
);

// создаем карточку
const createCard = (data) => {
  const card = new Card(
    {
      data: data,
      userId: userId,
      openPopupFoto,
      handleLikeCard: (cardId) => {
        api
            .putLike(cardId)
            .then((data) => {
              card.toggleLikeCard(data);
            })
            .catch((err) => {
              console.log(err);
            });
      },
      handleDeleteLikeCard: (cardId) => {
          api
      .deleteLike(cardId)
      .then((data) => {
        card.toggleLikeCard(data);
      })
      .catch((err) => {
        console.log(err);
      });
      },
      handleDeleteCard: (cardId, cards) => {
        popupDeleteCardId.open(cardId, cards);
        popupDeleteCardId.setSubmitAction((data) => {
          api
            .deleteCard(data.cardId)
            .then(() => {
              popupDeleteCardId.close();
              card.remove();
            })
            .catch((err) => {
              console.log(err);
            });
        });
      },
    },
    // openPopupFoto,
    ".card-template"
  );
  return card.generateCard();
};

// const popupOpenBtnDelCard = document.querySelector(".popup__save_type_delete");
// // попап удаления
const popupDeleteCardId = new PopupWithConfirmation(".popup_type_delete");
popupDeleteCardId.setEventListeners();

//--------------------------------------------------- Открытие большой фотографии -----------------------
//Открытие большой картинки
const popupWithFoto = new PopupWithImage(".popup_type_image");

function openPopupFoto({ name, link }) {
  popupWithFoto.open({ name, link });
}
popupWithFoto.setEventListeners();
