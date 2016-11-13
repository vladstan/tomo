import {model, staticMethod} from 'utils/mongoose';

@model
class User {

  static schema = {
    facebookId: {type: String, unique: true, required: true},
    botMuted: {type: Boolean, default: false},
    stripe: {type: Object},
    lastReadWatermark: {type: Number, default: 0},
    lastDeliveredWatermark: {type: Number, default: 0},
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

export default User;
