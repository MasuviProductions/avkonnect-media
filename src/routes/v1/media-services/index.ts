import { FastifyInstance, FastifyRegisterOptions, FastifyPluginOptions } from 'fastify';
import { authHandler } from '../../../middlewares/authHandler';
import { getUserAuthCheck } from './controllers';

export const initializeMediaRoutes = (
    fastify: FastifyInstance,
    _opts?: FastifyRegisterOptions<FastifyPluginOptions>,
    done?: () => void
) => {
    fastify.get('/user/:userId', { preHandler: [authHandler] }, getUserAuthCheck);
    done?.();
};

export default initializeMediaRoutes;
