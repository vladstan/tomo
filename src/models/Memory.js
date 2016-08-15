import {model, staticMethod, instanceMethod} from 'utils/mongoose';

@model
class Memory {

  static schema = {
    sessionId: {type: String, required: true},
    properties: {
      type: [{
        key: {type: String, required: true},
        value: {type: String, required: true},
        expiresAt: {type: Date, required: true},
      }],
      default: [],
    },
  }

  @staticMethod
  async findOneOrCreate(query, newDoc = query) {
    let memory = await this.findOne(query);
    if (!memory) {
      memory = new Memory(newDoc);
      await memory.save();
    }
    return memory;
  }

  @instanceMethod
  setProperty(property) {
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
  }

}

export default Memory;
