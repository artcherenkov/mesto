export default class UserInfo {
  constructor({ data, nameSelector, infoSelector, avatarSelector }) {
    const { name, info, id, avatar } = data;
    console.log(data);
    this._name = name;
    this._info = info;
    this._id = id;
    this._avatar = avatar;

    this._nameElement = document.querySelector(nameSelector);
    this._infoElement = document.querySelector(infoSelector);
    this._avatarElement = document.querySelector(avatarSelector);

    this.setUserInfo({ name, info, avatar });
  }

  getUserInfo() {
    return {
      name: this._name,
      info: this._info,
      id: this._id,
      avatar: this._avatar,
    };
  }

  setUserInfo({ name, info, avatar }) {
    this._name = name;
    this._info = info;
    this._avatar = avatar;

    this._nameElement.textContent = this._name;
    this._infoElement.textContent = this._info;
    this._avatarElement.src = this._avatar;
  }
}
