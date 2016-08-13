class BotPast {

  constructor(conversation) {
    this.conversation = conversation;
  }

  botAsked(intent) {
    // TODO: search only the last 5 messages
    const messages = this.conversation.messages;
    const previousMessageFromBot = messages.find((msg) => msg.sender === 'bot');
    return previousMessageFromBot.entities.intent === intent;
  }

  addUserMessage(msg) {
    this.conversation.messages.push(msg); // TODO
  }

  addBotMessage(msg) {
    this.conversation.messages.push(msg); // TODO
  }

}

export default BotPast;
