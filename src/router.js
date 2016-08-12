import Router from 'koa-router';
import config from './config';

import XHubSignature from './middleware/x-hub-signature';
import * as facebookCtrl from './controllers/facebook';

const router = new Router();
const xHubSignature = new XHubSignature(config.facebookAppSecret);

router.get('/', async (ctx) => {
  ctx.body = 'ok';
});

if (process.env.NODE_ENV === 'production') {
  router.get('/facebook', xHubSignature, facebookCtrl.verifyToken);
  router.post('/facebook', xHubSignature, facebookCtrl.webhook);
} else {
  router.get('/facebook', facebookCtrl.verifyToken);
  router.post('/facebook', facebookCtrl.webhook);
}

export default router;
