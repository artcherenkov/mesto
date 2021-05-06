export default class Adapter {
  static adaptCardToClient(serverCard) {
    const clientCard = {
      ...serverCard,
      title: serverCard.name,
      imageUrl: serverCard.link,
    };

    delete clientCard.name;
    delete clientCard.link;

    return clientCard;
  }

  static adaptUserInfoToClient(serverUserInfo) {
    const clientUserInfo = {
      ...serverUserInfo,
      id: serverUserInfo._id,
      info: serverUserInfo.about,
    };

    delete clientUserInfo.about;
    delete clientUserInfo._id;

    return clientUserInfo;
  }
}
