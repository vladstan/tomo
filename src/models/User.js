import mongoose, {Schema} from 'mongoose';

const User = new Schema({
  facebookId: {type: String, unique: true, required: true},
});

// TODO: use ES7 decorators
User.statics.findOneOrCreate = async function(query, newDoc = query) {
  let user = await this.findOne(query);
  if (!user) {
    user = new User(newDoc);
    await user.save();
  }
  return user;
};

export default mongoose.model('User', User);
