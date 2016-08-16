import moduleIndex from 'utils/module-index';

const responseModules = moduleIndex(__dirname, 'responses');
const responses = Object.assign({}, ...Object.values(responseModules));

class ResponseManager {

  static find(responseId, responseContext) {
    const respond = responses[responseId];
    if (typeof respond !== 'function') {
      throw new Error(`response '${responseId}' doesn't exist`);
    }
    return respond(responseContext);
  }

}

export default ResponseManager;
