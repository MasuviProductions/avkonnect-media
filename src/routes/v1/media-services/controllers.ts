import { ErrorMessage, ErrorCode } from '../../../constants/errors';
import { IMediaContent } from '../../../models/media';
import DB_QUERIES from '../../../utils/db/queries';
import { HttpError } from '../../../utils/error';
import { HttpResponse, RequestHandler } from '../../../interfaces/app';

export const getUserAuthCheck: RequestHandler<{
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

export const createMedia: RequestHandler<{
    Body: IMediaContent;
    Params: {postId: string};
}> = async (request, reply) => {
    const { authUser, body, params } = request;
    // const resource = await getResourceBasedOnResourceType(body.resourceType, body.resourceId);

    // const currentTime = Date.now();
    const media: IMediaContent = {
        resourceId: body.resourceId,
        mediaUrls: body.mediaUrls,
        createdAt: body.createdAt,
        resourceType: body.resourceType,
        mediaType: body.mediaType,
        fileName: body.fileName,
        status: body.status,
        fileSize: body.fileSize,
    };
    const createdMedia = await DB_QUERIES.createMedia(media);
    if (!createdMedia) {
        throw new HttpError(ErrorMessage.CreationError, 400, ErrorCode.CreationError);
    }


    const response: HttpResponse<IMediaContent> = {
        success: true,
    };
    reply.status(200).send(response);
};

export const getMedia: RequestHandler<{
    Params: { postId: string };
}> = async (request, reply) => {
    const {
        params: { postId },
    } = request;
    const media = await DB_QUERIES.getMediaById(postId);
    if (!media) {
        throw new HttpError(ErrorMessage.NotFound, 404, ErrorCode.NotFound);
    }
    // const userIds = getSourceIdsFromSourceMarkups(SourceType.USER, getSourceMarkupsFromPostOrComment(comment));
    // const relatedUsersRes = await AVKKONNECT_CORE_SERVICE.getUsersInfo(ENV.AUTH_SERVICE_KEY, userIds);
    // const commentInfo: ICommentResponse = {
    //     ...comment,
    //     relatedSources: [...(relatedUsersRes.data || [])],
    // };
    const mediaInfo = {
                ...media,
    };
    const response: HttpResponse = {
        success: true,
        data: mediaInfo,
    };
    reply.status(200).send(response);
};