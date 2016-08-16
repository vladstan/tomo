import supertest from 'supertest-as-promised';
import test from 'ava';

import Server from 'server/server';
import constitute from 'constitute';

const server = constitute(Server);

const request = supertest.agent(server.getApp());

test('GET /', async (t) => {
  const res = await request.get('/');
  t.is(res.status, 200);
  t.is(res.text, 'ok');
});

test('GET /facebook', async (t) => {
  const challengeString = '123';
  const res = await request.get('/facebook').query({
    'hub.mode': 'subscribe',
    'hub.verify_token': 'EOq3PLzJxg8',
    'hub.challenge': challengeString,
  });
  t.is(res.status, 200);
  t.is(res.text, challengeString);
});
