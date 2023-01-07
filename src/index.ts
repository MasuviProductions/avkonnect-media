import { fastify } from 'fastify';
import initializeRoutes from './routes';
import { initDynamoDB } from './utils/db/client';

const APP = fastify({
    logger: true,
});

initDynamoDB;

initializeRoutes(APP);

export { APP };
export default APP;
