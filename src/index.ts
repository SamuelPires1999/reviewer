import 'isomorphic-fetch';
import Koa from 'koa';
import logger from 'koa-logger';
import cors from 'kcors';
import bodyparser from 'koa-bodyparser';
import { config } from './config';
import { connectDatabase } from './database';
import { graphqlHTTP } from 'koa-graphql';
import { graphqlSettingsPerReq } from './utils/graphqlSettingsPerReq';
import Router from 'koa-router';
import koaPlayground from 'graphql-playground-middleware-koa';

const app = new Koa();
const router = new Router();

// database setup
try {
  connectDatabase();
} catch (err) {
  console.log('error connecting with database', err);
}

app.use(cors());
app.use(logger());
app.use(bodyparser());

const graphqlServer = graphqlHTTP(graphqlSettingsPerReq);

router.all('/graphql', graphqlServer);
router.all(
  '/graphiql',
  koaPlayground({
    endpoint: '/graphql',
    workspaceName: 'dark',
  })
);

app.use(router.routes()).use(router.allowedMethods());

app.listen(config.PORT);
