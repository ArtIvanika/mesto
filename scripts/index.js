let popupElement = document.querySelector('.popup');
let formElement = popupElement.querySelector('.popup__input-container');
let popupOpenButton = document.querySelector('.profile__popup-opened');
let popupCloseButton = document.querySelector('.popup__close');
let nameInput = formElement.querySelector('.popup__person-name'); 
let jobInput = formElement.querySelector('.popup__person-who');
let profileName = document.querySelector('.profile__text-title');
let profileJob = document.querySelector('.profile__text-subtitle');

//Открытие попапа
let popupOpen = function(){
    popupElement.classList.add('popup_opened');
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
}
popupOpenButton.addEventListener('click', popupOpen);

//Закрытие попапа
let popupClose = function(){
    popupElement.classList.remove('popup_opened')
}
popupCloseButton.addEventListener('click', popupClose);


function handleFormSubmit (evt) {
    evt.preventDefault(); 
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;  
    popupClose();
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit);