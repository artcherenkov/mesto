export default class UserInfo {
  constructor({ nameSelector, infoSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._infoElement = document.querySelector(infoSelector);
  }

  getUserInfo() {
    // возвращает объект с данными пользователя
  }

  setUserInfo() {
    // принимает новые данные пользователя и добавляет их на страницу
  }
}
