import { ErrorMessage, ErrorCode } from '../../../constants/errors';
import { IMediaContent, IMediaType, IMediaUrls } from '../../../models/media';
import DB_QUERIES from '../../../utils/db/queries';
import { HttpError } from '../../../utils/error';
import { HttpResponse, IUpdateMediaRequest, RequestHandler } from '../../../interfaces/app';

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
    //
    
    const tempmedia = [];
    for(let i=0; i<media.length; i=i+1){
        tempmedia.push(media[i]);
    }
    const mediaInfo = {
                ...tempmedia,
    };

    const response: HttpResponse = {
        success: true,
        data: mediaInfo,
    };
    reply.status(200).send(response);
};

export const updateMedia: RequestHandler<{
    Params: { fileName: string };
    Body: IUpdateMediaRequest,
}> = async (request, reply) => {
    const {
        params: { fileName },
        body
    } = request;
    const media = await DB_QUERIES.getFileName(fileName);
    if (!media) {
        throw new HttpError(ErrorMessage.NotFound, 404, ErrorCode.NotFound);
    }

    const newMediaContent: IMediaContent = { ...body.comment, createdAt: new Date(Date.now()) };

    const updatedMedia = await DB_QUERIES.updateMedia(media.fileName, media.createdAt, {
        contents: [...media.mediaUrls, newMediaContent],
    });

    // const userIds = getSourceIdsFromSourceMarkups(SourceType.USER, getSourceMarkupsFromPostOrComment(comment));
    // const relatedUsersRes = await AVKKONNECT_CORE_SERVICE.getUsersInfo(ENV.AUTH_SERVICE_KEY, userIds);
    // const commentInfo: ICommentResponse = {
    //     ...comment,
    //     relatedSources: [...(relatedUsersRes.data || [])],
    // };
    //
    
    // const tempmedia = [];
    // for(let i=0; i<media.length; i=i+1){
    //     tempmedia.push(media[i]);
    // }
    const mediaInfo = {
                ...media,
    };

    const response: HttpResponse = {
        success: true,
        data: mediaInfo,
    };
    reply.status(200).send(response);
};



// export const updateMedia: RequestHandler<{
//     Params: { postId: string, fileName: string };
//     Body: IMediaContent;
// }> = async (request, reply) => {
//     const {
//         body,
//         params: { postId, fileName },
//     } = request;
//     const media = await DB_QUERIES.getMediaById(postId);
//     if (!media) {
//         throw new HttpError(ErrorMessage.NotFound, 404, ErrorCode.NotFound);
//     }

//     // const tempmedia = [];
//     // for(let i=0; i<media.length; i=i+1){
//     //     tempmedia.push(media[i]);
//     // }
//     // const mediaInfo = {
//     //             ...tempmedia,
//     // };

//     const mediaFileNameContents: IMediaContent[] = [...media];
//     const variable = mediaFileNameContents[0];
//     // eslint-disable-next-line no-console
//     console.log(variable);

//     if (body.fileName) {
//         const updatedMediaContent: IMediaContent = {
//             fileName: body.fileName,
//             createdAt: new Date(Date.now()),
//             resourceId: '123',
//             resourceType: 'post',
//             mediaType: 'image',
//             status: 'uploading',
//             fileSize: 0,
//             mediaUrls: []
//         };
//         mediaFileNameContents.push(updatedMediaContent);
//     }
//     // const updatedMedia = await DB_QUERIES.updateMedia(postId, {
//     //     ...media,
//     //     contents: mediaFileNameContents,
//     // });
//     // if (!updatedMedia) {
//     //     throw new HttpError(ErrorMessage.BadRequest, 400, ErrorCode.BadRequest);
//     // }
//     // const userIds = getSourceIdsFromSourceMarkups(SourceType.USER, getSourceMarkupsFromPostOrComment(updatedPost));
//     // const relatedUsersRes = await AVKKONNECT_CORE_SERVICE.getUsersInfo(ENV.AUTH_SERVICE_KEY, userIds);
//     // const updatedPostInfo: IPostResponse = { ...updatedPost, relatedSources: relatedUsersRes.data || [] };
//     // const response: HttpResponse = {
//     //     success: true,
//     //     data: updatedMedia,
//     // };
//     // reply.status(200).send(response);
// };