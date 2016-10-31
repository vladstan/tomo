import {model, staticMethod} from 'utils/mongoose';

@model
class ActionMessage {

  // static options = {
  //   capped: 10 * 1000,
  // }

  static schema = {
    type: {type: String, enum: ['init', 'text'], required: true},
    userId: {type: String, unique: true, required: true},
    messageText: {type: String, required: true},
    createdAt: {type: Date, default: Date.now},
  }

  @staticMethod
  static async findOneOrCreate(query, newDocCallback) {
    let doc = await this.findOne(query);
    if (!doc) {
      if (newDocCallback) {
        doc = new this(await newDocCallback());
      } else {
        doc = new this(query);
      }
      await doc.save();
    }
    return doc;
  }

}

export default ActionMessage;
