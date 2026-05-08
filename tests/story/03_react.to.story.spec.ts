import ResponseValidator from "../../src/api/response.validator"
import { TestContext } from "../../src/context/test.context"

describe('Validate POST /stories/react',()=>{

    describe('React To Present Active Story',()=>{

        test('Validate reaction to my present story',async()=>{
            let response:any
            ({response} = await TestContext.flows.storyFlow.reactToMyPresentStory('like'))
            await ResponseValidator.validateStatus(response,201)
            await ResponseValidator.validateErrorMessage(response,'Reacted Successfully');

            ({response} = await TestContext.flows.storyFlow.reactToMyPresentStory('unlike'))
            await ResponseValidator.validateStatus(response,201)
            await ResponseValidator.validateErrorMessage(response,'Reacted Successfully');

            ({response} = await TestContext.flows.storyFlow.reactToMyPresentStory('like'))
            await ResponseValidator.validateStatus(response,201)
            await ResponseValidator.validateErrorMessage(response,'Reacted Successfully');
        })

        test('Validate reaction to my friends present story',async()=>{
            let response:any
            ({response} = await TestContext.flows.storyFlow.reactToMyFriendsPresentStory('like'))
            await ResponseValidator.validateStatus(response,201)
            await ResponseValidator.validateErrorMessage(response,'Reacted Successfully');

            ({response} = await TestContext.flows.storyFlow.reactToMyFriendsPresentStory('unlike'))
            await ResponseValidator.validateStatus(response,201)
            await ResponseValidator.validateErrorMessage(response,'Reacted Successfully');

            ({response} = await TestContext.flows.storyFlow.reactToMyFriendsPresentStory('like'))
            await ResponseValidator.validateStatus(response,201)
            await ResponseValidator.validateErrorMessage(response,'Reacted Successfully');
        })

        test('Validate reaction to my friends friend present story',async()=>{
            let response:any
            ({response} = await TestContext.flows.storyFlow.reactToMyFriendsOfFriendsPresentStory('like'))
            await ResponseValidator.validateStatus(response,201)
            await ResponseValidator.validateErrorMessage(response,'Reacted Successfully');

            ({response} = await TestContext.flows.storyFlow.reactToMyFriendsOfFriendsPresentStory('unlike'))
            await ResponseValidator.validateStatus(response,201)
            await ResponseValidator.validateErrorMessage(response,'Reacted Successfully');

            ({response} = await TestContext.flows.storyFlow.reactToMyFriendsOfFriendsPresentStory('like'))
            await ResponseValidator.validateStatus(response,201)
            await ResponseValidator.validateErrorMessage(response,'Reacted Successfully');
        })

        test('Validate reaction to my non friends present story',async()=>{
            let response:any
            ({response} = await TestContext.flows.storyFlow.reactToNonFriendsPresentStory('like'))
            await ResponseValidator.validateStatus(response,201)
            await ResponseValidator.validateErrorMessage(response,'Reacted Successfully');

            ({response} = await TestContext.flows.storyFlow.reactToNonFriendsPresentStory('unlike'))
            await ResponseValidator.validateStatus(response,201)
            await ResponseValidator.validateErrorMessage(response,'Reacted Successfully');

            ({response} = await TestContext.flows.storyFlow.reactToNonFriendsPresentStory('like'))
            await ResponseValidator.validateStatus(response,201)
            await ResponseValidator.validateErrorMessage(response,'Reacted Successfully');
        })
    })

    describe('React To Expired Story',()=>{

        test('Validate reaction to my expired story',async()=>{
            let response:any
            ({response} = await TestContext.flows.storyFlow.reactToMyExpiredStory('like'))
            await ResponseValidator.validateStatus(response,201)
            await ResponseValidator.validateErrorMessage(response,'Reacted Successfully');

            ({response} = await TestContext.flows.storyFlow.reactToMyExpiredStory('unlike'))
            await ResponseValidator.validateStatus(response,201)
            await ResponseValidator.validateErrorMessage(response,'Reacted Successfully');

            ({response} = await TestContext.flows.storyFlow.reactToMyExpiredStory('like'))
            await ResponseValidator.validateStatus(response,201)
            await ResponseValidator.validateErrorMessage(response,'Reacted Successfully');
        })

        test('Validate reaction to my friends expired story',async()=>{
            let response:any
            ({response} = await TestContext.flows.storyFlow.reactToMyFriendsExpiredStory('like'))
            await ResponseValidator.validateStatus(response,201)
            await ResponseValidator.validateErrorMessage(response,'Reacted Successfully');

            ({response} = await TestContext.flows.storyFlow.reactToMyFriendsExpiredStory('unlike'))
            await ResponseValidator.validateStatus(response,201)
            await ResponseValidator.validateErrorMessage(response,'Reacted Successfully');

            ({response} = await TestContext.flows.storyFlow.reactToMyFriendsExpiredStory('like'))
            await ResponseValidator.validateStatus(response,201)
            await ResponseValidator.validateErrorMessage(response,'Reacted Successfully');
        })

        test('Validate reaction to my friends friend expired story',async()=>{
            let response:any
            ({response} = await TestContext.flows.storyFlow.reactToMyFriendsOfFriendsExpiredStory('like'))
            await ResponseValidator.validateStatus(response,201)
            await ResponseValidator.validateErrorMessage(response,'Reacted Successfully');

            ({response} = await TestContext.flows.storyFlow.reactToMyFriendsOfFriendsExpiredStory('unlike'))
            await ResponseValidator.validateStatus(response,201)
            await ResponseValidator.validateErrorMessage(response,'Reacted Successfully');

            ({response} = await TestContext.flows.storyFlow.reactToMyFriendsOfFriendsExpiredStory('like'))
            await ResponseValidator.validateStatus(response,201)
            await ResponseValidator.validateErrorMessage(response,'Reacted Successfully');
        })

        test('Validate reaction to my non friends expired story',async()=>{
            let response:any
            ({response} = await TestContext.flows.storyFlow.reactToNonFriendsExpiredStory('like'))
            await ResponseValidator.validateStatus(response,201)
            await ResponseValidator.validateErrorMessage(response,'Reacted Successfully');

            ({response} = await TestContext.flows.storyFlow.reactToNonFriendsExpiredStory('unlike'))
            await ResponseValidator.validateStatus(response,201)
            await ResponseValidator.validateErrorMessage(response,'Reacted Successfully');

            ({response} = await TestContext.flows.storyFlow.reactToNonFriendsExpiredStory('like'))
            await ResponseValidator.validateStatus(response,201)
            await ResponseValidator.validateErrorMessage(response,'Reacted Successfully');
        })
    })

    describe('React To Deleted Story',()=>{

        test('Validate reaction to my deleted story',async()=>{
            let response:any
            ({response} = await TestContext.flows.storyFlow.reactToMyDeletedStory('like'))
            await ResponseValidator.validateStatus(response,201)
            await ResponseValidator.validateErrorMessage(response,'Reacted Successfully');

            ({response} = await TestContext.flows.storyFlow.reactToMyDeletedStory('unlike'))
            await ResponseValidator.validateStatus(response,201)
            await ResponseValidator.validateErrorMessage(response,'Reacted Successfully');

            ({response} = await TestContext.flows.storyFlow.reactToMyDeletedStory('like'))
            await ResponseValidator.validateStatus(response,201)
            await ResponseValidator.validateErrorMessage(response,'Reacted Successfully');
        })

        test('Validate reaction to my friends deleted story',async()=>{
            let response:any
            ({response} = await TestContext.flows.storyFlow.reactToMyFriendsPresentDeletedStory('like'))
            await ResponseValidator.validateStatus(response,201)
            await ResponseValidator.validateErrorMessage(response,'Reacted Successfully');

            ({response} = await TestContext.flows.storyFlow.reactToMyFriendsPresentDeletedStory('unlike'))
            await ResponseValidator.validateStatus(response,201)
            await ResponseValidator.validateErrorMessage(response,'Reacted Successfully');

            ({response} = await TestContext.flows.storyFlow.reactToMyFriendsPresentDeletedStory('like'))
            await ResponseValidator.validateStatus(response,201)
            await ResponseValidator.validateErrorMessage(response,'Reacted Successfully');
        })

        // test('Validate reaction to my friends friend deleted story',async()=>{

        // })

        test('Validate reaction to my non friends deleted story',async()=>{
            let response:any
            ({response} = await TestContext.flows.storyFlow.reactToNonFriendsPresentDeletedStory('like'))
            await ResponseValidator.validateStatus(response,201)
            await ResponseValidator.validateErrorMessage(response,'Reacted Successfully');

            ({response} = await TestContext.flows.storyFlow.reactToNonFriendsPresentDeletedStory('unlike'))
            await ResponseValidator.validateStatus(response,201)
            await ResponseValidator.validateErrorMessage(response,'Reacted Successfully');

            ({response} = await TestContext.flows.storyFlow.reactToNonFriendsPresentDeletedStory('like'))
            await ResponseValidator.validateStatus(response,201)
            await ResponseValidator.validateErrorMessage(response,'Reacted Successfully');
        })
    })
})