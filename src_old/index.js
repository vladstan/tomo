import api from './api';

import * as facebookCtrl from './facebook/controller';

api.get('/', facebookCtrl.main);
api.get('/facebook', facebookCtrl.verifyToken);
api.post('/facebook', facebookCtrl.webhook);

export function handler(event, context, callback) {
  api.router(event, callback);
}
