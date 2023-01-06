import { RequestHandler } from '../../../interfaces/app';

export const getUserAuthInfo: RequestHandler<{
    Params: { userId: string };
}> = async (request, reply) => {
    const {
        params: { userId },
        authUser,
    } = request;

    if (!authUser) {
        return undefined;
    }

    if (authUser.id === userId) {
        reply.status(200).send('authenticated user');
    }
    reply.status(400).send('user prohibited');
};
