import ResponseManager from 'ai/ResponseManager';

class BotInterface {

  constructor() {
    this.botResponses = [];
  }

  async say(responseIds, responseContext) {
    for (const responseId of responseIds) {
      const responseText = ResponseManager.find(responseId, responseContext);
      this.botResponses.push({
        text: responseText,
      });
    }
  }

  async sayText(text) {
    this.botResponses.push({text});
  }

  async ask(targetIntent, responseIds, responseContext) {
    for (const responseId of responseIds) {
      const responseText = ResponseManager.find(responseId, responseContext);
      this.botResponses.push({
        text: responseText,
        intent: targetIntent,
      });
    }
  }

  getResponses() {
    return this.botResponses;
  }

}

export default BotInterface;
