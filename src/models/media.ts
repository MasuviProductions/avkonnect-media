import * as dynamoose from 'dynamoose';
import { IDynamooseDocument } from '../interfaces/app';
import { TABLE } from '../constants/db';

export type IMediaType = 'image' | 'video';

export type IMediaStatus = 'uploading' | 'uploaded' | 'processing' | 'success' | 'error';

// media URLs will contain the resolution of media along with the s3 URL
export interface IMediaUrls {
    url: string;
    height: number;
    width: number;
}

const mediaUrlSchema = new dynamoose.Schema({
    url: { type: String },
    height: { type: Number },
    width: { type: Number },
});

// media content has the data for each media uploaded
export interface IMediaContent {
    resourceId: string; // postId
    resourceType: string; // post
    mediaType: IMediaType; // image or video
    createdAt: Date;
    fileName: string; // filename should be unique
    status: IMediaStatus; // status of the media
    fileSize: number; // size of the file in bytes
    mediaUrls: IMediaUrls[];
}

const mediaSchema = new dynamoose.Schema({
    resourceId: { type: String, index: true }, //local index
    resourceType: { type: String, hashKey: true }, //partition key
    mediaType: { type: String },
    createdAt: { type: Date },
    fileName: { type: String, rangeKey: true }, //sort key
    status: { type: String },
    fileSize: { type: Number },
    mediaUrls: { type: Array, schema: Array.of(mediaUrlSchema) },
});

const Media = dynamoose.model<IDynamooseDocument<IMediaContent>>(TABLE.MEDIA, mediaSchema);

export default Media;
