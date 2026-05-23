import { ENV } from "src/helper/env/env.config"
import ResponseValidator from "src/api/response.validator"
import { TestContext } from "src/context/test.context"
import { sendFriendRequestPayloadTestCases } from "src/testdata/validationPoints/user.validation.points"

describe('Validate Send Friend Request API',()=>{
    
    test('Verify Send Friend Request - valid payload',async()=>{
        const {response} = await TestContext.flows.userFlow.validSendFriendRequest()
        await ResponseValidator.validateSuccess(response,{
            httpStatus:201,
            statusCode:200,
            message: 'Friend request sent successfully'
        })
    })

    test('Verify Send Friend Request - pending friend request payload',async()=>{
        const payload = await TestContext.flows.userFlow.sendFriendRequestWithDifferentPayload('pending friend request')
        const {response} = await TestContext.services.userService.sendFriendRequest(payload)
        await ResponseValidator.validateStatus(response,400)
        await ResponseValidator.validateErrorMessage(response, 'A friend request already exists between these users')
    })

    test('Verify Send Friend Request - cancel friend request payload',async()=>{
        const payload = await TestContext.flows.userFlow.sendFriendRequestWithDifferentPayload('cancelled friend request')
        const {response} = await TestContext.services.userService.sendFriendRequest(payload)
        await ResponseValidator.validateSuccess(response,{
            httpStatus:201,
            statusCode:200,
            message: 'Friend request sent successfully'
        })
    })

    test('Verify Send Friend Request - reject friend request payload',async()=>{
        const payload = await TestContext.flows.userFlow.sendFriendRequestWithDifferentPayload('rejected friend request')
        const {response} = await TestContext.services.userService.sendFriendRequest(payload)
        await ResponseValidator.validateStatus(response,201)
        await ResponseValidator.validateErrorMessage(response, 'Friend request sent successfully')
    })

    test('Verify Send Friend Request - already friend payload',async()=>{
        const payload = await TestContext.flows.userFlow.sendFriendRequestWithDifferentPayload('already friends')
        const {response} = await TestContext.services.userService.sendFriendRequest(payload)
        await ResponseValidator.validateStatus(response,400)
        await ResponseValidator.validateErrorMessage(response, 'Friend request cannot be sent because the users are already friends')
    })

    test('Verify Send Friend Request - logged in user itself',async()=>{
        const payload = await TestContext.flows.userFlow.sendFriendRequestWithDifferentPayload('logged in user')
        const {response} = await TestContext.services.userService.sendFriendRequest(payload)
        await ResponseValidator.validateStatus(response,400)
        await ResponseValidator.validateErrorMessage(response, 'Sender and receiver cannot be the same user')
    })

    sendFriendRequestPayloadTestCases.forEach((testCases)=>{
        test(`Verify Send Friend Request - ${testCases.description}`,async ()=>{
            const payload = await TestContext.flows.userFlow.sendFriendRequestWithDifferentPayload('valid friendId')
            const requestPayload = {
                ...payload,
                ...testCases.overrides
            }
            const {response} = await TestContext.services.userService.sendFriendRequest(requestPayload)
            await ResponseValidator.validateStatus(response,testCases.expectedStatus)
            await ResponseValidator.validateErrorMessage(response,testCases.expectedMessage)
        })
    })


})