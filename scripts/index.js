//Переменные для попап редактирования профиля
const popupElement = document.querySelector('.popup');
const formElement = popupElement.querySelector('.popup__input-container');
const popupOpenButton = document.querySelector('.profile__edit-button');
const popupCloseButton = document.querySelector('.popup__close');
const nameInput = formElement.querySelector('.popup__info_input_name'); 
const jobInput = formElement.querySelector('.popup__info_input_job');
const profileName = document.querySelector('.profile__text-title');
const profileJob = document.querySelector('.profile__text-subtitle');

// Переменные для popup card
const popupCard = document.querySelector('.popup_type_card');
const formCard = popupCard.querySelector('.popup__input-container_type_card');
const popupCardOpenBtn = document.querySelector('.button-add');
const popupCardCloseBtn = popupCard.querySelector('.popup__close');
const nameCardInput = formCard.querySelector('.popup__info_input_name_type_card'); 
const linkCardInput = formCard.querySelector('.popup__info_input_job_type_card');
const cardLink = document.querySelector('.card__foto');
const cardName = document.querySelector('.card__title');

// Переменные для попапа с картинкой
const popupImage = document.querySelector('.popup-image');
const formImage = popupImage.querySelector('.popup-image__container');
const popupImageOpenBtn = document.querySelector('.card__foto');
const popupImageCloseBtn = document.querySelector('.popup-image__close');
const imageLink = popupImage.querySelector('.popup-image__foto');
const imageSign = popupImage.querySelector('.popup-image__sign');

//Переменные для темпла
const template = document.querySelector('#card-template');
const cardList = document.querySelector('.card__list');
const cardItem = document.querySelector('.card__item');
const submitBtn = document.querySelector('.popup__save_type_card');

//Функция для открытия и закрытия попапов
const togglePopup = function (popup) {
    popup.classList.toggle('popup_opened')
}

//Открытие попапа автора
popupOpenButton.addEventListener('click', function(){
     togglePopup(popupElement);
      nameInput.value = profileName.textContent;
      jobInput.value = profileJob.textContent;
  });

//Закрытие попапа автора
popupCloseButton.addEventListener('click', function(){
    togglePopup(popupElement);
 });

//Сохранение данных автора
function handleFormSubmit (evt) {
    evt.preventDefault(); 
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;  
    togglePopup(popupElement);
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit);


//Открытие попапа для фото
popupCardOpenBtn.addEventListener('click', function(){
    nameCardInput.value = '';
    linkCardInput.value = '';
    togglePopup(popupCard);
   
 });

//Закрытие попапа для фото
popupCardCloseBtn.addEventListener('click', function(){
    togglePopup(popupCard);
 });

//Работа с карточками
const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];

//Удаление карточек
  function deleteCard(e) {
    e.target.closest('.card__item').remove();
  }

  //Функция лайков
   function heardActive(e) {
    e.target.classList.toggle('card__heart_active')
  }


//создаю одну карточку
function createCard(item){
      const card = template.content.cloneNode(true);
      card.querySelector('.card__title').textContent = item.name;
      card.querySelector('.card__foto').setAttribute('src', item.link);

      card.querySelector('.card__foto').addEventListener('click', function (){

        imageLink.src = item.link;
        imageSign.textContent = item.name; 
        togglePopup(popupImage)
      });

      card.querySelector('.card__delete').addEventListener('click', deleteCard);
      card.querySelector('.card__heart').addEventListener('click', heardActive);
      
      return card;
  }

// создает изначальные карточки
function renderCards(initial){
    const cards = initial.map((item) => {
      return createCard(item)
    });

    cardList.append(...cards);
  }

  renderCards(initialCards);


  // Добовление карточки пользователем
  submitBtn.addEventListener('click', (e) => {
    e.preventDefault();

    const card = createCard({name: nameCardInput.value, link: linkCardInput.value});

    cardList.prepend(card);
    togglePopup(popupCard);
  });

    //Закрытие попапа для фото
    popupImageCloseBtn.addEventListener('click', function(){
        togglePopup(popupImage)
    })




