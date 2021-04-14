export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._itemsToRender = items;
    this._renderer = renderer;

    this._container = document.querySelector(containerSelector);
  }

  renderItems() {
    this._clear();
    this._itemsToRender.forEach((item) => this._renderer(item));
  }

  addItem(element) {
    this._container.append(element);
  }

  _clear() {
    this._container.innerHTML = "";
  }
}
