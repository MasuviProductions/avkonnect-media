import Media, { IMediaContent } from "../../models/media";


const createMedia = async (media: IMediaContent): Promise<IMediaContent | undefined> => {
    const mediaObj = new Media(media);
    await mediaObj.save();
    return mediaObj;
};

// const getCommentById = async (commentId: string): Promise<IComment | undefined> => {
//     const comment = await Comment.scan('id').eq(commentId).using('commentIdIndex').exec();
//     return comment?.[0];
// };

const getMediaById = async (postId: string): Promise<Array<IMediaContent>> => {
    //let media = [];
    const media = await Media.scan('resourceId').eq(postId).exec();
    if (!media) {
        return [];
    }
    return media;
};

// const getMediaById = async (postId: string): Promise<IMediaContent | undefined> => {
//     const media = await Media.scan('resourceId').eq(postId).using('mediaIdIndex').exec();
//     return media?.[0];
// };


const DB_QUERIES = {
    createMedia,
    getMediaById,
};

export default DB_QUERIES;