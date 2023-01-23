import { IUpdateMediaRequest } from "../../interfaces/app";
import Media, { IMediaContent } from "../../models/media";

/*
Function to Create Media entries in the DB
*/
const createMedia = async (media: IMediaContent): Promise<IMediaContent | undefined> => {
    const mediaObj = new Media(media);
    await mediaObj.save();
    return mediaObj;
};

/*
Function to get all Media entries from the DB that belongs to a resourceId
*/
const getMediaById = async (postId: string): Promise<Array<IMediaContent>> => {
    const media = await Media.scan('resourceId').eq(postId).exec();
    if (!media) {
        return [];
    }
    return media;
};

/*
Function to get the Media entry from the DB that matches the fileName
*/
const getFileName = async (fileNameVar: string, ) : Promise<IMediaContent |undefined> => {
    const name = await Media.scan('fileName').eq(fileNameVar).exec();
    if(!name){
        return undefined;
    }
    return name[0];
};

/*
Function to update the MediaUrls of a Media entry that has a matching fileName
*/
const updateMedia = async (fileName: string, updatedMedia: Partial<IMediaContent>): Promise<IMediaContent | undefined> => {
    const createdMedia = await Media.update({fileName:fileName}, updatedMedia);
    if(!createdMedia) {
        return undefined;
    }
    return createdMedia;
};

/*
Function to update the status of a Media entry that has a matching fileName
*/
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