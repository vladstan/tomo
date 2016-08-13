import mongoose, {Schema} from 'mongoose';

const Memory = new Schema({
  sessionId: {type: String, required: true},
  key: {type: String, required: true},
  value: {type: String, required: true},
  expiresAt: {type: Date, required: true}
});

export default mongoose.model('Memory', Memory);
