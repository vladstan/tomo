import {model} from 'utils/mongoose';

@model
class Message {

  static options = {
    capped: 10 * 1000,
  }

  static schema = {
    sessionId: {type: String, required: true},
    type: {type: String, enum: ['text', 'card', 'image'], required: true},
    text: {type: String}, // TODO other message types
    imageUrl: {type: String}, // TODO other message types
    entities: {type: Object, default: {}},
    senderId: {type: String, required: true},
    receiverId: {type: String, required: true},
    senderType: {type: String, enum: ['bot', 'user'], required: true},
    receiverType: {type: String, enum: ['bot', 'user'], required: true},
    createdAt: {type: Date, default: Date.now},
  }

}

export default Message;
