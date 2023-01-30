import Media, { IMediaContent } from '../../models/media';

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
const getMediaById = async (resourceType: string, postId: string): Promise<Array<IMediaContent>> => {
    //const media = await Media.scan('resourceId').eq(postId).exec();
    const media = await Media.query('resourceId')
        .eq(postId)
        .and()
        .where('resourceType')
        .eq('post')
        .using('resourceIdLocalIndex')
        .exec();
    if (!media) {
        return [];
    }
    return media;
};

/*
Function to get the Media entry from the DB that matches the fileName
*/
const getFileName = async (resourceTypeVar: string, fileNameVar: string): Promise<Array<IMediaContent | undefined>> => {
    const name = await Media.query('fileName').eq(fileNameVar).and().where('resourceType').eq(resourceTypeVar).exec();
    //.using('fileName');
    if (!name) {
        return [];
    }
    return name;
};

/*
Function to update the MediaUrls of a Media entry that has a matching fileName
*/
const updateMedia = async (
    resourceType: string,
    fileName: string,
    updatedMedia: Partial<IMediaContent>
): Promise<IMediaContent | undefined> => {
    const createdMedia = await Media.update({ fileName: fileName, resourceType: resourceType }, updatedMedia);
    if (!createdMedia) {
        return undefined;
    }
    return createdMedia;
};

/*
Function to update the status of a Media entry that has a matching fileName
*/
const updateMediaStatus = async (
    resourceType: string,
    fileName: string,
    updatedMediaStatus: Partial<IMediaContent>
): Promise<IMediaContent | undefined> => {
    const createdMedia = await Media.update({ fileName: fileName, resourceType: resourceType }, updatedMediaStatus);
    if (!createdMedia) {
        return undefined;
    }
    return createdMedia;
};

const DB_QUERIES = {
    createMedia,
    getMediaById,
    getFileName,
    updateMedia,
    updateMediaStatus,
};

export default DB_QUERIES;
