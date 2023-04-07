export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._popup.classList.add("popup_opened");
    document.addEventListener("keyup", this._handleEscClose); // слушатель клика ESC
  }

  close() {
    this._popup.classList.remove("popup_opened");
    document.addEventListener("keyup", this._handleEscClose); // удалить событие keyup ESC
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    this._popup.addEventListener("click", (event) => {
      if (
        event.target === event.currentTarget ||
        event.target === this._popup.querySelector(".popup__close")
      ) {
        this.close();
      }
    });
  }
}
