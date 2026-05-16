import { user } from "endpoints/endpoints";
import ApiService from '../api/api.service';
import { RequestBuilder } from '../api/request.builder';

export class UserServices{


    constructor(
    private socialApi: ApiService
    ) {}

    async getRegion(payload: Record<string,any>){
        const requestPayload = new RequestBuilder()
            .setUrl(`${user.GET_USER_REGION}${payload.region}`)
            .setMethod('GET')
            .build()

        const response = await this.socialApi.request(requestPayload)
        return {
            response
        }
    }

    async updateUserLocation(payload: Record<string,any>){
        const requestPayload = new RequestBuilder()
            .setUrl(user.PATCH_USER_LOCATION)
            .setMethod('PATCH')
            .setBody(payload)
            .build()

        const response = await this.socialApi.request(requestPayload)
        return {
            response
        }
    }

    async getAllFriends(){
        const requestPayload = new RequestBuilder()
            .setUrl(user.GET_ALL_FRIENDS)
            .setMethod('GET')
            .build()

        const response = await this.socialApi.request(requestPayload)
        return {
            response
        }
    }

    async getFriendsCount(){
        const requestPayload = new RequestBuilder()
            .setUrl(user.GET_FRIENDS_COUNT)
            .setMethod('GET')
            .build()

        const response = await this.socialApi.request(requestPayload)
        return {
            response
        }
    }

    async sendFriendRequest(payload: Record<string,any>){
        const requestPayload = new RequestBuilder()
            .setUrl(user.POST_SEND_FRIEND_REQUEST)
            .setMethod('POST')
            .setBody(payload)
            .build()

        const response = await this.socialApi.request(requestPayload)
        return {
            response
        }
    }

    async acceptFriendRequest(payload: Record<string,any>){
        const requestPayload = new RequestBuilder()
            .setUrl(user.POST_ACCEPT_FRIEND_REQUEST)
            .setMethod('POST')
            .setBody(payload)
            .build()

        const response = await this.socialApi.request(requestPayload)
        return {
            response
        }
    }

    async rejectFriendRequest(payload: Record<string,any>){
        const requestPayload = new RequestBuilder()
            .setUrl(user.POST_REJECT_FRIEND_REQUEST)
            .setMethod('POST')
            .setBody(payload)
            .build()

        const response = await this.socialApi.request(requestPayload)
        return {
            response
        }
    }

    async cancelFriendRequest(payload: Record<string,any>){
        const requestPayload = new RequestBuilder()
            .setUrl(user.POST_CANCEL_FRIEND_REQUEST)
            .setMethod('POST')
            .setBody(payload)
            .build()

        const response = await this.socialApi.request(requestPayload)
        return {
            response
        }
    }


    async allPendingRequests(payload: Record<string,any>){
        const requestPayload = new RequestBuilder()
            .setUrl(user.GET_ALLPENDING_REQUESTS)
            .setMethod('GET')
            .setBody(payload)
            .build()

        const response = await this.socialApi.request(requestPayload)
        return {
            response
        }
    }

    async allSentPendingRequests(){
        const requestPayload = new RequestBuilder()
            .setUrl(user.GET_ALLSENT_PENDING_REQUESTS)
            .setMethod('GET')
            .build()

        const response = await this.socialApi.request(requestPayload)
        return {
            response
        }
    }

    async searchUserByName(){
        const requestPayload = new RequestBuilder()
            .setUrl(user.POST_SEARCH_USER_BY_NAME)
            .setMethod('POST')
            .build()

        const response = await this.socialApi.request(requestPayload)
        return {
            response
        }
    }

    async userDetailsById(){
        const requestPayload = new RequestBuilder()
            .setUrl(user.POST_GET_USER_DETAILS_BY_ID)
            .setMethod('POST')
            .build()

        const response = await this.socialApi.request(requestPayload)
        return {
            response
        }
    }

    async friendRecommendation(){
        const requestPayload = new RequestBuilder()
            .setUrl(user.GET_RECOMMENDATIONS)
            .setMethod('GET')
            .build()

        const response = await this.socialApi.request(requestPayload)
        return {
            response
        }
    }

    async deleteFriend(){
        const requestPayload = new RequestBuilder()
            .setUrl(user.DEL_FRIEND_FROM_LIST)
            .setMethod('DELETE')
            .build()

        const response = await this.socialApi.request(requestPayload)
        return {
            response
        }
    }
}