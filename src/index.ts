import Koa from 'koa';
import logger from 'koa-logger';
import cors from 'kcors';
import bodyparser from 'koa-bodyparser';
import { config } from './config';
import mongoose from 'mongoose';
import { connectDatabase } from './database';

const app = new Koa();

// database setup
try {
  connectDatabase();
} catch (err) {
  console.log('error connecting with database', err);
}

app.use(cors());
app.use(logger());
app.use(bodyparser());

app.use(ctx => {
  ctx.body = 'hello world';
});

app.listen(config.PORT);
