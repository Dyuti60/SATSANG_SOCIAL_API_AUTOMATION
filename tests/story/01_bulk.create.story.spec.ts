import ResponseValidator from "../../src/api/response.validator"
import { TestContext } from "../../src/context/test.context"
import { StoryFactory } from "../../src/testdata/factory/story.factory"
import { getRandomJpegFile } from "../../src/utils/mediaPicker"

describe('Validate POST /stories/bulk-create',()=>{

    describe('Validate Creating Couple Of Stories - Varying Payload',()=>{

        test('Validate Creating Story - All Visibility',async()=>{
            let filePaths:any=[]
            for(let i=1; i<=2; i++ ){
                filePaths.push(getRandomJpegFile())
            }
            const {response} = await TestContext.services.storyService.bulkCreateStories(filePaths)
            await ResponseValidator.validateStatus(response,201)
            await ResponseValidator.validateErrorMessage(response, 'Saved Story Successfully')
        })

        test('Validate Creating Story - Close Visibility',async()=>{
            let filePaths:any=[]
            for(let i=1; i<=2; i++ ){
                filePaths.push(getRandomJpegFile())
            }
            const {mediaIds} = await TestContext.flows.storyFlow.storyMediaUpload(filePaths)
            const payload = StoryFactory.buildBulkStoryPayload({mediaIds:mediaIds,visibilityType:2})
            const {response} = await TestContext.services.storyService.bulkCreateStories(payload)
            await ResponseValidator.validateStatus(response,201)
            await ResponseValidator.validateErrorMessage(response, 'Saved Story Successfully')
        })

        test('Validate Creating Story - Selected Visibility And No ViewerIds',async()=>{
            let filePaths:any=[]
            for(let i=1; i<=2; i++ ){
                filePaths.push(getRandomJpegFile())
            }
            const {mediaIds} = await TestContext.flows.storyFlow.storyMediaUpload(filePaths)
            const payload = StoryFactory.buildBulkStoryPayload({mediaIds:mediaIds,visibilityType:3})
            const {response} = await TestContext.services.storyService.bulkCreateStories(payload)
            await ResponseValidator.validateStatus(response,201)
            await ResponseValidator.validateErrorMessage(response, 'Saved Story Successfully')
        })

        test('Validate Creating Story - Selected Visibility And Friends ViewerIds',async()=>{

        })

        test('Validate Creating Story - Selected Visibility And Friends Friend ViewerIds',async()=>{

        })

        test('Validate Creating Story - Selected Visibility Logged In ViewerIds',async()=>{
            let filePaths:any=[]
            for(let i=1; i<=2; i++ ){
                filePaths.push(getRandomJpegFile())
            }
            const {mediaIds} = await TestContext.flows.storyFlow.storyMediaUpload(filePaths)
            const payload = StoryFactory.buildBulkStoryPayload({mediaIds:mediaIds,visibilityType:3,viewerIds:[TestContext.initialMemuuid]})
            const {response} = await TestContext.services.storyService.bulkCreateStories(payload)
            await ResponseValidator.validateStatus(response,201)
            await ResponseValidator.validateErrorMessage(response, 'Saved Story Successfully')
        })

        test('Validate Creating Story - Selected Visibility Non Friends ViewerIds',async()=>{

        })

        test('Validate Creating Story - Selected Stories With Mix Visibility',async()=>{

        })

        test('Validate Creating Story - Without Caption',async()=>{
            let filePaths:any=[]
            for(let i=1; i<=2; i++ ){
                filePaths.push(getRandomJpegFile())
            }
            const {mediaIds} = await TestContext.flows.storyFlow.storyMediaUpload(filePaths)
            const payload = StoryFactory.buildBulkStoryPayload({mediaIds:mediaIds,caption:''})
            const {response} = await TestContext.services.storyService.bulkCreateStories(payload)
            await ResponseValidator.validateStatus(response,201)
            await ResponseValidator.validateErrorMessage(response, 'Saved Story Successfully')
        })

        test('Validate Creating Story - With Same Thumbnail',async()=>{
            let filePaths:any=[]
            for(let i=1; i<=2; i++ ){
                filePaths.push(getRandomJpegFile())
            }
            const {mediaIds} = await TestContext.flows.storyFlow.storyMediaUpload(filePaths)
            const payload = StoryFactory.buildBulkStoryPayload({mediaIds:mediaIds})
            const {response} = await TestContext.services.storyService.bulkCreateStories(payload)
            await ResponseValidator.validateStatus(response,201)
            await ResponseValidator.validateErrorMessage(response, 'Saved Story Successfully')
        })

        test('Validate Creating Story - With Different Thumbnail',async()=>{
            let filePaths:any=[]
            for(let i=1; i<=2; i++ ){
                filePaths.push(getRandomJpegFile())
            }
            const {mediaIds} = await TestContext.flows.storyFlow.storyMediaUpload(filePaths)
            const payload = StoryFactory.buildBulkStoryPayload({mediaIds:mediaIds, thumbnailMediaIds: mediaIds[1]})
            const {response} = await TestContext.services.storyService.bulkCreateStories(payload)
            await ResponseValidator.validateStatus(response,201)
            await ResponseValidator.validateErrorMessage(response, 'Saved Story Successfully')
        })

        describe('Validate Creating Stories - Miscellaneous Payload',()=>{
            
        })
    })


    describe('Validate Creating Six Stories - Varying Payload',()=>{

        test('Validate Creating Story - All Visibility',async()=>{
            let filePaths:any=[]
            for(let i=1; i<=6; i++ ){
                filePaths.push(getRandomJpegFile())
            }
            const {response} = await TestContext.services.storyService.bulkCreateStories(filePaths)
            await ResponseValidator.validateStatus(response,201)
            await ResponseValidator.validateErrorMessage(response, 'Saved Story Successfully')
        })
    })


})