import ResponseManager from 'ai/ResponseManager';

class BotInterface {

  constructor() {
    this.botResponses = [];
  }

  async say(responseId, responseContext) {
    const responseText = ResponseManager.find(responseId, responseContext);
    this.botResponses.push({
      text: responseText,
    });
  }

  async ask(targetIntent, responseId, responseContext) {
    const responseText = ResponseManager.find(responseId, responseContext);
    this.botResponses.push({
      text: responseText,
      intent: targetIntent,
    });
  }

  getResponses() {
    return this.botResponses;
  }

}

export default BotInterface;
