export function firstEntityValue(entities, entityName) {
  const val = entities &&
    Array.isArray(entities[entityName]) &&
    entities[entityName].length > 0 &&
    entities[entityName][0].value;
  if (!val) {
    return undefined;
  }
  return typeof val === 'object' ? val.value : val;
}

export function isUrl(url) {
  const pattern = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,63}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  return pattern.test(url);
}
