import ResponseValidator from "../../../src/api/response.validator"
import { TestContext } from "../../../src/context/test.context"
import { UserFactory } from "../../../src/testdata/factory/user.factory"
import { allFriendsTestCases } from "../../../src/testdata/validationPoints/user.validation.points"

describe('POST All Friends Of Logged In User API',()=>{

    test(`Validate Get All Friends - without any payload`,async()=>{
        const {response} = await TestContext.flows.userFlow.getValidAllFriends()
        await ResponseValidator.validateSuccess(response,{
        httpStatus: 201,
        statusCode: 200,
        message: "Successfully fetched the friend list"
        })
    })

    allFriendsTestCases.forEach((testCases)=>{
        test(`Validate for POST API- ${testCases.description}`,async()=>{
            const requestPayload = {
                ...UserFactory.getAllFriendsPayload,
                ...testCases.overrides
            }
            const {response} = await TestContext.services.userService.getAllFriends(requestPayload)
            await ResponseValidator.validateStatus(response, testCases.expectedStatus)
            await ResponseValidator.validateErrorMessage(response,testCases.expectedMessage)
        })
    })
})