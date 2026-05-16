import { ENV } from "../helper/env/env.config";
import { LoginFactory } from "../testdata/factory/login.factory";
import { TestContext } from "../../src/context/test.context";
import { ServiceContainer } from "../../src/services/service.container";
import { wait } from "../utils/wait";
import { getMemDetailsFromJwt } from "../../src/helper/auth/jwt.decode";


export class LoginFlow{
    constructor(private service: ServiceContainer){}

    async loginFlow(
        contactNumber: string,
        userId: string='',
        type: 'initial user' | 'current user' = 'initial user'
    ){
        // const codeVerifier = DataGenerator.generateRandomString()
        // const codeChallenge = DataGenerator.generateCodeChallenge(codeVerifier)

        const signInContactPayload = {
            ...LoginFactory.signInContactPayload(),
            contactNo:contactNumber
        }
        const signInContactResponse = await this.service.loginService.signInContact(signInContactPayload)
        await wait(1000)

        const verifyOtpPayload = {
            ...LoginFactory.verifyOtpPayload(),
            id:Number(signInContactResponse.otpRequestId)
        }
        const verifyOtpResponse = await this.service.loginService.verifyOtp(verifyOtpPayload)

        if(verifyOtpResponse.members.length>0 && verifyOtpResponse.stateToken){
            let memUUID:any
            if(verifyOtpResponse.members[0]?.fullName=='DYUTISUNDAR DUTTA'){
                memUUID = verifyOtpResponse.members[0].memuuid
            }else if(verifyOtpResponse.members[1]?.fullName=='DYUTISUNDAR DUTTA'){
                memUUID = verifyOtpResponse.members[1].memuuid
            }else if(userId==''){
                memUUID = verifyOtpResponse.members[0].memuuid
            }else{
                memUUID=userId
            }
            if(type == 'current user'){
                TestContext.currentStateToken = verifyOtpResponse.stateToken
            }else if (type == 'initial user'){
                TestContext.initialStateToken = verifyOtpResponse.stateToken
            }
            

            const createSessionPayload = {
                ...LoginFactory.createSessionPayload(),
                userId:memUUID
            }
            const createSessionResponse = await this.service.loginService.createSession(createSessionPayload)
            
            if(type == 'current user'){
                TestContext.currentSsoSession = createSessionResponse.ssoSession
            }else if (type == 'initial user'){
                TestContext.initialSsoSession = createSessionResponse.ssoSession
            }
        }

        if(verifyOtpResponse.ssoSession){
            if(type == 'current user'){
                TestContext.currentSsoSession = verifyOtpResponse.ssoSession
            }else if (type == 'initial user'){
                TestContext.initialSsoSession = verifyOtpResponse.ssoSession
            }
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
            if(type == 'current user'){
                TestContext.currentAccessToken = loginResponse.accessToken
                const memberDetails = getMemDetailsFromJwt(TestContext.currentAccessToken)
                TestContext.currentMemuuid = memberDetails.memuuid
                TestContext.currentFamilyCode = memberDetails.familyCode
                TestContext.currentMemberCode = memberDetails.memberCode
                TestContext.currentFirstName = memberDetails.firstName
                TestContext.currentLastName = memberDetails.lastName
            }else if (type == 'initial user'){
                TestContext.initialAccessToken = loginResponse.accessToken
                const memberDetails = getMemDetailsFromJwt(TestContext.initialAccessToken)
                TestContext.initialMemuuid = memberDetails.memuuid
                TestContext.initialFamilyCode = memberDetails.familyCode
                TestContext.initialMemberCode = memberDetails.memberCode
                TestContext.initialFirstName = memberDetails.firstName
                TestContext.initialLastName = memberDetails.lastName
            }
        }
        return loginResponse
    }
}
