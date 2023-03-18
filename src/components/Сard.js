export default class Card {
  constructor(data, templateSelector, openPopupFoto) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._openPopupFoto = openPopupFoto;
  }
  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".card__item")
      .cloneNode(true);

    return cardElement;
  }
  generateCard() {
    this._element = this._getTemplate();

    this._cardFoto = this._element.querySelector(".card__foto");
    this._element.querySelector(".card__title").textContent = this._name;
    this._cardFoto.src = this._link;
    this._cardFoto.alt = this._name;

    this._setEventListener();

    return this._element;
  }

  _toggleLike(e) {
    e.target.classList.toggle("card__heart_active");
  };

  _deleteCard(e) {
    e.target.closest(".card__item").remove();
  }

  _setEventListener() {
    this._cardFoto.addEventListener("click", () => {
      this._openPopupFoto(this._name, this._link);
    });

    this._element.querySelector(".card__heart").addEventListener("click", this._toggleLike);

    this._element.querySelector(".card__delete").addEventListener("click", this._deleteCard);
  }
}
