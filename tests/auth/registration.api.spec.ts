import { RegistrationFactory } from "../../src/testdata/factory/registration.factory"
import ResponseValidator from "../../src/api/response.validator"
import { TestContext } from "../../src/context/test.context"
import { invalidRegisterUserCases, invalidRegisterUserStateTokenCases } from "../../src/testdata/invalid/registration.invalid.data"

describe('🔐 Registration API Tests', () => {

    invalidRegisterUserCases.forEach((testCase)=>{

        test(`[no-login] Invalid Registration - ${testCase.description} `,async ()=>{
            const {stateToken} = await TestContext.flows.registrationFlow.loginUserFlow()

            const registerUserPayload = RegistrationFactory.registerPayload(testCase.overrides)
            const {response} = await TestContext.services.registrationService.registerUser({
                ...registerUserPayload,
                stateToken
            })

            ResponseValidator.validateStatus(response,testCase.expectedStatus)
            ResponseValidator.validateErrorMessage(response,testCase.expectedMessage)
            
        })
    })

    invalidRegisterUserStateTokenCases.forEach((testCase)=>{
        test(`[no-login] Invalid Registration - ${testCase.description} `,async ()=>{
            const registerUserPayload = RegistrationFactory.registerPayload(testCase.overrides)
            const {response} = await TestContext.services.registrationService.registerUser({
                ...registerUserPayload
            })
            ResponseValidator.validateStatus(response,testCase.expectedStatus)
            ResponseValidator.validateErrorMessage(response,testCase.expectedMessage)
        })
    })

    test('Valid Registration',async ()=>{
        const response= await TestContext.flows.registrationFlow.registerUserFlow()
        ResponseValidator.validateSuccess(response,{
        httpStatus: 201,
        statusCode: 200,
        message: "Successfully registered"
        })
    })

})
