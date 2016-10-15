import ResponseManager from 'ai/ResponseManager';

class BotInterface {

  botResponses: Array<Object>;
  memory: Object;

  constructor() {
    this.botResponses = [];
    this.actionMessages = [];
  }

  say(responseId: string, responseContext: Object) {
    const responseText = ResponseManager.find(responseId, responseContext);
    const resp = {
      type: 'text',
      text: responseText,
    };
    this.botResponses.push(resp);
    return this.qrInterface(resp);
  }

  sayText(responseText: string) {
    const resp = {
      type: 'text',
      text: responseText,
    };
    this.botResponses.push(resp);
    return this.qrInterface(resp);
  }

  sayTextWithIntent(responseText: string, targetIntent) {
    const resp = {
      type: 'text',
      text: responseText,
      intent: targetIntent,
    };
    this.botResponses.push(resp);
    return this.qrInterface(resp);
  }

  qrInterface(resp: Object) {
    const that = this;
    return {
      quickReply(text: string, postbackId: ?string) {
        if (!Array.isArray(resp.quickReplies)) {
          resp.quickReplies = [];
        }
        resp.quickReplies.push({text, postbackId});
        return that.qrInterface(resp);
      },
    };
  }

  ask(targetIntent: string, responseId: string, responseContext: Object = {}) {
    const responseText = ResponseManager.find(responseId, responseContext);
    this.botResponses.push({
      type: 'text',
      text: responseText,
      intent: targetIntent,
    });
  }

  sendCards(cards: Array<Object>) {
    cards.forEach((card) => {
      card.type = 'card';
    });
    this.botResponses.push(...cards);
  }

  sendImage(imageProps: Object) {
    imageProps.type = 'image';
    this.botResponses.push(imageProps);
  }

  addActionMessage(msg) {
    // log.debug('addActionMessage(msg)', msg);
    this.actionMessages.push({
      type: 'text',
      ...msg,
    });
  }

  wait(duration: string) {
    this.botResponses.push({
      type: 'wait',
      duration: 2000,
    });
  }

  getResponses() {
    return this.botResponses;
  }

  getActionMessages() {
    return this.actionMessages;
  }

}

export default BotInterface;
