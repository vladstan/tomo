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
