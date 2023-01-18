import { FastifyInstance, FastifyRegisterOptions, FastifyPluginOptions } from 'fastify';
import { authHandler } from '../../../middlewares/authHandler';
import { getUserAuthCheck ,createMedia, getMedia ,updateMedia} from './controllers';

export const initializeMediaRoutes = (
    fastify: FastifyInstance,
    _opts?: FastifyRegisterOptions<FastifyPluginOptions>,
    done?: () => void
) => {
    fastify.get('/user/:userId', { preHandler: [authHandler] }, getUserAuthCheck);

/* API to create media entries
Request body:
{
    resourceId,
    resourceType,
    mediaType,
    fileName,
    status,
    fileSize
} 
*/
    fastify.post('/media/createMedia', { preHandler: [authHandler] }, createMedia); 

/* API to get all the media entries that have resourceId == postId
*/
    fastify.get('/media/:postId', { preHandler: [authHandler] }, getMedia);

    fastify.patch('/media/updateMedia/:fileName',{preHandler: [authHandler]},updateMedia);


    done?.();
};

export default initializeMediaRoutes;
