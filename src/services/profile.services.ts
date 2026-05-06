import {profile} from '../endpoints/endpoints'
import ApiService from '../api/api.service'
import { RequestBuilder } from '../api/request.builder'

export class ProfileServices{
    constructor(
        private socialApi: ApiService
    ){}

    async uploadProfilePicture(payload: {mediaId:string} | any = {}){
        const requestPayload = new RequestBuilder()
            .setUrl(`${profile.POST_UPLOAD_PROFILE}`)
            .setMethod('POST')
            .setBody(payload)
            .build()
        
            const response = await this.socialApi.request(requestPayload)
        return {
            response
        }
    }
}