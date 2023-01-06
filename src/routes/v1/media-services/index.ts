import { FastifyInstance, FastifyPluginOptions, FastifyRegisterOptions } from 'fastify';
import { authHandler } from '../../../middleware/authHandler';
import { getUserAuthInfo } from './controllers';

const initializeMediaRoutes = (
    fastify: FastifyInstance,
    _opts?: FastifyRegisterOptions<FastifyPluginOptions>,
    done?: () => void
) => {
    fastify.get('/user/:userId', { preHandler: [authHandler] }, getUserAuthInfo);
    done?.();
};

export default initializeMediaRoutes;
