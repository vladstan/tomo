class BotPast {

  conversation: Object;

  constructor(conversation: Object) {
    this.conversation = conversation;
  }

  botAsked(intent: string): boolean {
    // TODO: search only the last 5 messages
    const messages = this.conversation.messages;
    const previousMessageFromBot = messages.find((msg) => msg.sender === 'bot');
    if (previousMessageFromBot) {
      return previousMessageFromBot.entities.intent === intent;
    }
    return false;
  }

  addUserMessage(parsedMessage: Object) {
    this.conversation.messages.push({
      sender: 'user',
      text: parsedMessage._text,
      entities: parsedMessage.entities,
    });
  }

  addBotResponse(response: Object) {
    this.conversation.messages.push({
      sender: 'bot',
      text: response.text,
      entities: response.entities || {},
    });
  }

  addPostback(postbackId: string) { // TODO

  }

}

export default BotPast;
