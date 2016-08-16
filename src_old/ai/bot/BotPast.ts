class BotPast {

  constructor(conversation) {
    this.conversation = conversation;
  }

  botAsked(intent) {
    // TODO: search only the last 5 messages
    const messages = this.conversation.messages;
    const previousMessageFromBot = messages.find((msg) => msg.sender === 'bot');
    if (previousMessageFromBot) {
      return previousMessageFromBot.entities.intent === intent;
    }
    return false;
  }

  addUserMessage(parsedMessage) {
    this.conversation.messages.push({
      sender: 'user',
      text: parsedMessage._text,
      entities: parsedMessage.entities,
    });
  }

  addBotResponse(response) {
    this.conversation.messages.push({
      sender: 'bot',
      text: response.text,
      entities: response.entities || {},
    });
  }

}

export default BotPast;
