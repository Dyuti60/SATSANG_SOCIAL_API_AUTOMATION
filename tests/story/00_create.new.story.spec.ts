import ResponseValidator from "../../src/api/response.validator"
import { TestContext } from "../../src/context/test.context"
import { StoryFactory } from "../../src/testdata/factory/story.factory"
import { getRandomJpegFile } from "../../src/utils/mediaPicker"

describe('Validate POST /stories/create',()=>{


    describe('Validate Creating A Story - Varying Payload',()=>{

        test('Validate Creating Story - All Visibility',async()=>{
            let storyPayload = StoryFactory.buildStoryPayload({
                visibilityType:1
            })
            const {response} = await TestContext.services.storyService.createStory(storyPayload)
            await ResponseValidator.validateStatus(response,201)
            await ResponseValidator.validateErrorMessage(response, 'Saved Story Successfully')
        })

        test('Validate Creating Story - Close Visibility',async()=>{
            let storyPayload = StoryFactory.buildStoryPayload({
                visibilityType:2
            })
            const {response} = await TestContext.services.storyService.createStory(storyPayload)
            await ResponseValidator.validateStatus(response,201)
            await ResponseValidator.validateErrorMessage(response, 'Saved Story Successfully')
        })

        test('Validate Creating Story - Selected Visibility And No ViewerIds',async()=>{
            let storyPayload = StoryFactory.buildStoryPayload({
                visibilityType:3,
                viewerIds: []
            })
            const {response} = await TestContext.services.storyService.createStory(storyPayload)
            await ResponseValidator.validateStatus(response,201)
            await ResponseValidator.validateErrorMessage(response, 'Saved Story Successfully')
        })

        // test('Validate Creating Story - Selected Visibility And Friends ViewerIds',async()=>{
        //     let storyPayload = StoryFactory.buildStoryPayload({
        //         visibilityType:3,
        //         viewerIds: []
        //     })
        //     const {response} = await TestContext.services.storyService.createStory(storyPayload)
        //     await ResponseValidator.validateStatus(response,201)
        //     await ResponseValidator.validateErrorMessage(response, 'Saved Story Successfully')
        // })

        // test('Validate Creating Story - Selected Visibility And Friends Friend ViewerIds',async()=>{
        //     let storyPayload = StoryFactory.buildStoryPayload({
        //         visibilityType:3,
        //         viewerIds: []
        //     })
        //     const {response} = await TestContext.services.storyService.createStory(storyPayload)
        //     await ResponseValidator.validateStatus(response,201)
        //     await ResponseValidator.validateErrorMessage(response, 'Saved Story Successfully')
        // })

        test('Validate Creating Story - Selected Visibility Logged In ViewerIds',async()=>{
            let storyPayload = StoryFactory.buildStoryPayload({
                visibilityType:3,
                viewerIds: [TestContext.initialMemuuid]
            })
            const {response} = await TestContext.services.storyService.createStory(storyPayload)
            await ResponseValidator.validateStatus(response,201)
            await ResponseValidator.validateErrorMessage(response, 'Saved Story Successfully')
        })

        // test('Validate Creating Story - Selected Visibility Non Friends ViewerIds',async()=>{
        //     let storyPayload = StoryFactory.buildStoryPayload({
        //         visibilityType:3,
        //         viewerIds: []
        //     })
        //     const {response} = await TestContext.services.storyService.createStory(storyPayload)
        //     await ResponseValidator.validateStatus(response,201)
        //     await ResponseValidator.validateErrorMessage(response, 'Saved Story Successfully')
        // })

        test('Validate Creating Story - With Caption',async()=>{
            let storyPayload = StoryFactory.buildStoryPayload()
            const {response} = await TestContext.services.storyService.createStory(storyPayload)
            await ResponseValidator.validateStatus(response,201)
            await ResponseValidator.validateErrorMessage(response, 'Saved Story Successfully')
        })

        test('Validate Creating Story - Without Caption',async()=>{
            let storyPayload = StoryFactory.buildStoryPayload()
            const {response} = await TestContext.services.storyService.createStory(storyPayload)
            await ResponseValidator.validateStatus(response,201)
            await ResponseValidator.validateErrorMessage(response, 'Saved Story Successfully')
        })

        test('Validate Creating Story - With Same Thumbnail',async()=>{
            const filePath = getRandomJpegFile()
            const {mediaIds}= await TestContext.flows.storyFlow.storyMediaUpload([filePath])
            let storyPayload = StoryFactory.buildStoryPayload({
                mediaId: mediaIds[0],
                thumbnailMediaId: mediaIds[0]
            })
            const {response} = await TestContext.services.storyService.createStory(storyPayload)
            await ResponseValidator.validateStatus(response,201)
            await ResponseValidator.validateErrorMessage(response, 'Saved Story Successfully')
        })

        test('Validate Creating Story - With Different Thumbnail',async()=>{
            let filePath1 = getRandomJpegFile()
            let mediaIds1 = await TestContext.flows.storyFlow.storyMediaUpload([filePath1])

            let filePath2 = getRandomJpegFile()
            let mediaIds2 = await TestContext.flows.storyFlow.storyMediaUpload([filePath2])
            let storyPayload = StoryFactory.buildStoryPayload({
                mediaId: mediaIds1.mediaIds[0],
                thumbnailMediaId: mediaIds2.mediaIds[0]
            })
            const {response} = await TestContext.services.storyService.createStory(storyPayload)
            await ResponseValidator.validateStatus(response,201)
            await ResponseValidator.validateErrorMessage(response, 'Saved Story Successfully')
        })

    })


    describe('Validate Creating Stories - Miscellaneous Payload',()=>{
        
    })
})