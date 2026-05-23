import { invalidRegionTestCases } from "src/testdata/validationPoints/user.validation.points"
import ResponseValidator from "src/api/response.validator"
import { TestContext } from "src/context/test.context"
import { UserFactory } from "src/testdata/factory/user.factory"
import { invalidRegisterUserCases } from "src/testdata/validationPoints/registration.validation.points"

describe('Get Region API Test',()=>{

    test('[no-login] Validate Get Region API with valid region',async ()=>{
        const {response, expectedRegion, expectedRegionId} = await TestContext.flows.userFlow.getValidRegionFlow()
        await ResponseValidator.validateSuccess(response,{
        httpStatus: 200,
        statusCode: 201,
        message: "User regions found"
        })
    })

    test('Validate Get Region API with valid region',async ()=>{
        const regionPayload = {
            ...UserFactory.regionPayload(),
            region:'jorhat',
        }

        const {response} = await TestContext.services.userService.getRegion(regionPayload)
        await ResponseValidator.validateSuccess(response,{
        httpStatus: 200,
        statusCode: 201,
        message: "User regions found"
        })
    })

    invalidRegionTestCases.forEach((testCases)=>{
        test(`Validate Get Region API when - ${testCases.description}`,async()=>{
            const regionPayload = {
                ...UserFactory.regionPayload(),
                ...testCases.overrides
            }

            const {response} = await TestContext.services.userService.getRegion(regionPayload)
            await ResponseValidator.validateStatus(response, testCases.expectedStatus)
            await ResponseValidator.validateErrorMessage(response,testCases.expectedMessage)
        })
    })



})