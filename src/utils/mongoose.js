import mongoose from 'mongoose';

export function model(Class) {
  const schema = new mongoose.Schema(Class.schema);

  for (const propKey of Class.__statics) {
    schema.statics[propKey] = Class[propKey];
  }

  for (const propKey of Class.prototype.__methods) {
    schema.methods[propKey] = Class.prototype[propKey];
  }

  const model = mongoose.model(Class.name, schema);
  model.Class = Class;

  return model;
}

export function staticMethod(target, prop) {
  if (!Array.isArray(target.__statics)) {
    target.__statics = [];
  }
  target.__statics.push(prop);
  return target;
}

export function instanceMethod(target, prop) {
  if (!Array.isArray(target.__methods)) {
    target.__methods = [];
  }
  target.__methods.push(prop);
  return target;
}
