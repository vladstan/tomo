import request from 'supertest-as-promised';
import test from 'ava';

import '../dist/server/globals';
import server from '../dist/server/server';

test('GET /', async (t) => {
  const res = await request(server.callback()).get('/');
  log(JSON.stringify(res.body));
  t.is(res.status, 200);
  t.is(res.body, 'ok');
});
