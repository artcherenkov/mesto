export default class UserInfo {
  constructor({ data, nameSelector, infoSelector }) {
    const { name, info, id } = data;
    this._name = name;
    this._info = info;
    this._id = id;
    this._nameElement = document.querySelector(nameSelector);
    this._infoElement = document.querySelector(infoSelector);

    this.setUserInfo({ name, info });
  }

  getUserInfo() {
    return {
      name: this._name,
      info: this._info,
      id: this._id,
    };
  }

  setUserInfo({ name, info }) {
    this._name = name;
    this._info = info;
    this._nameElement.textContent = this._name;
    this._infoElement.textContent = this._info;
  }
}
