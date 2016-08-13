import moduleIndex from '../utils/module-index';

const modules = moduleIndex(module, [], false);
const moduleObjects = Object.keys(modules)
  .map((key) => modules[key]);

function get(responseId, responseContext) {
  const respond = moduleObjects.find((mod) => mod[responseId]);
  respond(responseContext);
}

export default {
  get
};
