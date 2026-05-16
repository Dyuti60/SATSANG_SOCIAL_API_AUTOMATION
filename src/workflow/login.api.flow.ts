import { LoginFactory } from "../testdata/factory/login.factory";
import { TestContext } from "../../src/context/test.context";
import { ServiceContainer } from "../../src/services/service.container";
import { DataGenerator } from "../utils/data.generator";

export class LoginFlow{
    constructor(private service: ServiceContainer){}

    async loginFlow(contactNumber:string){
        // const codeVerifier = DataGenerator.generateRandomString()
        // const codeChallenge = DataGenerator.generateCodeChallenge(codeVerifier)

        const signInContactPayload = {
            ...LoginFactory.signInContactPayload(),
            contactNo:contactNumber
        }
        const signInContactResponse = await this.service.loginService.signInContact(signInContactPayload)

        const verifyOtpPayload = {
            ...LoginFactory.verifyOtpPayload(),
            id:Number(signInContactResponse.otpRequestId)
        }
        const verifyOtpResponse = await this.service.loginService.verifyOtp(verifyOtpPayload)

        if(verifyOtpResponse.members.length>0 && verifyOtpResponse.stateToken){
            let memUUID=''
            if(verifyOtpResponse.members[0]?.fullName=='DYUTISUNDAR DUTTA'){
                memUUID = verifyOtpResponse.members[0].memuuid
            }else if(verifyOtpResponse.members[1]?.fullName=='DYUTISUNDAR DUTTA'){
                memUUID = verifyOtpResponse.members[1].memuuid
            }else{
                memUUID = verifyOtpResponse.members[0].memuuid
            }

            TestContext.stateToken = verifyOtpResponse.stateToken

            const createSessionPayload = {
                ...LoginFactory.createSessionPayload(),
                userId:memUUID
            }
            const createSessionResponse = await this.service.loginService.createSession(createSessionPayload)
            
            TestContext.ssoSession=createSessionResponse.ssoSession
        }

        if(verifyOtpResponse.ssoSession){
            TestContext.ssoSession=verifyOtpResponse.ssoSession
        }

        const authorizeSessionPayload = {
            ...LoginFactory.authorizeSessionPayload()
        }
        const authorizeSessionResponse = await this.service.loginService.authorizeSession(authorizeSessionPayload)

        const loginPayload = {
            ...LoginFactory.loginPayload(),
            accessCode: authorizeSessionResponse.accessCode
        }
        const loginResponse = await this.service.loginService.loginUser(loginPayload)
        if(loginResponse.accessToken){
            TestContext.accessToken=loginResponse.accessToken
        }

        return loginResponse
    }
}
