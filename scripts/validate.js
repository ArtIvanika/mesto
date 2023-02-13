

// Функция, которая добавляет класс с ошибкой
// Передадим текст ошибки вторым параметром
const showInputError = (formElement, inputElement, errorMessage, config) => {
    // Находим элемент ошибки внутри самой функции
      const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
      inputElement.classList.add(config.inputErrorClass);
      //inputElement.classList.add('popup__info_type_active');
      // Заменим содержимое span с ошибкой на переданный параметр
      errorElement.textContent = errorMessage;
      // Показываем сообщение об ошибке
     errorElement.classList.add(config.errorClass);
    //  errorElement.classList.add('popup__info-error_active');
      };
    
    
    // Функция, которая удаляет класс с ошибкой
      const hideInputError = (formElement, inputElement, config) => {
        // Находим элемент ошибки внутри самой функции
      const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
      inputElement.classList.remove(config.inputErrorClass); 
      //inputElement.classList.remove('popup__info_type_active');
      // Скрываем сообщение об ошибке
      errorElement.classList.remove(config.errorClass);
      //errorElement.classList.remove('popup__info-error_active');
       errorElement.textContent = '';
      }; 
    
    // Функция, которая проверяет валидность поля
      const checkInputValidity = (formElement, inputElement, config) => {
       if (!inputElement.validity.valid) {
        // Если поле не проходит валидацию, покажем ошибку
        // Передадим сообщение об ошибке вторым аргументом
        showInputError(formElement, inputElement, inputElement.validationMessage, config);
       } else {
        // Если проходит, скроем
        hideInputError(formElement, inputElement, config);
       }
      };
  
    function setsubmitbutton(button, isValid){
      button.disabled = !isValid;
    }
      const toggleButtonState = (inputList, buttonElement, config) => {
        // Если есть хотя бы один невалидный инпут
        if (hasInvalidInput(inputList, config)) {
          // сделай кнопку неактивной
          buttonElement.disabled = true;
          buttonElement.classList.add(config.inactiveButtonClass);
         // buttonElement.classList.add('popup__save_inactive');
        } else {
          // иначе сделай кнопку активной
          buttonElement.removeAttribute('disabled', 'disabled');
          buttonElement.classList.remove(config.inactiveButtonClass);
         // buttonElement.classList.remove('popup__save_inactive');
        }
      }; 
    
    
    // Вызовем функцию isValid на каждый ввод символа
    const setEventListeners = (formElement, config) => {
      // Находим все поля внутри формы,
      // сделаем из них массив методом Array.from
      const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
     // const inputList = Array.from(formElement.querySelectorAll('.popup__info'));
      // Найдём в текущей форме кнопку отправки
      const buttonElement = formElement.querySelector(config.submitButtonSelector);
     // const buttonElement = formElement.querySelector('.popup__save');
        // Вызовем toggleButtonState, чтобы не ждать ввода данных в поля
        toggleButtonState(inputList, buttonElement, config);
    
      
      // Обойдём все элементы полученной коллекции
      inputList.forEach((inputElement) => {
        // каждому полю добавим обработчик события input
        inputElement.addEventListener('input', () => {
          // Внутри колбэка вызовем isValid,
          // передав ей форму и проверяемый элемент
          checkInputValidity(formElement, inputElement, config);
          // Вызовем toggleButtonState и передадим ей массив полей и кнопку
          toggleButtonState(inputList, buttonElement, config);
    
        });
      });
    };
    
    // Функция принимает массив полей
    const hasInvalidInput = (inputList) => {
      // проходим по этому массиву методом some
      return inputList.some((inputElement) => {
        // Если поле не валидно, колбэк вернёт true
        // Обход массива прекратится и вся функция
        // hasInvalidInput вернёт true
    
        return !inputElement.validity.valid;
      })
    }; 
    
      const enableValidation = (config) => {
          // Найдём все формы с указанным классом в DOM,
          // сделаем из них массив методом Array.from
        const formList = Array.from(document.querySelectorAll('.popup'));
         // Переберём полученную коллекцию
        formList.forEach((formElement) => {
          formElement.addEventListener('submit', function (evt) {
            evt.preventDefault();
          });
          const fieldsetList = Array.from(formElement.querySelectorAll(config.formSelector));
          fieldsetList.forEach((fieldSet) => {
             // Для каждой формы вызовем функцию setEventListeners,
             // передав ей элемент формы
          setEventListeners(fieldSet, config);
          }); 
        });
      };
      
    //  enableValidation();
    
  
enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__info',
    submitButtonSelector: '.popup__save',
    inactiveButtonClass: 'popup__save_inactive',
    inputErrorClass: 'popup__info_type_active',
    errorClass: 'popup__info-error_active'
  }); 
  // включение валидации вызовом enableValidation
  // все настройки передаются при вызове
  
  


  