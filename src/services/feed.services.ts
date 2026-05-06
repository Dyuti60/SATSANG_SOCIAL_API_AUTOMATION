import { feed } from "../endpoints/endpoints";
import ApiService from "../api/api.service";
import { RequestBuilder } from "../api/request.builder";

export class FeedServices {
    constructor(
        private socialApi: ApiService
    ){}

    async createPost(payload: any){
        const requestPayload = new RequestBuilder()
            .setUrl(`${feed.POST_CREATE_POST}`)
            .setMethod('POST')
            .setBody(payload)
            .build()
        const response = await this.socialApi.request(requestPayload)
        return {
            response
        }
    }

    async getPostInFeed(){
        const requestPayload = new RequestBuilder()
            .setUrl(`${feed.GET_POSTS_IN_FEED}`)
            .setMethod('GET')
            .build()
        const response = await this.socialApi.request(requestPayload)
        return {
            response
        }
    }

    async getPostVisibilityOptions(){
        const requestPayload = new RequestBuilder()
            .setUrl(`${feed.GET_POSTS_VISIBILITY_OPTIONS}`)
            .setMethod('GET')
            .build()
        const response = await this.socialApi.request(requestPayload)
        return {
            response
        }
    }

    async getPostReactionOptions(){
        const requestPayload = new RequestBuilder()
            .setUrl(`${feed.GET_POSTS_REACTION_OPTIONS}`)
            .setMethod('GET')
            .build()
        const response = await this.socialApi.request(requestPayload)
        return {
            response
        }
    }

    async reactToPost(payload: any){
        const requestPayload = new RequestBuilder()
            .setUrl(`${feed.POST_REACT_TO_POST}`)
            .setMethod('POST')
            .setBody(payload)
            .build()
        const response = await this.socialApi.request(requestPayload)
        return {
            response
        }
    }

    async placeCommentToAPost(payload: any){
        const requestPayload = new RequestBuilder()
            .setUrl(`${feed.POST_ADDCOMMENT_ON_POST}`)
            .setMethod('POST')
            .setBody(payload)
            .build()
        const response = await this.socialApi.request(requestPayload)
        return {
            response
        }
    }

    async getCommentOnPost(payload:any){
        const requestPayload = new RequestBuilder()
            .setUrl(`${feed.GET_COMMENTS_ON_POST}`)
            .setMethod('GET')
            .setParams(payload)
            .build()
        const response = await this.socialApi.request(requestPayload)
        return {
            response
        }
    }

    async getCommentReactionOptions(){
        const requestPayload = new RequestBuilder()
            .setUrl(`${feed.GET_USERCOMMENT_REACTIONS}`)
            .setMethod('GET')
            .build()
        const response = await this.socialApi.request(requestPayload)
        return {
            response
        }
    }

    async reactToCommentOnAPost(payload: any){
        const requestPayload = new RequestBuilder()
            .setUrl(`${feed.POST_REACT_TO_COMMENT_ON_POST}`)
            .setMethod('POST')
            .setBody(payload)
            .build()
        const response = await this.socialApi.request(requestPayload)
        return {
            response
        }
    }

    async bookmarkAPost(payload: any){
        const requestPayload = new RequestBuilder()
            .setUrl(`${feed.POST_BOOKMARK_POST}`)
            .setMethod('POST')
            .setBody(payload)
            .build()
        const response = await this.socialApi.request(requestPayload)
        return {
            response
        }
    }

    async removePostFromBookmark(payload: any){
        const requestPayload = new RequestBuilder()
            .setUrl(`${feed.PATCH_REMOVE_BOOKMARKED_POST}`)
            .setMethod('PATCH')
            .setBody(payload)
            .build()
        const response = await this.socialApi.request(requestPayload)
        return {
            response
        }
    }

    async getBookmarkedPosts(){
        const requestPayload = new RequestBuilder()
            .setUrl(`${feed.GET_BOOKMARKED_POSTS}`)
            .setMethod('GET')
            .build()
        const response = await this.socialApi.request(requestPayload)
        return {
            response
        }
    }

    async getPostsInProfile(){
        const requestPayload = new RequestBuilder()
            .setUrl(`${feed.GET_POSTS_IN_PROFILE}`)
            .setMethod('GET')
            .build()
        const response = await this.socialApi.request(requestPayload)
        return {
            response
        }
    }

    async getUsersLocationList(){
        const requestPayload = new RequestBuilder()
            .setUrl(`${feed.GET_FEED_LOCATION}`)
            .setMethod('GET')
            .build()
        const response = await this.socialApi.request(requestPayload)
        return {
            response
        }
    }
}