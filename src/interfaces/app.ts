import { ObjectType } from 'dynamoose/dist/General';
import {
    ContextConfigDefault,
    preHandlerAsyncHookHandler,
    RawReplyDefaultExpression,
    RawRequestDefaultExpression,
    RawServerDefault,
    RequestGenericInterface,
    RouteHandlerMethod,
} from 'fastify';
import { ReplyGenericInterface } from 'fastify/types/reply';

interface FastifyRouteGenericInterface extends RequestGenericInterface, ReplyGenericInterface {}

export type RequestHandler<Request = unknown> = RouteHandlerMethod<
    RawServerDefault,
    RawRequestDefaultExpression<RawServerDefault>,
    RawReplyDefaultExpression<RawServerDefault>,
    Request & FastifyRouteGenericInterface,
    ContextConfigDefault
>;

export type PreRequestHandler<Request = unknown> = preHandlerAsyncHookHandler<
    RawServerDefault,
    RawRequestDefaultExpression<RawServerDefault>,
    RawReplyDefaultExpression<RawServerDefault>,
    Request & FastifyRouteGenericInterface,
    ContextConfigDefault
>;

export interface HttpResponseError {
    code: string;
    message: string;
}

export interface HttpResponsePagination {
    totalCount: number;
    totalPages: number;
    page: number;
    count: number;
}

export interface HttpDynamoDBResponsePagination {
    nextSearchStartFromKey?: ObjectType;
    count: number;
}

export interface HttpResponse<T = unknown> {
    success: boolean;
    data?: T;
    error?: HttpResponseError;
    pagination?: HttpResponsePagination;
    dDBPagination?: HttpDynamoDBResponsePagination;
}
