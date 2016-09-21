import {model, staticMethod} from 'utils/mongoose';

@model
class User {

  static schema = {
    facebookId: {type: String, unique: true, required: true},
    botMuted: {type: Boolean, default: false},
  }

  @staticMethod
  static async findOneOrCreate(query, newDoc = query) {
    let user = await this.findOne(query);
    if (!user) {
      user = new this(newDoc);
      await user.save();
    }
    return user;
  }

}

export default User;
