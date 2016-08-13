import mongoose, {Schema} from 'mongoose';

const Session = new Schema({
  userId: {type: String, required: true},
  context: {type: Object, default: {}}
});

Session.statics.findOneOrCreate = async function(query, newDoc = query) {
  let session = await this.findOne(query);
  if (!session) {
    session = new Session(newDoc);
    await session.save();
  }
  return session;
};

export default mongoose.model('Session', Session);
