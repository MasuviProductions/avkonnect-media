import { IUpdateMediaRequest } from "../../interfaces/app";
import Media, { IMediaContent } from "../../models/media";


const createMedia = async (media: IMediaContent): Promise<IMediaContent | undefined> => {
    const mediaObj = new Media(media);
    await mediaObj.save();
    return mediaObj;
};

const getMediaById = async (postId: string): Promise<Array<IMediaContent>> => {
    const media = await Media.scan('resourceId').eq(postId).exec();
    if (!media) {
        return [];
    }
    return media;
};

const getFileName = async (fileNameVar: string, ) : Promise<IMediaContent |undefined> => {
    const name = await Media.scan('fileName').eq(fileNameVar).exec();
   
    if(!name){
        return undefined;
    }
    return name[0];
};

const updateMedia = async (fileName: string, updatedMedia: Partial<IMediaContent>): Promise<IMediaContent | undefined> => {
    //const createdMedia = await Media.update({fileName:fileName}, {mediaUrls:[{"height":2,"width":3,"url":"crap"}]});
    const createdMedia = await Media.update({fileName:fileName}, updatedMedia);
    if(!createdMedia) {
        return undefined;
    }
    return createdMedia;
};

const updateMediaStatus = async (fileName: string, updatedMediaStatus: Partial<IMediaContent>): Promise<IMediaContent | undefined> => {
    const createdMedia = await Media.update({fileName:fileName}, updatedMediaStatus);
    if(!createdMedia) {
        return undefined;
    }
    return createdMedia;
};

const DB_QUERIES = {
    createMedia,
    getMediaById,
    getFileName,
    updateMedia,
    updateMediaStatus
};

export default DB_QUERIES;