import {model, staticMethod} from 'utils/mongoose';

@model
class Profile {

  static schema = {
    userId: {type: String, unique: true, required: true},
  }

  @staticMethod
  static async findOneOrCreate(query, newDoc = query) {
    let profile = await this.findOne(query);
    if (!profile) {
      profile = new this(newDoc);
      await profile.save();
    }
    return profile;
  }

}

export default Profile;
