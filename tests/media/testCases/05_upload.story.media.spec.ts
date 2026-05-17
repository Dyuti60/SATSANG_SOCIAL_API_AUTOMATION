import ResponseValidator from "../../../src/api/response.validator"
import { TestContext } from "../../../src/context/test.context"
import { getRandomJpegFile, getRandomMp4File } from "../../../src/utils/mediaPicker"

describe('Validate POST /stories/create',()=>{
    
    describe('Validate Creating My Story - My Media Variance',()=>{

        test('Validate Creating My Story - New Media',async()=>{
            const filePath = getRandomJpegFile()
            const {response} = await TestContext.flows.storyFlow.createStoryWithMyNewStoryMedia([filePath])
            await ResponseValidator.validateStatus(response, 201)
            await ResponseValidator.validateErrorMessage(response, 'Story Saved Successfully')
        })

        test('Validate Creating My Story - Current Story Media',async()=>{
            const {response} = await TestContext.flows.storyFlow.createStoryWithMyPresentStoryMedia()
            await ResponseValidator.validateStatus(response, 201)
            await ResponseValidator.validateErrorMessage(response, 'Story Saved Successfully')
        })
    
        test('Validate Creating My Story - Expired Story Media',async()=>{
            const {response} = await TestContext.flows.storyFlow.createStoryWithMyExpiredStoryMedia()
            await ResponseValidator.validateStatus(response, 201)
            await ResponseValidator.validateErrorMessage(response, 'Story Saved Successfully')
        })

        test('Validate Creating My Story - Deleted Story Media',async()=>{
            const {response} = await TestContext.flows.storyFlow.createStoryWithMyDeletedStoryMedia()
            await ResponseValidator.validateStatus(response, 201)
            await ResponseValidator.validateErrorMessage(response, 'Story Saved Successfully')
        })

        test('Validate Creating My Story - Expired And Deleted Story Media',async()=>{
            const {response} = await TestContext.flows.storyFlow.createStoryWithMyExpiredDeletedStoryMedia()
            await ResponseValidator.validateStatus(response, 201)
            await ResponseValidator.validateErrorMessage(response, 'Story Saved Successfully')
        })

        test('Validate Creating My Story - Only Minio Loaded Media',async()=>{
            const {response} = await TestContext.flows.storyFlow.createStoryWithMyExistingMinioLoadedOnlyStoryMedia()
            await ResponseValidator.validateStatus(response, 201)
            await ResponseValidator.validateErrorMessage(response, 'Story Saved Successfully')
        })
    })

    describe('Validate Creating My Story (Video) - My Media Variance',()=>{

        test('Validate Creating My Story (Video) - New Media',async()=>{
            const filePath = getRandomMp4File()
            const {response} = await TestContext.flows.storyFlow.createStoryWithMyNewStoryMedia([filePath])
            await ResponseValidator.validateStatus(response, 201)
            await ResponseValidator.validateErrorMessage(response, 'Story Saved Successfully')
        })

    })

    describe('Validate Creating My Story - With Other Media',()=>{

        test('Validate Creating My Story - With My Post Media',async()=>{
            const filePath = getRandomJpegFile()
            const {response} = await TestContext.flows.storyFlow.createStoryWithMyNewPostMedia([filePath])
            await ResponseValidator.validateStatus(response, 201)
            await ResponseValidator.validateErrorMessage(response, 'Story Saved Successfully')
        })

        test('Validate Creating My Story - With My Profile Media',async()=>{
            const filePath = getRandomJpegFile()
            const {response} = await TestContext.flows.storyFlow.createStoryWithMyNewProfileMedia([filePath])
            await ResponseValidator.validateStatus(response, 201)
            await ResponseValidator.validateErrorMessage(response, 'Story Saved Successfully')
        })
    })

    describe('Validate Creating My Story - With Friends Media',()=>{

        test('Validate Creating My Story - With My Friends Present Story Media',async()=>{
            const {response} = await TestContext.flows.storyFlow.createStoryWithFriendsPresentStoryMedia()
            await ResponseValidator.validateStatus(response, 201)
            await ResponseValidator.validateErrorMessage(response, 'Story Saved Successfully')
        })

        test('Validate Creating My Story - With My Friends Expired Story Media',async()=>{
            const {response} = await TestContext.flows.storyFlow.createStoryWithFriendsExpiredStoryMedia()
            await ResponseValidator.validateStatus(response, 201)
            await ResponseValidator.validateErrorMessage(response, 'Story Saved Successfully')
        })

        test('Validate Creating My Story - With My Friends Only Minio Loaded Story Media',async()=>{
            const {response} = await TestContext.flows.storyFlow.createStoryWithFriendsExistingMinioLoadedOnlyStoryMedia()
            await ResponseValidator.validateStatus(response, 201)
            await ResponseValidator.validateErrorMessage(response, 'Story Saved Successfully')
        })
    })

    describe('Validate Creating My Story - With Friends Of Friends Media',()=>{

        test('Validate Creating My Story - With My Friends Friend Present Story Media',async()=>{
            const {response} = await TestContext.flows.storyFlow.createStoryWithFriendsFriendPresentStoryMedia()
            await ResponseValidator.validateStatus(response, 201)
            await ResponseValidator.validateErrorMessage(response, 'Story Saved Successfully')
        })

        test('Validate Creating My Story - With My Friends Friend Expired Story Media',async()=>{
            const {response} = await TestContext.flows.storyFlow.createStoryWithFriendsFriendExpiredStoryMedia()
            await ResponseValidator.validateStatus(response, 201)
            await ResponseValidator.validateErrorMessage(response, 'Story Saved Successfully')
        })

        test('Validate Creating My Story - With My Friends Friend Minio Loaded Story Media',async()=>{
            const {response} = await TestContext.flows.storyFlow.createStoryWithFriendsFriendExistingMinioLoadedOnlyStoryMedia()
            await ResponseValidator.validateStatus(response, 201)
            await ResponseValidator.validateErrorMessage(response, 'Story Saved Successfully')
        })
    })

    describe('Validate Creating My Story - With Non Friends Story Media',()=>{

        test('Validate Creating My Story - With Non Friends Present Story Media',async()=>{
            const {response} = await TestContext.flows.storyFlow.createStoryWithNonFriendsPresentStoryMedia()
            await ResponseValidator.validateStatus(response, 201)
            await ResponseValidator.validateErrorMessage(response, 'Story Saved Successfully')
        })

        test('Validate Creating My Story - With Non Friends Expired Story Media',async()=>{
            const {response} = await TestContext.flows.storyFlow.createStoryWithNonFriendsExpiredStoryMedia()
            await ResponseValidator.validateStatus(response, 201)
            await ResponseValidator.validateErrorMessage(response, 'Story Saved Successfully')
        })

        test('Validate Creating My Story - With Non Friends Minio Loaded Story Media',async()=>{
            const {response} = await TestContext.flows.storyFlow.createStoryWithNonFriendsExistingMinioLoadedOnlyStoryMedia()
            await ResponseValidator.validateStatus(response, 201)
            await ResponseValidator.validateErrorMessage(response, 'Story Saved Successfully')
        })
    })
})
