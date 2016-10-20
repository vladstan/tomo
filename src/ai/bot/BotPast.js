class BotPast {

  constructor(messages) {
    this.messages = messages;
    this.newMessages = [];
  }

  botAsked(intent) {
    // TODO: search only the last 5 messages
    console.log('messages=', this.messages);
    console.log('newMessages=', this.newMessages);
    const previousMessagesFromBot = this.messages
      .concat(this.newMessages)
      .filter((msg) => msg.senderType === 'bot')
      .sort((a, b) => {
        if (a.createdAt < b.createdAt) {
          return -1;
        } else if (a.createdAt < b.createdAt) {
          return +1;
        } else {
          return 0;
        }
      });

    if (previousMessagesFromBot.length) {
      const previousMessageFromBot = previousMessagesFromBot[previousMessagesFromBot.length - 1];
      return previousMessageFromBot.entities.intent === intent;
    }

    return false;
  }

  getCurrentMessage() {
    return this.newMessages[this.newMessages.length - 1];
  }

  addUserMessage(parsedMessage, userId) {
    this.newMessages.push({
      type: 'text',
      senderType: 'user',
      receiverType: 'bot',
      senderId: userId,
      receiverId: '0bot0',
      text: parsedMessage._text,
      entities: parsedMessage.entities,
    });
  }

  addBotResponse(response, userId) {
    this.newMessages.push({
      type: 'text',
      senderType: 'bot',
      receiverType: 'user',
      senderId: '0bot0',
      receiverId: userId,
      text: response.text,
      entities: response.entities || {},
    });
  }

  addPostback(postbackId, userId, postbackMessage) {
    this.newMessages.push({
      type: 'text',
      senderType: 'user',
      receiverType: 'bot',
      senderId: userId,
      receiverId: '0bot0',
      text: postbackMessage,
      entities: {},
    });
  }

}

export default BotPast;
