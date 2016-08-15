import {model, staticMethod} from 'utils/mongoose';

@model
class Conversation {

  static schema = {
    sessionId: {type: String, unique: true, required: true},
    messages: {
      type: [{
        sender: {type: String, enum: ['bot', 'user'], required: true},
        text: {type: String, required: true}, // TODO other message types
        timestamp: {type: Date, default: Date.now},
        entities: {type: Object, default: {}},
      }],
      default: [],
    },
  }

  @staticMethod
  async findOneOrCreate(query, newDoc = query) {
    let conversation = await this.findOne(query);
    if (!conversation) {
      conversation = new Conversation(newDoc);
      await conversation.save();
    }
    return conversation;
  }

}

export default Conversation;
