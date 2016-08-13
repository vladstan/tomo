import mongoose, {Schema} from 'mongoose';

const Profile = new Schema({
  userId: {type: String, required: true}
});

Profile.statics.findOneOrCreate = async function(query, newDoc = query) {
  let profile = await this.findOne(query);
  if (!profile) {
    profile = new Profile(newDoc);
    await profile.save();
  }
  return profile;
};

export default mongoose.model('Profile', Profile);
