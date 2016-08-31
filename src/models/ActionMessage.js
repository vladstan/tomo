import {model} from 'utils/mongoose';

@model
class ActionMessage {

  static options = {
    capped: 10 * 1000,
  }

  static schema = {
    type: {type: String, enum: ['init', 'text'], required: true},
    userId: {type: String, required: true},
    messageText: {type: String, required: true},
    createdAt: {type: Date, default: Date.now},
  }

}

export default ActionMessage;
