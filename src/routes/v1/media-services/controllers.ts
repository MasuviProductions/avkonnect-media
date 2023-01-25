import { ErrorMessage, ErrorCode } from '../../../constants/errors';
import { IMediaContent, IMediaStatus, IMediaUrls } from '../../../models/media';
import DB_QUERIES from '../../../utils/db/queries';
import { HttpError } from '../../../utils/error';
import { HttpResponse, IUpdateMediaRequest, RequestHandler } from '../../../interfaces/app';

/*
Function to authenticate the userId
Parameters: userId
Body: NA
*/
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

/*
Function to create Media Entries
Parameters: NA
Body: {
    resourceId,
    resourceType,
    mediaType,
    fileName,
    status,
    fileSize,
    mediaUrls
} 
*/
export const createMedia: RequestHandler<{
    Body: IMediaContent;
    Params: {postId: string};
}> = async (request, reply) => {
    const {body} = request;

    const currentTime = Date.now();
    const media: IMediaContent = {
        resourceId: body.resourceId,
        mediaUrls: body.mediaUrls,
        createdAt: new Date(currentTime),
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

/*
Function to get Media entries
Parameters: resourceId(postId)
Body: NA
*/
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
    
    // iterate through the data returned from the DB and
    // move the required data to another array
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

/* 
Function to get consolidated status of a resourceId
Parameters: resourceId(postId)
Body: NA
*/
export const getMediaStatus: RequestHandler<{
    Params: { postId: string };
}> = async (request, reply) => {
    const {
        params: { postId },
    } = request;
    const media = await DB_QUERIES.getMediaById(postId);
    if (!media) {
        throw new HttpError(ErrorMessage.NotFound, 404, ErrorCode.NotFound);
    }
    
    // iterate through the data returned from the DB and
    // move the required data to another array
    const tempmedia = [];
    const opMedia = [];
    let successflag,errorflag,processingflag;
    for(let i=0; i<media.length; i=i+1){
        tempmedia.push(media[i].status);
    }

    // iterate through the array of status and set appropriate flags
    for(let j=0; j<tempmedia.length;j=j+1){
        if(tempmedia[j]  === 'error'){
             errorflag = 1;
        }if (tempmedia[j] === 'uploading' || tempmedia[j] === 'uploaded' || tempmedia[j] === 'processing'){
            processingflag = 1;
        }if (tempmedia[j] ==='success'){
            successflag = 1;
        } 
    }

    // check the flags and decide what needs to be returned in the following order
    // 1. if all statuses are success, return success
    // 2. if any status is error, return error
    // 3. if any status is uploading/uploaded/processing, return in-process
    if(errorflag === 1){
        opMedia.push('error');
    }else if(!errorflag){
        if(processingflag === 1){
            opMedia.push('in-process');
        }else if( successflag === 1 && !processingflag){
            opMedia.push('success');
        }
    }

    const mediaInfo = {
        "status" : opMedia[0],
    };
    const response: HttpResponse = {
        success: true,
        data: mediaInfo,
    };
    reply.status(200).send(response);
};


/*
Function to update the mediaUrls of a media entry
Parameters: fileName
Body: { 
    "mediaUrls": [
        {
            "height":3,
            "width":2,
            "url":"gobba"
    },
    {
            "height":3,
            "width":2,
            "url":"dabba"
    }
    ]
}
*/
export const updateMediaUrls: RequestHandler<{
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

    const mediaContents: IMediaUrls[] = body.mediaUrls;

    const updatedMedia = await DB_QUERIES.updateMedia(fileName, {
        mediaUrls: mediaContents
    });

    const response: HttpResponse = {
        success: true,
        data: updatedMedia,
    };
    reply.status(200).send(response);
};

/*
Function to update the status of a media entry
Parameters: fileName
Body: { 
    "status": "success"
    }
*/
export const updateMediaStatus: RequestHandler<{
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

    const mediaContents: IMediaStatus = body.status;

    const updatedMediaStatus = await DB_QUERIES.updateMediaStatus(fileName, {
        status: mediaContents
    });

    const response: HttpResponse = {
        success: true,
        data: updatedMediaStatus,
    };
    reply.status(200).send(response);
};