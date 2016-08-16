import {model, staticMethod} from 'utils/mongoose';

@model
class Session {

  static schema = {
    userId: {type: String, unique: true, required: true},
    context: {type: Object, default: {}},
  }

  @staticMethod
  static async findOneOrCreate(query, newDoc = query) {
    let session = await this.findOne(query);
    if (!session) {
      session = new this(newDoc);
      await session.save();
    }
    return session;
  }

}

export default Session;
