import { ServiceContainer } from "../../src/services/service.container";
import { RegistrationFactory } from "../testdata/factory/registration.factory";
import { TestContext } from "../../src/context/test.context";
import { LoginFlow } from "./login.api.flow";

export class RegistrationFlow{
    constructor(
        private service: ServiceContainer,
        private loginFlow: LoginFlow
    ){}

    async loginUserFlow(){
        const {contactNumber} = await this.service.registrationRepo.getUnregisteredMember()
        const {response, accessToken, stateToken} = await this.loginFlow.loginFlow(contactNumber)
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
        const {response, accessToken} =await this.service.registrationService.registerUser(registerUserPayload)
        TestContext.accessToken=accessToken
        return response
    }
}