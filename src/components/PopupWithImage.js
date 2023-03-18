import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popupFoto = this._popup.querySelector(".popup__image-foto");
        this._popupFotoName = this._popup.querySelector(".popup__image-sign")
    }

    open(name, link) {
        super.open();
        this._popupFoto.src = link;
        this._popupFotoName.alt = name;
        this._popupFotoName.textContent = name;
    }
}