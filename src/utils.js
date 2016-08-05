export function firstEntityValue(entities, entityName) {
  const val = entities
    && Array.isArray(entities[entityName])
    && entities[entityName].length > 0
    && entities[entityName][0].value;
  if (!val) {
    return null;
  }
  return typeof val === 'object' ? val.value : val;
}

// const findOrCreateSession = (fbid) => {
//   let sessionId;
//   // Let's see if we already have a session for the user fbid
//   Object.keys(sessions).forEach(k => {
//     if (sessions[k].fbid === fbid) {
//       // Yep, got it!
//       sessionId = k;
//     }
//   });
//   if (!sessionId) {
//     // No session found for user fbid, let's create a new one
//     sessionId = new Date().toISOString();
//     sessions[sessionId] = {fbid: fbid, context: {}};
//   }
//   return sessionId;
// };
