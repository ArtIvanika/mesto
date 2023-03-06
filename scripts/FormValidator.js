export default class FormValidator {
  constructor(config, formElement) {
    this._config = config;
    // Находим все поля внутри формы, сделаем из них массив методом Array.from
    this._inputSelector = Array.from(
      formElement.querySelectorAll(config.inputSelector)
    );
    this._submitButtonSelector = formElement.querySelector(
      config.submitButtonSelector
    );
    this._formElement = formElement;
  }

  _showInputError(inputElement, errorMessage) {
    // Находим элемент ошибки внутри самой функции
    const errorElement = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );
    inputElement.classList.add(this._config.inputErrorClass);
    // Заменим содержимое span с ошибкой на переданный параметр
    errorElement.textContent = errorMessage;
    // Показываем сообщение об ошибке
    errorElement.classList.add(this._config.errorClass);
  }

  // Функция, которая удаляет класс с ошибкой
  _hideInputError(inputElement) {
    // Находим элемент ошибки внутри самой функции
    const errorElement = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );
    inputElement.classList.remove(this._config.inputErrorClass);
    // Скрываем сообщение об ошибке
    errorElement.classList.remove(this._config.errorClass);
    errorElement.textContent = "";
  }

  // Функция, которая проверяет валидность поля
  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      // Если поле не проходит валидацию, покажем ошибку
      // Передадим сообщение об ошибке вторым аргументом
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      // Если проходит, скроем
      this._hideInputError(inputElement);
    }
  }

  //проверка введённых данных в нужных полях
  _hasInvalidInput() {
    return this._inputSelector.some((inputElement) => {
      //вернём и переберём наш массив
      return !inputElement.validity.valid; //если поле будет не валидно обход массива прекратится
    });
  }

  _toggleButtonState = () => {
    // Если есть хотя бы один невалидный инпут
    if (this._hasInvalidInput()) {
      // сделай кнопку неактивной
      this._submitButtonSelector.classList.add(
        this._config.inactiveButtonClass
      );
      this._submitButtonSelector.setAttribute("disabled", "true");
    } else {
      // иначе сделай кнопку активной
      this._submitButtonSelector.classList.remove(
        this._config.inactiveButtonClass
      );
      this._submitButtonSelector.removeAttribute("disabled");
    }
  };

  resetValidation() {
    // Обойдём все элементы
    this._toggleButtonState();
    this._inputSelector.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }

  // Вызовем функцию setEventListeners на каждый ввод символа
  _setEventListeners() {
    this._toggleButtonState();
    this._inputSelector.forEach((inputElement) => {
      // каждому полю добавим обработчик события input
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }
  enableValidation() {
    this._setEventListeners();
  }
}
