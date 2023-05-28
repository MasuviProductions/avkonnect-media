import { fastify } from 'fastify';
import initializeRoutes from './routes';
import { initDynamoDB } from './utils/db/client';
import fastifyCors from '@fastify/cors';

const APP = fastify({
    logger: true,
});
APP.register(fastifyCors);

initDynamoDB();
initializeRoutes(APP);

export { APP };
export default APP;
