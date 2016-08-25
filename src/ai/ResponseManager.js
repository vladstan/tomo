import globby from 'globby';
import path from 'path';

const moduleFiles = globby.sync('stories/*/responses.js', {
  cwd: path.dirname(require.main.filename),
});

const responsesModules = moduleFiles.map((filePath) => require(filePath));
const responses = Object.assign({}, ...responsesModules);

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
