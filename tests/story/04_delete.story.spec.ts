import ResponseValidator from "../../src/api/response.validator"
import { TestContext } from "../../src/context/test.context"

describe('Validate Delete /stories/{storyId}',()=>{

    describe('Validate Delete Story',()=>{

        test('Validate Delete My Present Story',async()=>{
            const {response} = await TestContext.flows.storyFlow.deleteMyPresentStory()
            await ResponseValidator.validateStatus(response,200)
            await ResponseValidator.validateErrorMessage(response,'Deleted Story Successfully')
        })

        test('Validate Delete My Friends Present Story',async()=>{
            const {response} = await TestContext.flows.storyFlow.deleteMyFriendsPresentStory()
            await ResponseValidator.validateStatus(response,200)
            await ResponseValidator.validateErrorMessage(response,'Deleted Story Successfully')
        })

        test('Validate Delete My Friends Friend Present Story',async()=>{
            const {response} = await TestContext.flows.storyFlow.deleteMyFriendsFriendPresentStory()
            await ResponseValidator.validateStatus(response,200)
            await ResponseValidator.validateErrorMessage(response,'Deleted Story Successfully')
        })

        test('Validate Delete My Deleted Story',async()=>{
            const {response} = await TestContext.flows.storyFlow.deleteMyDeletedStory()
            await ResponseValidator.validateStatus(response,200)
            await ResponseValidator.validateErrorMessage(response,'Deleted Story Successfully')
        })

        test('Validate Delete My Expired Story',async()=>{
            const {response} = await TestContext.flows.storyFlow.deleteMyExpiredStory()
            await ResponseValidator.validateStatus(response,200)
            await ResponseValidator.validateErrorMessage(response,'Deleted Story Successfully')
        })
    })
})