const api = {};
const handlers = {};

const methods = ['GET', 'POST'];
for (let method of methods) {
  handlers[method] = {};
  api[method.toLowerCase()] = (path, handler) => {
    handlers[method][path] = handler;
  };
}

api.router = async (req, callback) => {
  try {
    const methodHandlers = handlers[req.method];
    if (!methodHandlers) {
      throw new Error('unknown HTTP method: ' + req.method);
    }

    const handler = methodHandlers[req.path];
    if (!handler) {
      throw new Error('no handler for path: ' + req.path);
    }

    console.log(req.method, req.path);
    const resp = await handler(req);
    callback(null, resp);
  } catch (err) {
    callback(err);
  }
};

export default api;
