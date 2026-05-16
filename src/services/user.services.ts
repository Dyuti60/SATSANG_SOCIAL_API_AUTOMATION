import { user } from "../endpoints/endpoints";
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

    async updateUserLocation(payload:any){
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

    async getAllFriends(payload?: any){
        const requestPayload = new RequestBuilder()
            .setUrl(user.GET_ALL_FRIENDS)
            .setMethod('POST')
            .setBody(payload)
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

    async acceptFriendRequest(payload: any){
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

    async rejectFriendRequest(payload: any){
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

    async cancelFriendRequest(payload:any){
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


    async allPendingRequests(){
        const requestPayload = new RequestBuilder()
            .setUrl(user.GET_ALLPENDING_REQUESTS)
            .setMethod('GET')
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

    async searchUserByName(payload:any){
        const requestPayload = new RequestBuilder()
            .setUrl(user.POST_SEARCH_USER_BY_NAME)
            .setMethod('POST')
            .setBody(payload)
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

    async deleteFriend(payload:any){
        const requestPayload = new RequestBuilder()
            .setUrl(user.DEL_FRIEND_FROM_LIST)
            .setMethod('DELETE')
            .setBody(payload)
            .build()

        const response = await this.socialApi.request(requestPayload)
        return {
            response
        }
    }

    async getProfile(payload?:any){
        console.log(`sfmmId in service file: ${JSON.stringify(payload)}`)
        const requestPayload = new RequestBuilder()
            .setUrl(user.GET_PROFILE)
            .setMethod('GET')
            .setParams(payload)
            .build()

        const response = await this.socialApi.request(requestPayload)
        return {
            response
        }
    }

    async updateProfile(payload:any){
        const requestPayload = new RequestBuilder()
            .setUrl(user.GET_PROFILE)
            .setMethod('PATCH')
            .setBody(payload)
            .build()

        const response = await this.socialApi.request(requestPayload)
        return {
            response
        }
    }

    async nearBySatsangee(payload:any={}){
        const requestPayload = new RequestBuilder()
            .setUrl(user.POST_NEARBY_SATSANGEES)
            .setMethod('POST')
            .setBody(payload)
            .build()

        const response = await this.socialApi.request(requestPayload)
        return {
            response
        }
    }
}