import supertest from 'supertest-as-promised';
import req from 'request';
import nock from 'nock';
import test from 'ava';

import crypto from 'crypto';

import Server from 'server/server';
import Middleware from 'server/Middleware';
import Database from 'server/Database';
import Router from 'server/Router';
import Config from 'server/Config';

const config = Config.getInstance();
const middleware = new Middleware();
const router = new Router(config, middleware);
const server = new Server(config, router, middleware);
const request = supertest.agent(server.getApp());

const database = new Database(config);
database.connect();

test.beforeEach(async (t) => {
  nock.disableNetConnect();
  nock.enableNetConnect('127.0.0.1');
});

test.afterEach(async (t) => {
  // nock.cleanAll();
  // nock.enableNetConnect();
});

test.skip('GET /', async (t) => {
  const res = await request.get('/');
  t.is(res.status, 200);
  t.is(res.text, 'ok');
});

test.skip('GET /facebook', async (t) => {
  const challengeString = '123';
  const res = await request.get('/facebook').query({
    'hub.mode': 'subscribe',
    'hub.verify_token': config.facebookVerifyToken,
    'hub.challenge': challengeString,
  });
  t.is(res.status, 200);
  t.is(res.text, challengeString);
});

test('POST /facebook', async (t) => {
  // nock('https://graph.facebook.com')
  //   .log(log.debug)
  //   .post('/v2.6/me/messages')
  //   .times(1)
  //   .reply(200, {ok: true});
  //
  // const res = await req('https://graph.facebook.com/v2.6/me/mesSSSSsages');
  // log.warn(res);

  // const pageId = 'PID123';
  // const userId = 'UID456';
  // const recipientId = 'RID789';
  // const data = {
  //   object: 'page',
  //   entry: [{
  //     id: pageId,
  //     time: Date.now(),
  //     messaging: [{
  //       sender: {
  //         id: userId,
  //       },
  //       recipient: {
  //         id: recipientId,
  //       },
  //       message: {
  //         text: 'Empezar',
  //       },
  //     }],
  //   }],
  // };
  //
  // const hmac = crypto.createHmac('sha1', config.facebookAppSecret);
  // hmac.update(JSON.stringify(data), 'utf8');
  //
  // const signature = 'sha1=' + hmac.digest('hex');
  // const res = await request.post('/facebook')
  //   .send(data)
  //   .set('X-Hub-Signature', signature);
  //
  // t.is(res.status, 200);
  // t.is(res.text, 'ok');
  // t.true(nock.isDone());
});
