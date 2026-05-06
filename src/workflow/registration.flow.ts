import { ServiceContainer } from "../../src/services/service.container";
import { RegistrationFactory } from "../testdata/factory/registration.factory";
import { TestContext } from "../../src/context/test.context";
import { LoginFlow } from "./login.api.flow";
import { getMemDetailsFromJwt } from "../../src/helper/auth/jwt.decode";

export class RegistrationFlow{
    constructor(
        private service: ServiceContainer,
        private loginFlow: LoginFlow
    ){}

    async loginUserFlow(){
        const {contactNumber} = await this.service.registrationRepo.getUnregisteredMember()
        const {response, accessToken, stateToken} = await this.loginFlow.loginFlow(contactNumber,'','current user')
        return {
            stateToken:stateToken
        }
    }

    async registerUserFlow(){
        const {stateToken} = await this.loginUserFlow()

        const registerUserPayload = {
            ...RegistrationFactory.registerPayload(),
            stateToken
        }
        console.log(`Registration payload: ${JSON.stringify(registerUserPayload)}`)
        const {response, accessToken} =await this.service.registrationService.registerUser(registerUserPayload)
        TestContext.currentAccessToken=accessToken
        const currentUserDetails = getMemDetailsFromJwt(TestContext.currentAccessToken)
        TestContext.currentMemuuid = currentUserDetails.memuuid
        TestContext.currentFamilyCode = currentUserDetails.familyCode
        TestContext.currentMemberCode = currentUserDetails.memberCode
        TestContext.currentFirstName = currentUserDetails.firstName
        TestContext.currentLastName = currentUserDetails.lastName
    
        return response
    }
}