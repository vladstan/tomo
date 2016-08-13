import responses from '../responses';

class BotActions {

  constructor(botResponses, past) {
    this.botResponses = botResponses;
    this.past = past;
  }

  async say(responseIds, responseContext) {
    for (let responseId of responseIds) {
      const response = responses.get(responseId, responseContext);
      this.botResponses.push({
        text: response
      });
    }
  }

  async sayText(text) {
    this.botResponses.push({text});
  }

  async ask(targetIntent, responseIds, responseContext) {
    for (let responseId of responseIds) {
      const response = responses.get(responseId, responseContext);
      this.botResponses.push({
        text: response,
        intent: targetIntent
      });
    }
  }

}

export default BotActions;
