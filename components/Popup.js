export default class Popup {
  constructor(popupSelector) {
    this._popup = popupSelector;
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  //  //Функция для открытия и закрытия попапов
  //   const openPopup = function (popup) {
  //     popup.classList.add("popup_opened");
  //     document.addEventListener("keyup", closeEscPopup); // слушатель клика ESC
  //   };
  //   const closePopup = function (popup) {
  //     popup.classList.remove("popup_opened");
  //     document.removeEventListener("keyup", closeEscPopup); // удалить событие keyup ESC
  //   };

  open() {
    this._popup.classList.add("popup_opened");
    document.addEventListener("keyup", this._handleEscClose); // слушатель клика ESC
  }

  close() {
    this._popup.classList.remove("popup_opened");
    document.addEventListener("keyup", this._handleEscClose); // удалить событие keyup ESC
  }

  //функция закрытия popup по нажатию на клавишу Esc
  // function closeEscPopup(evt) {
  //     if (evt.key === "Escape") {
  //       const popup = document.querySelector(".popup_opened");
  //       closePopup(popup);
  //     }
  //   }
  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  //   //Закрытие попапа по крестику и внешней области
  //   const popupContainers = document.querySelectorAll(".popup");
  //   popupContainers.forEach((popup) => {
  //     const buttonClosePopup = popup.querySelector(".popup__close");
  //     popup.addEventListener("click", function (event) {
  //       if (event.target === event.currentTarget || event.target === buttonClosePopup) {
  //         closePopup(popup);
  //       }
  //     });
  //   });
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
