import Router from 'koa-router';

import config from '../config';
import xHubSignature from '../middleware/x-hub-signature';

import * as facebookCtrl from '../controllers/facebook';
import * as mainCtrl from '../controllers/main';

const router = new Router();
const verifySignature = xHubSignature.verify(config.facebookAppSecret);

router.get('/', mainCtrl.root);
router.get('/facebook', facebookCtrl.verifyToken);
router.post('/facebook', verifySignature, facebookCtrl.webhook);

export default router;
