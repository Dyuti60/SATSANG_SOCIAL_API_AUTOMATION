import ResponseValidator from "src/api/response.validator"
import { TestContext } from "src/context/test.context"
import { cancelFriendRequestPayloadTestCases } from "src/testdata/validationPoints/user.validation.points"

describe('Validate Cancel Friend Request API',()=>{

    test('Verify Cancel Friend Request - Valid FriendId Payload',async()=>{
        const {response} = await TestContext.flows.userFlow.validCancelFriendRequest('friendId')
        await ResponseValidator.validateSuccess(response,{
            httpStatus:201,
            statusCode:200,
            message:'Friend request canceled successfully'
        })
    })

    test('Verify Cancel Friend Request - Valid FriendRequestId Payload',async()=>{
        const {response} = await TestContext.flows.userFlow.validCancelFriendRequest('friendRequestId')
        await ResponseValidator.validateSuccess(response,{
            httpStatus:201,
            statusCode:200,
            message:'Friend request canceled successfully'
        })
    })

    test('Verify Cancel Friend Request - Pending Receive FriendId Payload',async()=>{
        const {friendIdPayload} = await TestContext.flows.userFlow.cancelFriendRequestWithDifferentPayload('pending received request')
        const {response} = await TestContext.services.userService.cancelFriendRequest(friendIdPayload)
        await ResponseValidator.validateStatus(response,400)
        await ResponseValidator.validateErrorMessage(response,'No valid pending friend request found')
    })

    test('Verify Cancel Friend Request - Pending Receive FriendRequestId Payload',async()=>{
        const {friendRequestIdPayload} = await TestContext.flows.userFlow.cancelFriendRequestWithDifferentPayload('pending received request')
        const {response} = await TestContext.services.userService.cancelFriendRequest(friendRequestIdPayload)
        await ResponseValidator.validateStatus(response,400)
        await ResponseValidator.validateErrorMessage(response,'No valid pending friend request found')
    })

    test('Verify Cancel Friend Request - Cancelled FriendId Payload',async()=>{
        const {friendIdPayload} = await TestContext.flows.userFlow.cancelFriendRequestWithDifferentPayload('cancelled friend request')
        console.log(`friendIdPayload ${friendIdPayload.friendId}`)
        const {response} = await TestContext.services.userService.cancelFriendRequest(friendIdPayload)
        await ResponseValidator.validateStatus(response,400)
        await ResponseValidator.validateErrorMessage(response,'No valid pending friend request found')
    })

    test('Verify Cancel Friend Request - Cancelled FriendRequestId Payload',async()=>{
        const {friendRequestIdPayload} = await TestContext.flows.userFlow.cancelFriendRequestWithDifferentPayload('cancelled friend request')
        const {response} = await TestContext.services.userService.cancelFriendRequest(friendRequestIdPayload)
        await ResponseValidator.validateStatus(response,400)
        await ResponseValidator.validateErrorMessage(response,'No valid pending friend request found')
    })

    test('Verify Cancel Friend Request - Rejected FriendId Payload',async()=>{
        const {friendIdPayload} = await TestContext.flows.userFlow.cancelFriendRequestWithDifferentPayload('rejected friend request')
        const {response} = await TestContext.services.userService.cancelFriendRequest(friendIdPayload)
        await ResponseValidator.validateStatus(response,400)
        await ResponseValidator.validateErrorMessage(response,'No valid pending friend request found')
    })

    test('Verify Cancel Friend Request - Rejected FriendRequestId Payload',async()=>{
        const {friendRequestIdPayload} = await TestContext.flows.userFlow.cancelFriendRequestWithDifferentPayload('rejected friend request')
        const {response} = await TestContext.services.userService.cancelFriendRequest(friendRequestIdPayload)
        await ResponseValidator.validateStatus(response,400)
        await ResponseValidator.validateErrorMessage(response,'No valid pending friend request found')
    })

    test('Verify Cancel Friend Request - Accepted FriendId Payload',async()=>{
        const {friendIdPayload} = await TestContext.flows.userFlow.cancelFriendRequestWithDifferentPayload('accepted friend request')
        const {response} = await TestContext.services.userService.cancelFriendRequest(friendIdPayload)
        await ResponseValidator.validateStatus(response,400)
        await ResponseValidator.validateErrorMessage(response,'No valid pending friend request found')
    })

    test('Verify Cancel Friend Request - Accepted FriendRequestId Payload',async()=>{
        const {friendRequestIdPayload} = await TestContext.flows.userFlow.cancelFriendRequestWithDifferentPayload('accepted friend request')
        const {response} = await TestContext.services.userService.cancelFriendRequest(friendRequestIdPayload)
        await ResponseValidator.validateStatus(response,400)
        await ResponseValidator.validateErrorMessage(response,'No valid pending friend request found')
    })

    test('Verify Cancel Friend Request - LoggedIn User FriendId Payload',async()=>{
        const {friendIdPayload} = await TestContext.flows.userFlow.cancelFriendRequestWithDifferentPayload('logged in user')
        const {response} = await TestContext.services.userService.cancelFriendRequest(friendIdPayload)
        await ResponseValidator.validateStatus(response,400)
        await ResponseValidator.validateErrorMessage(response,'No valid pending friend request found')
    })

    cancelFriendRequestPayloadTestCases.forEach((testCases)=>{
        test(`Verify Cancel Friend Request - When ${testCases.description}`,async()=>{
            const {response} = await TestContext.services.userService.cancelFriendRequest(testCases.overrides)
            await ResponseValidator.validateStatus(response,testCases.expectedStatus)
            await ResponseValidator.validateErrorMessage(response,testCases.expectedMessage)
        })
    })
})