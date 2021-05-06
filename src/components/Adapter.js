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
}
