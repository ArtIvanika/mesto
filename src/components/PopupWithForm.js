import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupElement, handleFormSubmit) {
    super(popupElement);
    this._handleFormSubmit = handleFormSubmit;

    this._form = this._popup.querySelector(".popup__form"); //находим форму
    this._inputList = this._form.querySelectorAll(".popup__info"); //находим поля импутов
    this._button = this._form.querySelector(".popup__save"); //находим кномку сохранения попапа
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
