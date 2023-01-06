import { fastify } from 'fastify';
import initRouter from './routes';
import { initMongoDB, initDynamoDB } from './utils/db/client';

const APP = fastify({
    logger: true,
});

initMongoDB;
initDynamoDB;
initRouter(APP);

export { APP };
export default APP;
