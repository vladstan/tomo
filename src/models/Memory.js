import mongoose, {Schema} from 'mongoose';

const MemorySchema = new Schema({
  sessionId: {type: String, required: true},
  properties: {
    type: [{
      key: {type: String, required: true},
      value: {type: String, required: true},
      expiresAt: {type: Date, required: true},
    }],
    default: [],
  },
});

MemorySchema.methods.setProperty = function(property) {
  const findcallback = (prop) => prop.key === property.key;
  const existingProperty = this.properties.find(findcallback);
  if (existingProperty) {
    for (const [key, value] of Object.values(property)) {
      existingProperty[key] = value;
    }
  } else {
    this.properties.push(property);
  }
  return this;
};

export default mongoose.model('Memory', MemorySchema);
