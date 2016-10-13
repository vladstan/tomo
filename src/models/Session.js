import {model, staticMethod} from 'utils/mongoose';

@model
class Session {

  static schema = {
    userId: {type: String, unique: true, required: true},
    context: {type: Object, default: {}},
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

export default Session;
