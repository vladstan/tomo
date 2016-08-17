import ResponseManager from 'ai/ResponseManager';

class BotInterface {

  constructor() {
    this.botResponses = [];
  }

  say(responseId, responseContext) {
    const responseText = ResponseManager.find(responseId, responseContext);
    this.botResponses.push({
      type: 'text',
      text: responseText,
    });
  }

  ask(targetIntent, responseId, responseContext) {
    const responseText = ResponseManager.find(responseId, responseContext);
    this.botResponses.push({
      type: 'text',
      text: responseText,
      intent: targetIntent,
    });
  }

  sendCards(cards) {
    cards.forEach((card) => card.type = 'card');
    this.botResponses.push(...cards);
  }

  getResponses() {
    return this.botResponses;
  }

}

export default BotInterface;
