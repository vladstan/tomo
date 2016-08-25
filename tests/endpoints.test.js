import supertest from 'supertest-as-promised';
import test from 'ava';

import Server from 'server/server';
import Middleware from 'server/Middleware';
import Router from 'server/Router';
import Config from 'server/Config';

const config = Config.getInstance();
config.facebookApiUrl = 'https://graph.facebook.com/v2.6';

const middleware = new Middleware();
const router = new Router(config, middleware);
const server = new Server(config, router, middleware);
const request = supertest.agent(server.getApp());

test('GET /', async(t) => {
  const res = await request.get('/');
  t.is(res.status, 200);
  t.is(res.text, 'ok');
});

test('GET /facebook', async(t) => {
  const challengeString = '123';
  const res = await request.get('/facebook').query({
    'hub.mode': 'subscribe',
    'hub.verify_token': 'EOq3PLzJxg8',
    'hub.challenge': challengeString,
  });
  t.is(res.status, 200);
  t.is(res.text, challengeString);
});

test('POST /facebook', async(t) => {
  const pageId = 'PID123';
  const userId = 'UID456';
  const recipientId = 'RID789';
  const res = await request.get('/facebook').send({
    object: 'page',
    entry: [{
      id: pageId,
      time: Date.now(),
      messaging: [{
        sender: {
          id: userId,
        },
        recipient: {
          id: recipientId,
        },
        message: {
          text: 'hello',
        },
      }],
    }],
  });
  t.is(res.status, 200);
  // t.is(res.text, challengeString);
});
