import { storyCreateTestCases } from "src/testdata/validationPoints/story.validation.points"
import ResponseValidator from "src/api/response.validator"
import { TestContext } from "src/context/test.context"
import { getRandomJpegFile } from "src/utils/mediaPicker"

describe('Validate POST /stories/create',()=>{


    describe('Validate Creating A Story - Varying Payload',()=>{

        test('Validate Creating Story - Only MediaId',async()=>{
            const filePath = getRandomJpegFile()
            const {mediaIds} = await TestContext.flows.mediaFlow.verifyUploadStatus('story',[filePath])
            const {response} = await TestContext.services.storyService.createStory({
                mediaId: mediaIds[0]
            })
            await ResponseValidator.validateStatus(response,400)
            await ResponseValidator.validateErrorMessage(response, 'visibility must be one of the following values: ALL_FRIENDS, CLOSE_FRIENDS, SELECTED_FRIENDS')
        })


        test('Validate Creating Story - All Visibility',async()=>{
            const filePath = getRandomJpegFile()
            const {mediaIds} = await TestContext.flows.mediaFlow.verifyUploadStatus('story',[filePath])
            const {response} = await TestContext.services.storyService.createStory({
                mediaId: mediaIds[0],
                visibility: 'ALL_FRIENDS'
            })
            await ResponseValidator.validateStatus(response,201)
            await ResponseValidator.validateErrorMessage(response, 'Story created successfully')
        })

        test('Validate Creating Story - Close Visibility',async()=>{
            const filePath = getRandomJpegFile()
            const {mediaIds} = await TestContext.flows.mediaFlow.verifyUploadStatus('story',[filePath])
            const {response} = await TestContext.services.storyService.createStory({
                mediaId: mediaIds[0],
                visibility: 'CLOSE_FRIENDS'
            })
            await ResponseValidator.validateStatus(response,201)
            await ResponseValidator.validateErrorMessage(response, 'Story created successfully')
        })

        test('Validate Creating Story - Selected Visibility And No ViewerIds',async()=>{
            const filePath = getRandomJpegFile()
            const {mediaIds} = await TestContext.flows.mediaFlow.verifyUploadStatus('story',[filePath])
            const {response} = await TestContext.services.storyService.createStory({
                mediaId: mediaIds[0],
                visibility: 'SELECTED_FRIENDS',
                viewerIds: []
            })
            await ResponseValidator.validateStatus(response,400)
            await ResponseValidator.validateErrorMessage(response, 'viewerIds cannot be empty when visibility is SELECTED_FRIENDS')
        })

        test('Validate Creating Story - Selected Visibility And Friends ViewerIds',async()=>{
            const filePath = getRandomJpegFile()
            const {friendId} = await TestContext.services.userRepo.getRandomFriendIdWithAcceptedStatusOtherThanLoggedIn(TestContext.initialMemuuid)
            const {mediaIds} = await TestContext.flows.mediaFlow.verifyUploadStatus('story',[filePath])
            const {response} = await TestContext.services.storyService.createStory({
                mediaId: mediaIds[0],
                visibility: 'SELECTED_FRIENDS',
                viewerIds: [friendId]
            })
            await ResponseValidator.validateStatus(response,201)
            await ResponseValidator.validateErrorMessage(response, 'Story created successfully')
        })

        test('Validate Creating Story - Selected Visibility And Friends Friend ViewerIds',async()=>{
            const filePath = getRandomJpegFile()
            const {friendId} = await TestContext.services.userRepo.getValidFriendsOfFriendId(TestContext.initialMemuuid)
            const {mediaIds} = await TestContext.flows.mediaFlow.verifyUploadStatus('story',[filePath])
            const {response} = await TestContext.services.storyService.createStory({
                mediaId: mediaIds[0],
                visibility: 'SELECTED_FRIENDS',
                viewerIds: [friendId]
            })
            await ResponseValidator.validateStatus(response,400)
            await ResponseValidator.validateErrorMessage(response, 'viewerIds must only contain active friends of the user')
        })

        test('Validate Creating Story - Selected Visibility Logged In ViewerIds',async()=>{
            const filePath = getRandomJpegFile()
            const {friendId} = await TestContext.services.userRepo.getValidFriendsOfFriendId(TestContext.initialMemuuid)
            const {mediaIds} = await TestContext.flows.mediaFlow.verifyUploadStatus('story',[filePath])
            const {response} = await TestContext.services.storyService.createStory({
                mediaId: mediaIds[0],
                visibility: 'SELECTED_FRIENDS',
                viewerIds: [TestContext.initialMemuuid]
            })
            await ResponseValidator.validateStatus(response,400)
            await ResponseValidator.validateErrorMessage(response, 'viewerIds must only contain active friends of the user')
        })

        test('Validate Creating Story - Selected Visibility Non Friends ViewerIds',async()=>{
            const filePath = getRandomJpegFile()
            const friendId = await TestContext.services.userRepo.getRandomNonSocialFriendId(TestContext.initialMemuuid)
            const {mediaIds} = await TestContext.flows.mediaFlow.verifyUploadStatus('story',[filePath])
            const {response} = await TestContext.services.storyService.createStory({
                mediaId: mediaIds[0],
                visibility: 'SELECTED_FRIENDS',
                viewerIds: [friendId]
            })
            await ResponseValidator.validateStatus(response,400)
            await ResponseValidator.validateErrorMessage(response, 'viewerIds must only contain active friends of the user')
        })

        test('Validate Creating Story - All Friends Visibility Friends ViewId',async()=>{
            const filePath = getRandomJpegFile()
            const friendId = await TestContext.services.userRepo.getRandomNonSocialFriendId(TestContext.initialMemuuid)
            const {mediaIds} = await TestContext.flows.mediaFlow.verifyUploadStatus('story',[filePath])
            const {response} = await TestContext.services.storyService.createStory({
                mediaId: mediaIds[0],
                visibility: 'ALL_FRIENDS',
                viewerIds: [friendId]
            })
            await ResponseValidator.validateStatus(response,400)
            await ResponseValidator.validateErrorMessage(response, 'viewerIds must be empty when visibility is not SELECTED_FRIENDS')
        })

        test('Validate Creating Story - Close Friends Visibility Friends ViewId',async()=>{
            const filePath = getRandomJpegFile()
            const friendId = await TestContext.services.userRepo.getRandomNonSocialFriendId(TestContext.initialMemuuid)
            const {mediaIds} = await TestContext.flows.mediaFlow.verifyUploadStatus('story',[filePath])
            const {response} = await TestContext.services.storyService.createStory({
                mediaId: mediaIds[0],
                visibility: 'CLOSE_FRIENDS',
                viewerIds: [friendId]
            })
            await ResponseValidator.validateStatus(response,400)
            await ResponseValidator.validateErrorMessage(response, 'viewerIds must be empty when visibility is not SELECTED_FRIENDS')
        })

        test('Validate Creating Story - With Caption Only',async()=>{
            const {response} = await TestContext.services.storyService.createStory({
                caption: 'Hello mello'
            })
            await ResponseValidator.validateStatus(response,400)
            await ResponseValidator.validateErrorMessage(response, 'mediaId must be a UUID')
        })
    })


    describe('Validate Creating Stories - Miscellaneous Payload',()=>{
        storyCreateTestCases.forEach((testCases)=>{
            test(`Validate Create Story When - ${testCases.description}`,async()=>{
                const filePath = getRandomJpegFile()
                const {mediaIds} = await TestContext.flows.mediaFlow.verifyUploadStatus('story',[filePath])
                const payload ={
                    visibility: 'ALL_FRIENDS',
                    mediaId: mediaIds[0],
                    ...testCases.overrides
                }
                const {response} = await TestContext.services.storyService.createStory(payload)
                await ResponseValidator.validateStatus(response,testCases.expectedStatus)
                await ResponseValidator.validateErrorMessage(response, testCases.expectedMessage)
            })
        })
    })
})