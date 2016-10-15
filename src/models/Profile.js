import {model, staticMethod} from 'utils/mongoose';

@model
class Profile {

  static schema = {
    userId: {type: String, unique: true, required: true},
    // name: {type: String, required: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    pictureUrl: {type: String, required: true},
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

export default Profile;
