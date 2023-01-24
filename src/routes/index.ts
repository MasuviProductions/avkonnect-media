import { FastifyInstance } from 'fastify';
import initializeMediaRoutes from './v1/media-services';

const initializeRoutes = (fastifyInstance: FastifyInstance) => {
    const v1ServicePrefix = '/api/v1';
    fastifyInstance.register(initializeMediaRoutes, { prefix: v1ServicePrefix });
};

export default initializeRoutes;
