import { faker } from '@faker-js/faker';

type FeedPayloadOptions = {
  caption?: string;
  mediaIds?: string[];
  locationId?: string;
  visibility?: number;
  shareEnable?: boolean;
}

type postReactionOptions = {
    postId?: string,
    reactionType?: number
}

type placePostCommentOptions = {
    commentId?: string,
    parentCommentId?: string,
    postId?: string,
    content?: string
}

type reactOnCommentOptions = {
    postId?: string,
    commentId?: string,
    reactionType?: number
}

type bookmarkOptions = {
    postId?: string
}

export class FeedFactory {

    static buildPostPayload(options: FeedPayloadOptions={}){
        const payload = {
            caption: options.caption ?? faker.lorem.words(10),
            locationId: options.locationId ?? "101",
            visibility: options.visibility ?? 202,
            mediaIds: options.mediaIds ?? [],
            shareEnable: options.shareEnable ?? true
        }
        
        if((!payload.caption || payload.caption.trim()==="") && payload.mediaIds.length==0){
            throw new Error('Either caption or mediaIds must be provided')
        }
        return payload
    }

    static buildPostReactionPayload(options: postReactionOptions = {}){
        const payload = {
            postId: options.postId ?? '',
            reactionType: options.reactionType ?? faker.helpers.arrayElement([500,501])
        }
        return payload
    }

static buildPostCommentPayload(options: placePostCommentOptions = {}) {
    const payload: any = {};

    if (options.commentId) {
        payload.commentId = options.commentId;
    }

    if (options.parentCommentId) {
        payload.parentCommentId = options.parentCommentId;
    }

    if (options.postId) {
        payload.postId = options.postId;
    }

    if (options.content) {
        payload.content = options.content;
    }

    // fallback: if content not provided, generate it
    if (!payload.content) {
        payload.content = faker.lorem.paragraphs();
    }

    return payload;
}

    static buildReactOnCommentPayload(options:reactOnCommentOptions = {}){
        const payload = {
            postId: options.postId ?? '',
            commentId: options.commentId ?? '',
            reactionType: options.reactionType ?? faker.helpers.arrayElement([700,701]) 
        }
        return payload
    }

    static buildBookmarkPayload(options: bookmarkOptions = {}){
        const payload = {
            postId: options.postId ?? ''
        }
        return payload
    }

}