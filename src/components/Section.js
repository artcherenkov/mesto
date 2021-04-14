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

  addItem(element, method = "append") {
    if (method === "append") {
      this._container.append(element);
    } else {
      this._container.prepend(element);
    }
  }

  _clear() {
    this._container.innerHTML = "";
  }
}
