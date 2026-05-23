import { acceptFriendRequestPayloadTestCases } from "src/testdata/validationPoints/user.validation.points"
import ResponseValidator from "src/api/response.validator"
import { TestContext } from "src/context/test.context"

describe('Validate Accept Friend Request API',()=>{

    test('Verify Accept Friend Request - Valid Pending Received Request FriendId Payload',async()=>{
        const {response} = await TestContext.flows.userFlow.validAcceptFriendRequest('friendId')
        await ResponseValidator.validateSuccess(response,{
            httpStatus:201,
            statusCode:200,
            message:'Friend request accepted successfully'
        })
    })

    test('Verify Accept Friend Request - Valid Pending Received Request FriendRequestId Payload',async()=>{
        const {response} = await TestContext.flows.userFlow.validAcceptFriendRequest('friendRequestId')
        await ResponseValidator.validateSuccess(response,{
            httpStatus:201,
            statusCode:200,
            message:'Friend request accepted successfully'
        })
    })

    test('Verify Accept Friend Request - Pending Send Request FriendId Payload',async()=>{
        const {friendIdPayload} = await TestContext.flows.userFlow.acceptFriendRequestWithDifferentPayload('pending send request')
        const {response} = await TestContext.services.userService.acceptFriendRequest(friendIdPayload)
        await ResponseValidator.validateStatus(response,400)
        await ResponseValidator.validateErrorMessage(response,'No valid pending friend request found')
    })

    test('Verify Accept Friend Request - Pending Send Request FriendRequestId Payload',async()=>{
        const {friendRequestIdPayload} = await TestContext.flows.userFlow.acceptFriendRequestWithDifferentPayload('pending send request')
        const {response} = await TestContext.services.userService.acceptFriendRequest(friendRequestIdPayload)
        await ResponseValidator.validateStatus(response,400)
        await ResponseValidator.validateErrorMessage(response,'No valid pending friend request found')
    })

    test('Verify Accept Friend Request - Cancel Friend Request FriendId Payload',async()=>{
        const {friendIdPayload} = await TestContext.flows.userFlow.acceptFriendRequestWithDifferentPayload('cancelled friend request')
        const {response} = await TestContext.services.userService.acceptFriendRequest(friendIdPayload)
        await ResponseValidator.validateStatus(response,400)
        await ResponseValidator.validateErrorMessage(response,'No valid pending friend request found')
    })

    test('Verify Accept Friend Request - Cancel Friend Request FriendRequestId Payload',async()=>{
        const {friendRequestIdPayload} = await TestContext.flows.userFlow.acceptFriendRequestWithDifferentPayload('cancelled friend request')
        const {response} = await TestContext.services.userService.acceptFriendRequest(friendRequestIdPayload)
        await ResponseValidator.validateStatus(response,400)
        await ResponseValidator.validateErrorMessage(response,'No valid pending friend request found')
    })

    test('Verify Accept Friend Request - Reject Friend Request FriendId Payload',async()=>{
        const {friendIdPayload} = await TestContext.flows.userFlow.acceptFriendRequestWithDifferentPayload('rejected friend request')
        const {response} = await TestContext.services.userService.acceptFriendRequest(friendIdPayload)
        await ResponseValidator.validateStatus(response,400)
        await ResponseValidator.validateErrorMessage(response,'No valid pending friend request found')
    })

    test('Verify Accept Friend Request - Reject Friend Request FriendRequestId Payload',async()=>{
        const {friendRequestIdPayload} = await TestContext.flows.userFlow.acceptFriendRequestWithDifferentPayload('rejected friend request')
        const {response} = await TestContext.services.userService.acceptFriendRequest(friendRequestIdPayload)
        await ResponseValidator.validateStatus(response,400)
        await ResponseValidator.validateErrorMessage(response,'No valid pending friend request found')
    })

    test('Verify Accept Friend Request - Accepted Friend Request FriendId Payload',async()=>{
        const {friendIdPayload} = await TestContext.flows.userFlow.acceptFriendRequestWithDifferentPayload('accepted friend request')
        const {response} = await TestContext.services.userService.acceptFriendRequest(friendIdPayload)
        await ResponseValidator.validateStatus(response,400)
        await ResponseValidator.validateErrorMessage(response,'No valid pending friend request found')
    })

    test('Verify Accept Friend Request - Accepted Friend Request FriendRequestId Payload',async()=>{
        const {friendRequestIdPayload} = await TestContext.flows.userFlow.acceptFriendRequestWithDifferentPayload('accepted friend request')
        const {response} = await TestContext.services.userService.acceptFriendRequest(friendRequestIdPayload)
        await ResponseValidator.validateStatus(response,400)
        await ResponseValidator.validateErrorMessage(response,'No valid pending friend request found')
    })

    test('Verify Accept Friend Request - LoggedIn User FriendId Payload',async()=>{
        const {friendIdPayload} = await TestContext.flows.userFlow.acceptFriendRequestWithDifferentPayload('logged in user')
        const {response} = await TestContext.services.userService.acceptFriendRequest(friendIdPayload)
        await ResponseValidator.validateStatus(response,400)
        await ResponseValidator.validateErrorMessage(response,'No valid pending friend request found')
    })

    acceptFriendRequestPayloadTestCases.forEach((testCases)=>{
        test(`Verify Accept Friend Request - When ${testCases.description}`,async()=>{
            const {response} = await TestContext.services.userService.acceptFriendRequest(testCases.overrides)
            await ResponseValidator.validateStatus(response,testCases.expectedStatus)
            await ResponseValidator.validateErrorMessage(response,testCases.expectedMessage)
        })
    })
})