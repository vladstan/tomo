import * as Koa from 'koa';
import { main } from './handlers';

const app = new Koa();

app.use(main);

app.listen('3000', () => {
  console.log('listening...');
});
