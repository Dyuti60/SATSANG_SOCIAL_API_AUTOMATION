import ResponseValidator from "../../src/api/response.validator"
import { TestContext } from "../../src/context/test.context"

describe('Validate GET /stories/{storyId}/reactions',()=>{

    test('Validate Fetching My Present Story Reactions',async()=>{
        const {response} = await TestContext.flows.storyFlow.fetchMyPresentStoryReactions()
        await ResponseValidator.validateStatus(response,200)
        await ResponseValidator.validateErrorMessage(response,'No reactions found')
        await ResponseValidator.validateErrorMessage(response,'Reactions fetched successfully')
    })

    test('Validate Fetching My Friends Present Story Reactions',async()=>{
        const {response} = await TestContext.flows.storyFlow.fetchMyFriendsPresentStoryReactions()
        await ResponseValidator.validateStatus(response,200)
        await ResponseValidator.validateErrorMessage(response,'You are not authorized to view reactions for this story')
    })

    test('Validate Fetching My Friends Friend Present Story Reactions',async()=>{
        const {response} = await TestContext.flows.storyFlow.fetchMyFriendsPresentStoryReactions()
        await ResponseValidator.validateStatus(response,200)
        await ResponseValidator.validateErrorMessage(response,'You are not authorized to view reactions for this story')
    })

    test('Validate Fetching Non Friends Present Story Reactions',async()=>{
        const {response} = await TestContext.flows.storyFlow.fetchNonFriendsPresentStoryReactions()
        await ResponseValidator.validateStatus(response,200)
        await ResponseValidator.validateErrorMessage(response,'You are not authorized to view reactions for this story')
    })

    test('Validate Fetching My Deleted Story Reactions',async()=>{
        const {response} = await TestContext.flows.storyFlow.fetchMyDeletedStoryReactions()
        await ResponseValidator.validateStatus(response,200)
        await ResponseValidator.validateErrorMessage(response,'No reactions found')
        await ResponseValidator.validateErrorMessage(response,'Reactions fetched successfully')
    })

    test('Validate Fetching My Expired Story Reactions',async()=>{
        const {response} = await TestContext.flows.storyFlow.fetchMyExpiredStoryReactions()
        await ResponseValidator.validateStatus(response,200)
        await ResponseValidator.validateErrorMessage(response,'Reactions fetched successfully')
        await ResponseValidator.validateErrorMessage(response,'No reactions found')
    })
})