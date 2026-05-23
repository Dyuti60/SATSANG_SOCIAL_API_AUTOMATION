import ResponseValidator from "src/api/response.validator"
import { TestContext } from "src/context/test.context"
import { getProfilePayloadTestCases } from "src/testdata/validationPoints/user.validation.points"

describe('Validate Profile API',()=>{

    test('Verify Profile API - Logged In User',async()=>{
        const {response} = await TestContext.flows.userFlow.getMyValidProfile()
        await ResponseValidator.validateSuccess(response,{
            httpStatus:200,
            statusCode:202,
            message:'Users found successfully'
        })
    })

    test('Verify Profile API - for Accepted Friend',async()=>{
        const {userIdPayload} = await TestContext.flows.userFlow.getProfileWithDifferentPayload('Accepted Request Friend')
        const {response} = await TestContext.services.userService.getProfile(userIdPayload)
        await ResponseValidator.validateStatus(response,200)
        await ResponseValidator.validateErrorMessage(response,'Users found successfully')
    })

    test('Verify Profile API - for sent pending Friend',async()=>{
        const {userIdPayload} = await TestContext.flows.userFlow.getProfileWithDifferentPayload('Sent Request Friend')
        const {response} = await TestContext.services.userService.getProfile(userIdPayload)
        await ResponseValidator.validateStatus(response,200)
        await ResponseValidator.validateErrorMessage(response,'Users found successfully')
    })

    test('Verify Profile API - for received pending Friend',async()=>{
        const {userIdPayload} = await TestContext.flows.userFlow.getProfileWithDifferentPayload('Received Request Friend')
        const {response} = await TestContext.services.userService.getProfile(userIdPayload)
        await ResponseValidator.validateStatus(response,200)
        await ResponseValidator.validateErrorMessage(response,'Users found successfully')
    })

    test('Verify Profile API - for cancelled pending Friend',async()=>{
        const {userIdPayload} = await TestContext.flows.userFlow.getProfileWithDifferentPayload('Cancelled Request Friend')
        const {response} = await TestContext.services.userService.getProfile(userIdPayload)
        await ResponseValidator.validateStatus(response,200)
        await ResponseValidator.validateErrorMessage(response,'Users found successfully')
    })

    test('Verify Profile API - for non social friend',async()=>{
        const {userIdPayload} = await TestContext.flows.userFlow.getProfileWithDifferentPayload('Non Social Friend')
        const {response} = await TestContext.services.userService.getProfile(userIdPayload)
        await ResponseValidator.validateStatus(response,200)
        await ResponseValidator.validateErrorMessage(response,'Users found successfully')
    })

    getProfilePayloadTestCases.forEach((testCases)=>{
        test(`Verify Profile API - ${testCases.description}`,async()=>{
            const {response} = await TestContext.services.userService.getProfile(testCases.overrides)
            await ResponseValidator.validateStatus(response,testCases.expectedStatus)
            await ResponseValidator.validateErrorMessage(response,testCases.expectedMessage)
        })
    })



})