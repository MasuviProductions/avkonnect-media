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
}




const updateMedia = async (fileName: string,createdAt: Date, updatedMedia: Partial<IMediaContent>): Promise<IMediaContent | undefined> => {
    console.log("loper");
    console.log(updatedMedia);
    //const createdMedia = await Media.update({fileName:fileName}, {mediaUrls:[{"height":2,"width":3,"url":"crap"}]});
    const createdMedia = await Media.update({fileName:fileName}, updatedMedia);
    return createdMedia;
};

// const updateComment = async (
//     sourceId: string,
//     createdAt: Date,
//     updatedComment: Partial<Pick<IComment, 'contents' | 'isDeleted' | 'isBanned'>>
// ): Promise<IComment | undefined> => {
//     const comment = await Comment.update({ sourceId: sourceId, createdAt: createdAt.getTime() }, updatedComment);
//     return comment;
// };

const DB_QUERIES = {
    createMedia,
    getMediaById,
    getFileName,
    updateMedia
};

export default DB_QUERIES;