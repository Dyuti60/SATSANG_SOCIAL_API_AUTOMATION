import { rejectFriendRequestPayloadTestCases } from "src/testdata/validationPoints/user.validation.points"
import ResponseValidator from "src/api/response.validator"
import { TestContext } from "src/context/test.context"

describe('Validate Reject Friend Request API',()=>{

    test('Verify Reject Friend Request - Valid Pending Received Request FriendId Payload',async()=>{
        const {response} = await TestContext.flows.userFlow.validRejectFriendRequest('friendId')
        await ResponseValidator.validateSuccess(response,{
            httpStatus:201,
            statusCode:200,
            message:'Friend request rejected successfully'
        })
    })

    test('Verify Reject Friend Request - Valid Pending Received Request FriendRequestId Payload',async()=>{
        const {response} = await TestContext.flows.userFlow.validRejectFriendRequest('friendRequestId')
        await ResponseValidator.validateSuccess(response,{
            httpStatus:201,
            statusCode:200,
            message:'Friend request rejected successfully'
        })
    })

    test('Verify Reject Friend Request - Pending Send Request FriendId Payload',async()=>{
        const {friendIdPayload} = await TestContext.flows.userFlow.rejectFriendRequestWithDifferentPayload('pending send request')
        const {response} = await TestContext.services.userService.rejectFriendRequest(friendIdPayload)
        await ResponseValidator.validateStatus(response,400)
        await ResponseValidator.validateErrorMessage(response,'No valid pending friend request found')
    })

    test('Verify Reject Friend Request - Pending Send Request FriendRequestId Payload',async()=>{
        const {friendRequestIdPayload} = await TestContext.flows.userFlow.rejectFriendRequestWithDifferentPayload('pending send request')
        const {response} = await TestContext.services.userService.rejectFriendRequest(friendRequestIdPayload)
        await ResponseValidator.validateStatus(response,400)
        await ResponseValidator.validateErrorMessage(response,'No valid pending friend request found')
    })

    test('Verify Reject Friend Request - Cancel Friend Request FriendId Payload',async()=>{
        const {friendIdPayload} = await TestContext.flows.userFlow.rejectFriendRequestWithDifferentPayload('cancelled friend request')
        const {response} = await TestContext.services.userService.rejectFriendRequest(friendIdPayload)
        await ResponseValidator.validateStatus(response,400)
        await ResponseValidator.validateErrorMessage(response,'No valid pending friend request found')
    })

    test('Verify Reject Friend Request - Cancel Friend Request FriendRequestId Payload',async()=>{
        const {friendRequestIdPayload} = await TestContext.flows.userFlow.rejectFriendRequestWithDifferentPayload('cancelled friend request')
        const {response} = await TestContext.services.userService.rejectFriendRequest(friendRequestIdPayload)
        await ResponseValidator.validateStatus(response,400)
        await ResponseValidator.validateErrorMessage(response,'No valid pending friend request found')
    })

    test('Verify Reject Friend Request - Reject Friend Request FriendId Payload',async()=>{
        const {friendIdPayload} = await TestContext.flows.userFlow.rejectFriendRequestWithDifferentPayload('rejected friend request')
        const {response} = await TestContext.services.userService.rejectFriendRequest(friendIdPayload)
        await ResponseValidator.validateStatus(response,400)
        await ResponseValidator.validateErrorMessage(response,'No valid pending friend request found')
    })

    test('Verify Reject Friend Request - Reject Friend Request FriendRequestId Payload',async()=>{
        const {friendRequestIdPayload} = await TestContext.flows.userFlow.rejectFriendRequestWithDifferentPayload('rejected friend request')
        const {response} = await TestContext.services.userService.rejectFriendRequest(friendRequestIdPayload)
        await ResponseValidator.validateStatus(response,400)
        await ResponseValidator.validateErrorMessage(response,'No valid pending friend request found')
    })

    test('Verify Reject Friend Request - Accepted Friend Request FriendId Payload',async()=>{
        const {friendIdPayload} = await TestContext.flows.userFlow.rejectFriendRequestWithDifferentPayload('accepted friend request')
        const {response} = await TestContext.services.userService.rejectFriendRequest(friendIdPayload)
        await ResponseValidator.validateStatus(response,400)
        await ResponseValidator.validateErrorMessage(response,'No valid pending friend request found')
    })

    test('Verify Reject Friend Request - Accepted Friend Request FriendRequestId Payload',async()=>{
        const {friendRequestIdPayload} = await TestContext.flows.userFlow.rejectFriendRequestWithDifferentPayload('accepted friend request')
        const {response} = await TestContext.services.userService.rejectFriendRequest(friendRequestIdPayload)
        await ResponseValidator.validateStatus(response,400)
        await ResponseValidator.validateErrorMessage(response,'No valid pending friend request found')
    })

    test('Verify Reject Friend Request - LoggedIn User FriendId Payload',async()=>{
        const {friendIdPayload} = await TestContext.flows.userFlow.rejectFriendRequestWithDifferentPayload('logged in user')
        const {response} = await TestContext.services.userService.rejectFriendRequest(friendIdPayload)
        await ResponseValidator.validateStatus(response,400)
        await ResponseValidator.validateErrorMessage(response,'No valid pending friend request found')
    })

    rejectFriendRequestPayloadTestCases.forEach((testCases)=>{
        test(`Verify Reject Friend Request - When ${testCases.description}`,async()=>{
            const {response} = await TestContext.services.userService.rejectFriendRequest(testCases.overrides)
            await ResponseValidator.validateStatus(response,testCases.expectedStatus)
            await ResponseValidator.validateErrorMessage(response,testCases.expectedMessage)
        })
    })
})