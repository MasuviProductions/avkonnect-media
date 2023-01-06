import { FastifyInstance } from 'fastify';
import initializeMediaRoutes from './v1/media-services';

const initializeRoutes = (fastifyInstance: FastifyInstance) => {
    fastifyInstance.register(initializeMediaRoutes, { prefix: 'api/v1' });
};

export default initializeRoutes;
