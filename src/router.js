import Router from 'koa-router';

import xHubSignature from './middleware/xHubSignature';
import * as facebookCtrl from './controllers/facebook';

const router = new Router();

router.get('/', async (ctx) => {
  ctx.body = 'ok';
});

router.get('/facebook', xHubSignature, facebookCtrl.verifyToken);
router.post('/facebook', xHubSignature, facebookCtrl.webhook);

export default router;
