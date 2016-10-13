import {model, staticMethod, instanceMethod} from 'utils/mongoose';

@model
class Memory {

  static schema = {
    sessionId: {type: String, required: true},
    properties: {
      type: [{
        key: {type: String, required: true},
        value: {type: Object, required: true},
        expiresAt: {type: Date, required: true},
      }],
      default: [],
    },
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

  @instanceMethod
  setProperty(property) {
    const findcallback = (prop) => prop.key === property.key;
    const existingProperty = this.properties.find(findcallback);
    // console.log(existingProperty, property); // TODO use log.silly
    if (existingProperty) {
      Object.assign(existingProperty, property);
    } else {
      this.properties.push(property);
    }
    return this;
  }

}

export default Memory;
