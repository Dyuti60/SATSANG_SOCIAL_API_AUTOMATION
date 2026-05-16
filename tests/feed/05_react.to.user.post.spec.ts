import ResponseValidator from "api/response.validator"
import { TestContext } from "src/context/test.context"

describe('Validate POST /feed/post/react Endpoint',()=>{


    describe('React To Public Visbility Post',()=>{

        test('Validate react to my public visibility post',async()=>{
            const {response} = await TestContext.flows.feedFlow.reactToMyPost('public')
            await ResponseValidator.validateStatus(response,201)
            await ResponseValidator.validateErrorMessage(response,'Reacted Successfully')
        })
        test('Validate react to my friends public visibility post',async()=>{
            const {response} = await TestContext.flows.feedFlow.reactToMyFriendsPost('public')
            await ResponseValidator.validateStatus(response,201)
            await ResponseValidator.validateErrorMessage(response,'Reacted Successfully')
        })
        test('Validate react to my friends friend public visibility post',async()=>{
            const {response} = await TestContext.flows.feedFlow.reactToMyFriendsOfFriendsPost('public')
            await ResponseValidator.validateStatus(response,201)
            await ResponseValidator.validateErrorMessage(response,'Reacted Successfully')
        })
        test('Validate react to my non friend public visibility post',async()=>{
            const {response} = await TestContext.flows.feedFlow.reactToNonFriendsPost('public')
            await ResponseValidator.validateStatus(response,201)
            await ResponseValidator.validateErrorMessage(response,'Reacted Successfully')
        })

    })

    describe('React To Hidden Visibility Post',()=>{

        test('Validate react to my hidden visibility post',async()=>{
            const {response} = await TestContext.flows.feedFlow.reactToMyPost('hidden')
            await ResponseValidator.validateStatus(response,201)
            await ResponseValidator.validateErrorMessage(response,'Reacted Successfully')
        })
        test('Validate react to my friends hidden visibility post',async()=>{
            const {response} = await TestContext.flows.feedFlow.reactToMyFriendsPost('hidden')
            await ResponseValidator.validateStatus(response,201)
            await ResponseValidator.validateErrorMessage(response,'Reacted Successfully')
        })
        test('Validate react to my friends friend hidden visibility post',async()=>{
            const {response} = await TestContext.flows.feedFlow.reactToMyFriendsOfFriendsPost('hidden')
            await ResponseValidator.validateStatus(response,201)
            await ResponseValidator.validateErrorMessage(response,'Reacted Successfully')
        })
        test('Validate react to my non friend hidden visibility post',async()=>{
            const {response} = await TestContext.flows.feedFlow.reactToNonFriendsPost('hidden')
            await ResponseValidator.validateStatus(response,201)
            await ResponseValidator.validateErrorMessage(response,'Reacted Successfully')
        })
    })

    describe('React To Friends Visibility Post',()=>{

        test('Validate react to my post with friends visibility',async()=>{
            const {response} = await TestContext.flows.feedFlow.reactToMyPost('friends visibility')
            await ResponseValidator.validateStatus(response,201)
            await ResponseValidator.validateErrorMessage(response,'Reacted Successfully')
        })
        test('Validate react to my friends post with friend visibility',async()=>{
            const {response} = await TestContext.flows.feedFlow.reactToMyFriendsPost('friends visibility')
            await ResponseValidator.validateStatus(response,201)
            await ResponseValidator.validateErrorMessage(response,'Reacted Successfully')
        })
        test('Validate react to my friends friend post with hidden visibility',async()=>{
            const {response} = await TestContext.flows.feedFlow.reactToMyFriendsOfFriendsPost('friends visibility')
            await ResponseValidator.validateStatus(response,201)
            await ResponseValidator.validateErrorMessage(response,'Reacted Successfully')
        })
        test('Validate react to my non friend post with hidden visibility',async()=>{
            const {response} = await TestContext.flows.feedFlow.reactToNonFriendsPost('friends visibility')
            await ResponseValidator.validateStatus(response,201)
            await ResponseValidator.validateErrorMessage(response,'Reacted Successfully')
        })
    })

    describe('React To Friends Of Friend Visibility Post',()=>{

        test('Validate react to my friends of friends visibility post',async()=>{
            const {response} = await TestContext.flows.feedFlow.reactToMyPost('fof visibility')
            await ResponseValidator.validateStatus(response,201)
            await ResponseValidator.validateErrorMessage(response,'Reacted Successfully')
        })
        test('Validate react to my friends with friends of friend visibility',async()=>{
            const {response} = await TestContext.flows.feedFlow.reactToMyFriendsPost('fof visibility')
            await ResponseValidator.validateStatus(response,201)
            await ResponseValidator.validateErrorMessage(response,'Reacted Successfully')
        })
        test('Validate react to my friends friend post with friends of friend visibility',async()=>{
            const {response} = await TestContext.flows.feedFlow.reactToMyFriendsOfFriendsPost('fof visibility')
            await ResponseValidator.validateStatus(response,201)
            await ResponseValidator.validateErrorMessage(response,'Reacted Successfully')
        })
        test('Validate react to my non friend post with friend of friends visibility',async()=>{
            const {response} = await TestContext.flows.feedFlow.reactToNonFriendsPost('fof visibility')
            await ResponseValidator.validateStatus(response,201)
            await ResponseValidator.validateErrorMessage(response,'Reacted Successfully')
        })
    })

    describe('React To Deleted Post',()=>{

        test('Validate react to my deleted post',async()=>{
            const {response} = await TestContext.flows.feedFlow.reactToMyPost('deleted')
            await ResponseValidator.validateStatus(response,201)
            await ResponseValidator.validateErrorMessage(response,'Reacted Successfully')
        })
        test('Validate react to my friends deleted post',async()=>{
            const {response} = await TestContext.flows.feedFlow.reactToMyFriendsPost('deleted')
            await ResponseValidator.validateStatus(response,201)
            await ResponseValidator.validateErrorMessage(response,'Reacted Successfully')
        })
        test('Validate react to my friends friend deleted post',async()=>{
            const {response} = await TestContext.flows.feedFlow.reactToMyFriendsOfFriendsPost('deleted')
            await ResponseValidator.validateStatus(response,201)
            await ResponseValidator.validateErrorMessage(response,'Reacted Successfully')
        })
        test('Validate react to my non friend deleted post',async()=>{
            const {response} = await TestContext.flows.feedFlow.reactToNonFriendsPost('deleted')
            await ResponseValidator.validateStatus(response,201)
            await ResponseValidator.validateErrorMessage(response,'Reacted Successfully')
        })
    })

})