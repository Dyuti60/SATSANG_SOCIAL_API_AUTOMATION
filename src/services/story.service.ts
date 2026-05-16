import { story } from "../endpoints/endpoints";
import ApiService from "../api/api.service";
import { RequestBuilder } from "../api/request.builder";

export class StoryServices {
    constructor(
        private socialApi: ApiService
    ){}

    async createStory(payload: any){
        const requestPayload = new RequestBuilder()
            .setUrl(`${story.POST_CREATE_STORY}`)
            .setMethod('POST')
            .setBody(payload)
            .build()
        const response = await this.socialApi.request(requestPayload)
        return {
            response
        }
    }

    async bulkCreateStories(payload: any){
        const requestPayload = new RequestBuilder()
            .setUrl(`${story.POST_CREATE_STORY}`)
            .setMethod('POST')
            .setBody(payload)
            .build()
        const response = await this.socialApi.request(requestPayload)
        return {
            response
        }
    }

    async fetchStories(payload:any){
        const requestPayload = new RequestBuilder()
            .setUrl(`${story.GET_STORIES}`)
            .setMethod('GET')
            .setParams(payload)
            .build()
        const response = await this.socialApi.request(requestPayload)
        return {
            response
        }
    }

    async viewOrReactToStory(payload: any){
        const requestPayload = new RequestBuilder()
            .setUrl(`${story.POST_REACTTO_STORY}`)
            .setMethod('POST')
            .setBody(payload)
            .build()
        const response = await this.socialApi.request(requestPayload)
        return {
            response
        }
    }

    async deleteStory(payload:any){
        const requestPayload = new RequestBuilder()
            .setUrl(`${story.DELETE_STORY}${payload.storyId}`)
            .setMethod('DELETE')
            .setBody(payload)
            .build()
        const response = await this.socialApi.request(requestPayload)
        return {
            response
        }
    }

    async getAllReactionsOrViewsForStory(payload:any){
        const requestPayload = new RequestBuilder()
            .setUrl(`${story.GET_REACTION_AND_VIEWS}${payload.storyId}/reactions`)
            .setMethod('GET')
            .setBody(payload)
            .build()
        const response = await this.socialApi.request(requestPayload)
        return {
            response
        }
    }


}