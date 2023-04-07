export default class Card {
  constructor(
    {
      data,
      userId,
      openPopupFoto,
      handleLikeCard,
      handleDeleteLikeCard,
      handleDeleteCard,
    },
    templateSelector
  ) {
    this._data = data;
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._cardId = data._id; //id карточки
    this._ownerId = data.owner._id; // id владельца карточки
    this._userId = userId; // id пользователя, который совершает действие
    this._templateSelector = templateSelector;
    this._openPopupFoto = openPopupFoto;
    this._handleLikeCard = handleLikeCard;
    this._handleDeleteLikeCard = handleDeleteLikeCard;
    this._handleDeleteCard = handleDeleteCard;
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

    this._element.querySelector(".card__title").textContent = this._name;
    this._cardFoto = this._element.querySelector(".card__foto");
    this._cardFoto.src = this._link;
    this._cardFoto.alt = this._name;
    this._likeButton = this._element.querySelector(".card__heart");
    this._deleteBtnCard = this._element.querySelector(".card__delete");

    this.setLikes();
    this._checkOwner();
    this._setEventListeners();
    this._checkLiked();
    return this._element;
  }

  setLikes() {
    this._likeSum = this._element.querySelector(".card__like-sum");
    this._likeSum.textContent = this._likes.length;
  }

  // добавляем или убираем лайк
  toggleLikeCard(data) {
    this._likes = data.likes;
    this.setLikes();
    this._likeButton.classList.toggle("card__heart_active");
  }

  _checkLiked() {
    this._likes.forEach((user) => {
      if (user._id === this._userId) {
        this.like();
      }
    });
  }

  like() {
    this._likeButton.classList.add("card__heart_active");
  }

  _deleteCard(e) {
    e.target.closest(".card__item").remove();
  }

  _setEventListeners() {
    this._cardFoto.addEventListener("click", () => {
      this._openPopupFoto({name: this._name, link: this._link});
    });

    this._likeButton.addEventListener("click", () => {
      if (this._likeButton.classList.contains("card__heart_active")) {
        this._handleDeleteLikeCard(this._cardId);
      } else {
        this._handleLikeCard(this._cardId);
      }
    });

    this._deleteBtnCard.addEventListener("click", () => {
      this._handleDeleteCard(this._cardId);
    });
  }
  // удаление
  remove() {
    this._element.remove();
    this._element = null;
  }
  _checkOwner() {
    if (this._userId !== this._ownerId) {
      this._deleteBtnCard.remove();
    }
  }
}
