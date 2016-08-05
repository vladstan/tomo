const api = {};
const handlers = {};

const methods = ['GET', 'POST'];
for (let method of methods) {
  handlers[method] = {};
  api[method.toLowerCase()] = (path, handler) => {
    handlers[method][path] = handler;
  };
}

api.router = async (event, callback) => {
  try {
    const methodHandlers = handlers[event.method];
    if (!methodHandlers) {
      throw new Error('unknown HTTP method: ' + event.method);
    }

    const handler = methodHandlers[event.path];
    if (!handler) {
      throw new Error('no handler for path: ' + event.path);
    }

    const resp = await handler(event);
    callback(null, resp);
  } catch (err) {
    callback(err);
  }
};

export default api;
