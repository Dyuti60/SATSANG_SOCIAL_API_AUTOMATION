import ResponseValidator from "src/api/response.validator"
import { TestContext } from "src/context/test.context"
import { deleteFriendPayloadTestCases } from "src/testdata/validationPoints/user.validation.points"

describe('Validate Delete Friend API',()=>{
    test('Verify Delete Friend - Valid Accept Friend Payload',async ()=>{
        const {response} = await TestContext.flows.userFlow.validDeleteFriend()
        await ResponseValidator.validateSuccess(response,{
            httpStatus:200,
            statusCode:200,
            message:'Successfully deleted the friend'
        })
    })

    test('Verify Delete Friend - Cancel Friend Status',async()=>{
        const {friendIdPayload} = await TestContext.flows.userFlow.deleteFriendWithDifferentPayload('Cancel Friend')
        const {response} = await TestContext.services.userService.deleteFriend(friendIdPayload)
        await ResponseValidator.validateStatus(response,400)
        await ResponseValidator.validateErrorMessage(response,'Successfully deleted the friend')
    })

    test('Verify Delete Friend - Pending Friend Status',async()=>{
        const {friendIdPayload} = await TestContext.flows.userFlow.deleteFriendWithDifferentPayload('Pending Friend')
        const {response} = await TestContext.services.userService.deleteFriend(friendIdPayload)
        await ResponseValidator.validateStatus(response,400)
        await ResponseValidator.validateErrorMessage(response,'Successfully deleted the friend')
    })

    test('Verify Delete Friend - Rejected Friend Status',async()=>{
        const {friendIdPayload} = await TestContext.flows.userFlow.deleteFriendWithDifferentPayload('Rejected Friend')
        const {response} = await TestContext.services.userService.deleteFriend(friendIdPayload)
        await ResponseValidator.validateStatus(response,400)
        await ResponseValidator.validateErrorMessage(response,'Successfully deleted the friend')
    })

    test('Verify Delete Friend - Logged In User',async()=>{
        const {friendIdPayload} = await TestContext.flows.userFlow.deleteFriendWithDifferentPayload('logged in user')
        const {response} = await TestContext.services.userService.deleteFriend(friendIdPayload)
        await ResponseValidator.validateStatus(response,400)
        await ResponseValidator.validateErrorMessage(response,'Sender and receiver cannot be the same user')
    })

    deleteFriendPayloadTestCases.forEach((testCases)=>{
        test(`Verify Delete Friend Request - When ${testCases.description}`,async()=>{
            const {response} = await TestContext.services.userService.deleteFriend(testCases.overrides)
            await ResponseValidator.validateStatus(response,testCases.expectedStatus)
            await ResponseValidator.validateErrorMessage(response,testCases.expectedMessage)
        })
    })
})