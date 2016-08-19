import ResponseManager from 'ai/ResponseManager';

class BotInterface {

  constructor() {
    this.botResponses = [];
  }

  say(responseId, responseContext) {
    const responseText = ResponseManager.find(responseId, responseContext);
    const resp = {
      type: 'text',
      text: responseText,
    };
    this.botResponses.push(resp);
    return this.qrInterface(resp);
  }

  sayText(responseText) {
    const resp = {
      type: 'text',
      text: responseText,
    };
    this.botResponses.push(resp);
    return this.qrInterface(resp);
  }

  qrInterface(resp) {
    const that = this;
    return {
      quickReply(text, postbackId) {
        if (!Array.isArray(resp.quickReplies)) {
          resp.quickReplies = [];
        }
        resp.quickReplies.push({text, postbackId});
        return that.qrInterface(resp);
      },
    };
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

  sendImage(imageProps) {
    imageProps.type = 'image';
    this.botResponses.push(imageProps);
  }

  getResponses() {
    return this.botResponses;
  }

}

export default BotInterface;
