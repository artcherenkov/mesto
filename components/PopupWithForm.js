import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, onFormSubmit) {
    super(popupSelector);

    this._onFormSubmit = onFormSubmit.bind(this);
  }

  setEventListeners() {
    super.setEventListeners();
  }

  close() {
    super.close();
  }

  _getInputValues() {}
}
