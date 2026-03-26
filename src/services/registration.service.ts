import { register } from '../endpoints/endpoints';
import ApiService from '../api/api.service';
import { RequestBuilder } from '../api/request.builder';

export class RegistrationService{

    constructor(
    private socialApi: ApiService
    ) {}

    async registerUser(payload: Record<string, any>){
        const requestPayload = new RequestBuilder()
            .setUrl(register.registerUser)
            .setMethod('POST')
            .setBody(payload)
            .build()
        const response:any = await this.socialApi.request(requestPayload)
        const data = response?.data?.data || {}
        return {
            response,
            accessToken: data.accessToken
        }
    }

}