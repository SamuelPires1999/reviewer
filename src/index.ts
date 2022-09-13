import Koa from 'koa';
import logger from 'koa-logger';
import cors from 'kcors';
import bodyparser from 'koa-bodyparser';

const app = new Koa();

app.use(cors());
app.use(logger());
app.use(bodyparser());

app.use(ctx => {
  ctx.body = 'hello world';
});

app.listen(3000);
