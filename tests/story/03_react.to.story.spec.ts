import ResponseValidator from "src/api/response.validator"
import { TestContext } from "src/context/test.context"

describe('Validate POST /stories/react',()=>{

    describe('React To Present Active Story',()=>{

        test('Validate reaction to my present story - like',async()=>{
            let response:any
            ({response} = await TestContext.flows.storyFlow.reactToMyPresentStory(true))
            await ResponseValidator.validateStatus(response,201)
            await ResponseValidator.validateErrorMessage(response,'Reaction saved');
        })

        test('Validate reaction to my present story - unlike',async()=>{
            let response:any
            ({response} = await TestContext.flows.storyFlow.reactToMyPresentStory(false))
            await ResponseValidator.validateStatus(response,201)
            await ResponseValidator.validateErrorMessage(response,'Reaction saved');
        })

        test('Validate reaction to my friends present story - like',async()=>{
            let response:any
            ({response} = await TestContext.flows.storyFlow.reactToMyFriendsPresentStory(true))
            await ResponseValidator.validateStatus(response,201)
            await ResponseValidator.validateErrorMessage(response,'Reaction saved');
        })

        test('Validate reaction to my friends present story - unlike',async()=>{
            let response:any
            ({response} = await TestContext.flows.storyFlow.reactToMyFriendsPresentStory(false))
            await ResponseValidator.validateStatus(response,201)
            await ResponseValidator.validateErrorMessage(response,'Reaction saved');
        })

        test('Validate reaction to my friends friend present story - like',async()=>{
            let response:any
            ({response} = await TestContext.flows.storyFlow.reactToMyFriendsOfFriendsPresentStory(true))
            await ResponseValidator.validateStatus(response,201)
            await ResponseValidator.validateErrorMessage(response,'Reaction saved');
        })

        test('Validate reaction to my friends friend present story - unlike',async()=>{
            let response:any
            ({response} = await TestContext.flows.storyFlow.reactToMyFriendsOfFriendsPresentStory(false))
            await ResponseValidator.validateStatus(response,201)
            await ResponseValidator.validateErrorMessage(response,'Reaction saved');
        })

        test('Validate reaction to my non friends present story - like',async()=>{
            let response:any
            ({response} = await TestContext.flows.storyFlow.reactToNonFriendsPresentStory(true))
            await ResponseValidator.validateStatus(response,201)
            await ResponseValidator.validateErrorMessage(response,'Reaction saved');
        })

        test('Validate reaction to my non friends present story - unlike',async()=>{
            let response:any
            ({response} = await TestContext.flows.storyFlow.reactToNonFriendsPresentStory(false))
            await ResponseValidator.validateStatus(response,201)
            await ResponseValidator.validateErrorMessage(response,'Reaction saved');
        })
    })

    describe('React To Expired Story',()=>{

        test('Validate reaction to my expired story - like',async()=>{
            let response:any
            ({response} = await TestContext.flows.storyFlow.reactToMyExpiredStory(true))
            await ResponseValidator.validateStatus(response,201)
            await ResponseValidator.validateErrorMessage(response,'Reaction saved');
        })

        test('Validate reaction to my expired story - unlike',async()=>{
            let response:any
            ({response} = await TestContext.flows.storyFlow.reactToMyExpiredStory(false))
            await ResponseValidator.validateStatus(response,201)
            await ResponseValidator.validateErrorMessage(response,'Reaction saved');
        })

        test('Validate reaction to my friends expired story - like',async()=>{
            let response:any
            ({response} = await TestContext.flows.storyFlow.reactToMyFriendsExpiredStory(true))
            await ResponseValidator.validateStatus(response,201)
            await ResponseValidator.validateErrorMessage(response,'Reaction saved');
        })

        test('Validate reaction to my friends expired story - unlike',async()=>{
            let response:any
            ({response} = await TestContext.flows.storyFlow.reactToMyFriendsExpiredStory(false))
            await ResponseValidator.validateStatus(response,201)
            await ResponseValidator.validateErrorMessage(response,'Reaction saved');
        })

        test('Validate reaction to my friends friend expired story - like',async()=>{
            let response:any
            ({response} = await TestContext.flows.storyFlow.reactToMyFriendsOfFriendsExpiredStory(true))
            await ResponseValidator.validateStatus(response,201)
            await ResponseValidator.validateErrorMessage(response,'Reaction saved');
        })

        test('Validate reaction to my friends friend expired story - unlike',async()=>{
            let response:any
            ({response} = await TestContext.flows.storyFlow.reactToMyFriendsOfFriendsExpiredStory(false))
            await ResponseValidator.validateStatus(response,201)
            await ResponseValidator.validateErrorMessage(response,'Reaction saved');
        })

        test('Validate reaction to my non friends expired story - like',async()=>{
            let response:any
            ({response} = await TestContext.flows.storyFlow.reactToNonFriendsExpiredStory(true))
            await ResponseValidator.validateStatus(response,201)
            await ResponseValidator.validateErrorMessage(response,'Reaction saved');
        })

        test('Validate reaction to my non friends expired story - unlike',async()=>{
            let response:any
            ({response} = await TestContext.flows.storyFlow.reactToNonFriendsExpiredStory(false))
            await ResponseValidator.validateStatus(response,201)
            await ResponseValidator.validateErrorMessage(response,'Reaction saved');
        })
    })

    describe('React To Deleted Story',()=>{

        test('Validate reaction to my deleted story - like',async()=>{
            let response:any
            ({response} = await TestContext.flows.storyFlow.reactToMyDeletedStory(true))
            await ResponseValidator.validateStatus(response,201)
            await ResponseValidator.validateErrorMessage(response,'Reaction saved');
        })

        test('Validate reaction to my deleted story - unlike',async()=>{
            let response:any
            ({response} = await TestContext.flows.storyFlow.reactToMyDeletedStory(false))
            await ResponseValidator.validateStatus(response,201)
            await ResponseValidator.validateErrorMessage(response,'Reaction saved');
        })

        test('Validate reaction to my friends deleted story - like',async()=>{
            let response:any
            ({response} = await TestContext.flows.storyFlow.reactToMyFriendsPresentDeletedStory(true))
            await ResponseValidator.validateStatus(response,201)
            await ResponseValidator.validateErrorMessage(response,'Reaction saved');
        })

        test('Validate reaction to my friends deleted story - unlike',async()=>{
            let response:any
            ({response} = await TestContext.flows.storyFlow.reactToMyFriendsPresentDeletedStory(false))
            await ResponseValidator.validateStatus(response,201)
            await ResponseValidator.validateErrorMessage(response,'Reaction saved');
        })

        // test('Validate reaction to my friends friend deleted story',async()=>{

        // })

        test('Validate reaction to my non friends deleted story - like',async()=>{
            let response:any
            ({response} = await TestContext.flows.storyFlow.reactToNonFriendsPresentDeletedStory(true))
            await ResponseValidator.validateStatus(response,201)
            await ResponseValidator.validateErrorMessage(response,'Reaction saved');
        })

        test('Validate reaction to my non friends deleted story - unlike',async()=>{
            let response:any
            ({response} = await TestContext.flows.storyFlow.reactToNonFriendsPresentDeletedStory(false))
            await ResponseValidator.validateStatus(response,201)
            await ResponseValidator.validateErrorMessage(response,'Reaction saved');

        })
    })
})