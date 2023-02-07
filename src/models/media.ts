import * as dynamoose from 'dynamoose';
import { IDynamooseDocument } from '../interfaces/app';
import { TABLE } from '../constants/db';

export type IMediaType = 'image' | 'video';

export type IMediaStatus = 'uploading' | 'uploaded' | 'processing' | 'success' | 'error';

// meta data will contain all kinds of info about the media
export interface IMetaData {
    originalUrl: string; // s3 url of the original media file
    fileName: string; // original name of the file
    resolution: string; // height x width
    fileSize: number; // size of the file in bytes
    colorSpace: string; // the color space of the media
    creator: string; // creator of the file
}

const metaDataSchema = new dynamoose.Schema({
    originalUrl: { type: String },
    fileName: { type: String },
    resolution: { type: String },
    fileSize: { type: Number },
    colorSpace: { type: String },
    creator: { type: String },
});

// media URLs will contain the resolution of media along with the s3 URL
export interface IMediaUrls {
    url: string;
    meta: IMetaData;
}

const mediaUrlSchema = new dynamoose.Schema({
    url: { type: String },
    meta: { type: Object, schema: metaDataSchema },
});

// media content has the data for each media uploaded
export interface IMediaContent {
    resourceId: string; // postId
    resourceType: string; // post
    mediaType: IMediaType; // image or video
    createdAt: Date;
    fileName: string; // filename should be unique
    status: IMediaStatus; // status of the media
    metaData: IMetaData;
    mediaUrls: IMediaUrls[];
}

const mediaSchema = new dynamoose.Schema({
    resourceId: { type: String, index: true }, //local index
    resourceType: { type: String, hashKey: true }, //partition key
    mediaType: { type: String },
    createdAt: { type: Date },
    fileName: { type: String, rangeKey: true }, //sort key
    status: { type: String },
    metaData: { type: Object, schema: metaDataSchema },
    mediaUrls: { type: Array, schema: Array.of(mediaUrlSchema) },
});

const Media = dynamoose.model<IDynamooseDocument<IMediaContent>>(TABLE.MEDIA, mediaSchema);

export default Media;
