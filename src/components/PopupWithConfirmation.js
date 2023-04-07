import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._form = this._popup.querySelector(".popup__form"); //находим форму
  }

  open(cardId, cards) {
    super.open();
    this._cardId = cardId;
    this._cards = cards;
  }

  setSubmitAction(action) {
    this._handleFormSubmit = action;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (e) => {
      e.preventDefault();
      this._handleFormSubmit({ cardId: this._cardId, cards: this._cards });
    });
  }
}
