import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;

    this._form = this._popup.querySelector(".popup__form"); //находим форму
    this._inputList = this._form.querySelectorAll(".popup__info"); //находим поля импутов
    this._button = this._form.querySelector(".popup__save"); //находим кнопку сохранения попапа

    this._buttonText = this._button.textContent;
  }

  renderLoading(isLoading, loadingText) {
    if (isLoading) {
      this._button.textContent = loadingText;
    } else {
      this._button.textContent = this._buttonText;
    }
  }

  _getInputValues() {
    //собирает данные всех полей формы.

    this._formValues = {}; // создаём пустой объект

    // добавляем в этот объект значения всех полей
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });

    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();

      // добавим вызов функции _handleFormSubmit
      // передадим ей объект — результат работы _getInputValues
      this._handleFormSubmit(this._getInputValues());

      this.close();
    });
  }

  close() {
    super.close();
    // сбросим её поля
    this._form.reset();
  }
}
