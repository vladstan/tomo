import supertest from 'supertest-as-promised';
import test from 'ava';

import server from '../dist/server/server';

const request = supertest.agent(server.callback());

test('GET /', async (t) => {
  const res = await request.get('/');
  t.is(res.status, 200);
  t.is(res.text, 'ok');
});
