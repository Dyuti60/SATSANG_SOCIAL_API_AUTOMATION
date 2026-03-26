import { RequestBuilder } from "../api/request.builder";
import ApiService from "../api/api.service";
import { login } from "../endpoints/endpoints";

export class LoginService{
    constructor(
    private ssoApi: ApiService,
    private socialApi: ApiService
    ) {}

    async signInContact(payload:{
        contactNo:string
    }){
        const requestPayload = new RequestBuilder()
            .setUrl(login.signInContact)
            .setMethod('POST')
            .setBody(payload)
            .build()
        const response = await this.ssoApi.request(requestPayload)
        const data = response?.data?.data || {}
        return {
            response,
            otpRequestId: data.otpRequestId || ''
        }
    }

    async verifyOtp(payload:{
        id:number, otp:string, appId:number, codeChallenge:string
    }){

        const requestPayload = new RequestBuilder()
            .setUrl(login.verifyOtp)
            .setMethod('POST')
            .setBody(payload)
            .build()
        const response = await this.ssoApi.request(requestPayload)

        const data = response?.data?.data || {}

        return {
            response,
            ssoSession: data['sso-session'] || '',
            stateToken: data.stateToken || '',
            members: data.members || []
        }
    }

    async createSession(payload:{
        appId:number, codeChallenge:string, userId: string
    }){
        const requestPayload = new RequestBuilder()
            .setUrl(login.createSession)
            .setMethod('POST')
            .setBody(payload)
            .build()
        const response = await this.ssoApi.request(requestPayload)
        
        const data = response?.data?.data || {}
        return {
            response,
            ssoSession:data['sso-session'] || ''
        }
    }

    async authorizeSession(payload:{
        appId:number, codeChallenge:string
    }){
        const requestPayload = new RequestBuilder()
            .setUrl(login.authorizeSession)
            .setMethod('POST')
            .setBody(payload)
            .build()
        const response = await this.ssoApi.request(requestPayload)
        const data = response?.data?.data || {}
        return {
            response,
            accessCode: data.accessCode || ''
        }
    }

    async loginUser(payload:{
        accessCode:string, codeVerifier:string
    }){
        const requestPayload = new RequestBuilder()
            .setUrl(login.loginUser)
            .setMethod('POST')
            .setBody(payload)
            .build()
        const response = await this.socialApi.request(requestPayload)

        const data = response?.data?.data || {}

        return {
            response,
            accessToken: data.accessToken || '',
            stateToken: data.stateToken || ''
        }
    }
}