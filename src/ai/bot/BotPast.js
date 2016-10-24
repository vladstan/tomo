class BotPast {

  constructor(messages) {
    this.messages = messages;
    this.newMessages = [];
  }

  botAsked(intent) {
    // function lastMsgs(arr, num) {
    //   const newArr = [];
    //   let startIndex = arr.length - num;
    //   if (startIndex < 0) {
    //     startIndex = 0;
    //   }
    //   for (let i = startIndex; i < arr.length; i++) {
    //     newArr.push(arr[i]);
    //   }
    //   return newArr;
    // }

    // TODO: search only the last 5 messages
    // console.log('messages=', lastMsgs(this.messages, 5));
    // console.log('newMessages=', lastMsgs(this.newMessages, 5));
    const previousMessagesFromBot = this.messages
      .concat(this.newMessages)
      .filter((msg) => msg.senderType === 'bot');
      // TODO: fix this sort (it might work without it as well)
      // .sort((a, b) => {
      //   if (a.createdAt < b.createdAt) {
      //     return -1;
      //   } else if (a.createdAt < b.createdAt) {
      //     return +1;
      //   } else {
      //     return 0;
      //   }
      // });

    if (previousMessagesFromBot.length) {
      const previousMessageFromBot = previousMessagesFromBot[previousMessagesFromBot.length - 1];
      // console.log('previousMessageFromBot:', previousMessageFromBot);
      // console.log('previousMessageFromBot.entities.intent', previousMessageFromBot.entities.intent, 'intent', intent);
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
