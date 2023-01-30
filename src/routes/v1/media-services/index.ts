import { FastifyInstance, FastifyRegisterOptions, FastifyPluginOptions } from 'fastify';
import { authHandler } from '../../../middlewares/authHandler';
import {
    getUserAuthCheck,
    createMedia,
    getMedia,
    updateMediaStatus,
    updateMediaUrls,
    getMediaStatus,
} from './controllers';

export const initializeMediaRoutes = (
    fastify: FastifyInstance,
    _opts?: FastifyRegisterOptions<FastifyPluginOptions>,
    done?: () => void
) => {
    fastify.get('/user/:userId', { preHandler: [authHandler] }, getUserAuthCheck);

    /* API to create media entries
     */
    fastify.post('/media/createMedia', { preHandler: [authHandler] }, createMedia);

    /* API to get all the media entries that have resourceId == postId
     */
    fastify.get('/media/:resourceType/:postId', { preHandler: [authHandler] }, getMedia);

    /* API to get the consolidated status of all the media entries having the same resourceId
     */
    fastify.get('/media/status/:resourceType/:postId', { preHandler: [authHandler] }, getMediaStatus);

    /* API to update the mediaUrls of a media
     */
    fastify.patch('/media/updateMediaUrls/:resourceType/:fileName', { preHandler: [authHandler] }, updateMediaUrls);

    /* API to update the status of a media
     */
    fastify.patch('/media/updateMediaStatus/:resourceType/:fileName', { preHandler: [authHandler] }, updateMediaStatus);

    done?.();
};

export default initializeMediaRoutes;
