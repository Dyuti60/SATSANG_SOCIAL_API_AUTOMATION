import { RegistrationFactory } from "src/testdata/factory/registration.factory"
import ResponseValidator from "src/api/response.validator"
import { TestContext } from "src/context/test.context"
import { invalidRegisterUserCases, invalidRegisterUserStateTokenCases } from "src/testdata/validationPoints/registration.validation.points"

describe('🔐 Registration API Tests', () => {

    invalidRegisterUserCases.forEach((testCase)=>{

        test(`[no-test-login] Invalid Registration - ${testCase.description} `,async ()=>{

            TestContext.activeUser='current'
            
            const {stateToken} = await TestContext.flows.registrationFlow.loginUserFlow()

            const registerUserPayload = RegistrationFactory.registerPayload(testCase.overrides)
            const {response} = await TestContext.services.registrationService.registerUser({
                ...registerUserPayload,
                stateToken
            })

            await ResponseValidator.validateStatus(response,testCase.expectedStatus)
            await ResponseValidator.validateErrorMessage(response,testCase.expectedMessage)
            
        })
    })

    invalidRegisterUserStateTokenCases.forEach((testCase)=>{
        test(`[no-test-login] Invalid Registration - ${testCase.description} `,async ()=>{
            
            TestContext.activeUser='current'
            
            const registerUserPayload = RegistrationFactory.registerPayload(testCase.overrides)
            const {response} = await TestContext.services.registrationService.registerUser({
                ...registerUserPayload
            })
            await ResponseValidator.validateStatus(response,testCase.expectedStatus)
            await ResponseValidator.validateErrorMessage(response,testCase.expectedMessage)
        })
    })

    test('[no-test-login] Valid Registration',async ()=>{

        TestContext.activeUser='current'
        
        const response= await TestContext.flows.registrationFlow.registerUserFlow()
        await ResponseValidator.validateSuccess(response,{
        httpStatus: 201,
        statusCode: 200,
        message: "Successfully registered"
        })
    })

})
