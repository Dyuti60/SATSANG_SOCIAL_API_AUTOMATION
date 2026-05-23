import ResponseValidator from "src/api/response.validator"
import { TestContext } from "src/context/test.context"
import { StoryFactory } from "src/testdata/factory/story.factory"
import { getRandomJpegFile } from "src/utils/mediaPicker"

describe('Validate POST /stories/bulk-create',()=>{

    describe('Validate Creating Couple Of Stories - Varying Payload',()=>{

        test('Validate Creating Story - All Visibility',async()=>{
            let filePaths:any=[]
            for(let i=1; i<=2; i++ ){
                filePaths.push(getRandomJpegFile())
            }
            const {mediaIds} = await TestContext.flows.storyFlow.storyMediaUpload(filePaths)
            const payload = StoryFactory.buildBulkStoryPayload({mediaIds:mediaIds,visibilityType:'ALL_FRIENDS'})
            const {response} = await TestContext.services.storyService.bulkCreateStories(payload)
            await ResponseValidator.validateStatus(response,201)
            await ResponseValidator.validateErrorMessage(response, 'Stories created successfully')
        })

        test('Validate Creating Story - Close Visibility',async()=>{
            let filePaths:any=[]
            for(let i=1; i<=2; i++ ){
                filePaths.push(getRandomJpegFile())
            }
            const {mediaIds} = await TestContext.flows.storyFlow.storyMediaUpload(filePaths)
            const payload = StoryFactory.buildBulkStoryPayload({mediaIds:mediaIds,visibilityType:'CLOSE_FRIENDS'})
            const {response} = await TestContext.services.storyService.bulkCreateStories(payload)
            await ResponseValidator.validateStatus(response,201)
            await ResponseValidator.validateErrorMessage(response, 'Stories created successfully')
        })

        test('Validate Creating Story - Selected Visibility And No ViewerIds',async()=>{
            let filePaths:any=[]
            for(let i=1; i<=2; i++ ){
                filePaths.push(getRandomJpegFile())
            }
            const {mediaIds} = await TestContext.flows.storyFlow.storyMediaUpload(filePaths)
            const payload = StoryFactory.buildBulkStoryPayload({mediaIds:mediaIds,visibilityType:'SELECTED_FRIENDS'})
            const {response} = await TestContext.services.storyService.bulkCreateStories(payload)
            await ResponseValidator.validateStatus(response,201)
            await ResponseValidator.validateErrorMessage(response, 'Stories created successfully')
        })

        test('Validate Creating Story - Selected Visibility And Same Friends ViewerIds',async()=>{
            let filePaths:any=[]
            let mediaIds:any=[]

            for(let i=1; i<=2; i++ ){
                filePaths.push(getRandomJpegFile())
            }
            const friendId1 = await TestContext.services.userRepo.getRandomFriendIdWithAcceptedStatusOtherThanLoggedIn(TestContext.initialMemuuid);
            const friendId2 = await TestContext.services.userRepo.getRandomFriendIdWithAcceptedStatusOtherThanLoggedIn(TestContext.initialMemuuid);

            ({mediaIds} = await TestContext.flows.storyFlow.storyMediaUpload([filePaths[0]]))
            let payload1 = StoryFactory.buildBulkStoryPayload({mediaIds:mediaIds,visibilityType:'SELECTED_FRIENDS',viewerIds:[friendId1.friendId, friendId2.friendId]});

            
            ({mediaIds} = await TestContext.flows.storyFlow.storyMediaUpload([filePaths[1]]))
            let payload2 = StoryFactory.buildBulkStoryPayload({mediaIds:mediaIds,visibilityType:'SELECTED_FRIENDS',viewerIds:[friendId1.friendId,friendId2.friendId]})

            if (payload1.stories && payload2.stories) {
                payload1?.stories?.push(payload2?.stories[0])
            }

            const {response} = await TestContext.services.storyService.bulkCreateStories(payload1)
            await ResponseValidator.validateStatus(response,201)
            await ResponseValidator.validateErrorMessage(response, 'Stories created successfully')
        })

        test('Validate Creating Story - Selected Visibility And Different Friends ViewerIds',async()=>{
            let filePaths:any=[]
            let mediaIds:any=[]
            let friendId:any

            for(let i=1; i<=2; i++ ){
                filePaths.push(getRandomJpegFile())
            }
            ({friendId} = await TestContext.services.userRepo.getRandomFriendIdWithAcceptedStatusOtherThanLoggedIn(TestContext.initialMemuuid)),
            ({mediaIds} = await TestContext.flows.storyFlow.storyMediaUpload([filePaths[0]]))
            let payload1 = StoryFactory.buildBulkStoryPayload({mediaIds:mediaIds,visibilityType:'SELECTED_FRIENDS',viewerIds:[friendId]});

            ({friendId} = await TestContext.services.userRepo.getRandomFriendIdWithAcceptedStatusOtherThanLoggedIn(TestContext.initialMemuuid)),
            ({mediaIds} = await TestContext.flows.storyFlow.storyMediaUpload([filePaths[1]]))
            let payload2 = StoryFactory.buildBulkStoryPayload({mediaIds:mediaIds,visibilityType:'SELECTED_FRIENDS',viewerIds:[friendId]})

            if (payload1.stories && payload2.stories) {
                payload1?.stories?.push(payload2?.stories[0])
            }

            const {response} = await TestContext.services.storyService.bulkCreateStories(payload1)
            await ResponseValidator.validateStatus(response,201)
            await ResponseValidator.validateErrorMessage(response, 'Stories created successfully')
        })

        test('Validate Creating Story - Selected Visibility And Friends Friend ViewerIds',async()=>{
            let filePaths:any=[]
            let mediaIds:any=[]
            let friendId:any

            for(let i=1; i<=2; i++ ){
                filePaths.push(getRandomJpegFile())
            }
            ({friendId} = await TestContext.services.userRepo.getValidFriendsOfFriendId(TestContext.initialMemuuid)),
            ({mediaIds} = await TestContext.flows.storyFlow.storyMediaUpload([filePaths[0]]))
            let payload1 = StoryFactory.buildBulkStoryPayload({mediaIds:mediaIds,visibilityType:'SELECTED_FRIENDS',viewerIds:[friendId]});

            ({friendId} = await TestContext.services.userRepo.getValidFriendsOfFriendId(TestContext.initialMemuuid)),
            ({mediaIds} = await TestContext.flows.storyFlow.storyMediaUpload([filePaths[1]]))
            let payload2 = StoryFactory.buildBulkStoryPayload({mediaIds:mediaIds,visibilityType:'SELECTED_FRIENDS',viewerIds:[friendId]})

            if (payload1.stories && payload2.stories) {
                payload1?.stories?.push(payload2?.stories[0])
            }

            const {response} = await TestContext.services.storyService.bulkCreateStories(payload1)
            await ResponseValidator.validateStatus(response,201)
            await ResponseValidator.validateErrorMessage(response, 'Stories created successfully')
        })

        test('Validate Creating Story - Selected Visibility Logged In ViewerIds',async()=>{
            let filePaths:any=[]
            for(let i=1; i<=2; i++ ){
                filePaths.push(getRandomJpegFile())
            }
            const {mediaIds} = await TestContext.flows.storyFlow.storyMediaUpload(filePaths)
            const payload = StoryFactory.buildBulkStoryPayload({mediaIds:mediaIds,visibilityType:'SELECTED_FRIENDS',viewerIds:[TestContext.initialMemuuid]})
            const {response} = await TestContext.services.storyService.bulkCreateStories(payload)
            await ResponseValidator.validateStatus(response,201)
            await ResponseValidator.validateErrorMessage(response, 'Stories created successfully')
        })

        test('Validate Creating Story - Selected Visibility Non Friends ViewerIds',async()=>{
            let filePaths:any=[]
            let mediaIds:any=[]
            let friendId:any

            for(let i=1; i<=2; i++ ){
                filePaths.push(getRandomJpegFile())
            }
            friendId = await TestContext.services.userRepo.getRandomNonSocialFriendId(TestContext.initialMemuuid),
            ({mediaIds} = await TestContext.flows.storyFlow.storyMediaUpload([filePaths[0]]))
            let payload1 = StoryFactory.buildBulkStoryPayload({mediaIds:mediaIds,visibilityType:'SELECTED_FRIENDS',viewerIds:[friendId]});

            friendId = await TestContext.services.userRepo.getRandomNonSocialFriendId(TestContext.initialMemuuid),
            ({mediaIds} = await TestContext.flows.storyFlow.storyMediaUpload([filePaths[1]]))
            let payload2 = StoryFactory.buildBulkStoryPayload({mediaIds:mediaIds,visibilityType:'SELECTED_FRIENDS',viewerIds:[friendId]})

            if (payload1.stories && payload2.stories) {
                payload1?.stories?.push(payload2?.stories[0])
            }

            const {response} = await TestContext.services.storyService.bulkCreateStories(payload1)
            await ResponseValidator.validateStatus(response,201)
            await ResponseValidator.validateErrorMessage(response, 'Stories created successfully')
        })

        test('Validate Creating Story - Stories With Mix Visibility',async()=>{
            let filePaths:any=[]
            let mediaIds:any=[]
            let friendId:any

            for(let i=1; i<=3; i++ ){
                filePaths.push(getRandomJpegFile())
            }
            friendId = await TestContext.services.userRepo.getRandomFriendIdWithAcceptedStatusOtherThanLoggedIn(TestContext.initialMemuuid),
            ({mediaIds} = await TestContext.flows.storyFlow.storyMediaUpload([filePaths[0]]))
            let payload1 = StoryFactory.buildBulkStoryPayload({mediaIds:mediaIds,visibilityType:'SELECTED_FRIENDS',viewerIds:[friendId]});


            ({mediaIds} = await TestContext.flows.storyFlow.storyMediaUpload([filePaths[1]]))
            let payload2 = StoryFactory.buildBulkStoryPayload({mediaIds:mediaIds,visibilityType:'All_FRIENDS'});

            ({mediaIds} = await TestContext.flows.storyFlow.storyMediaUpload([filePaths[2]]))
            let payload3 = StoryFactory.buildBulkStoryPayload({mediaIds:mediaIds,visibilityType:'CLOSE_FRIENDS'})

            if (payload1.stories && payload2.stories && payload3.stories) {
                payload1?.stories?.push(payload2?.stories[0])
                payload1?.stories?.push(payload3?.stories[0])
            }

            const {response} = await TestContext.services.storyService.bulkCreateStories(payload1)
            await ResponseValidator.validateStatus(response,400)
            await ResponseValidator.validateErrorMessage(response, 'Stories created successfully')
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
            await ResponseValidator.validateErrorMessage(response, 'Stories created successfully')
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
            await ResponseValidator.validateErrorMessage(response, 'Stories created successfully')
        })

        test('Validate Creating Stories - Invalid MediaId Out of All',async()=>{
            let filePaths:any=[]
            for(let i=1; i<=2; i++ ){
                filePaths.push(getRandomJpegFile())
            }
            const {mediaIds} = await TestContext.flows.storyFlow.storyMediaUpload(filePaths)
            mediaIds.push('0196ee78-3ba1-7663-88fd-b385aa46c64b')
            const payload = StoryFactory.buildBulkStoryPayload({mediaIds:mediaIds,visibilityType:'ALL_FRIENDS'})
            const {response} = await TestContext.services.storyService.bulkCreateStories(payload)
            await ResponseValidator.validateStatus(response,400)
            await ResponseValidator.validateErrorMessage(response, 'Invalid media for story with mediaId: 0196ee78-3ba1-7663-88fd-b385aa46c64b')
        })

        test('Validate Creating Stories - Invalid VisibilityType Out of All',async()=>{
            let filePaths:any=[]
            let mediaIds:any=[]
            let friendId:any

            for(let i=1; i<=3; i++ ){
                filePaths.push(getRandomJpegFile())
            }
           ({mediaIds} = await TestContext.flows.storyFlow.storyMediaUpload([filePaths[0]]))
            let payload1 = StoryFactory.buildBulkStoryPayload({mediaIds:mediaIds,visibilityType:'All_FRIENDS'});


            ({mediaIds} = await TestContext.flows.storyFlow.storyMediaUpload([filePaths[1]]))
            let payload2 = StoryFactory.buildBulkStoryPayload({mediaIds:mediaIds,visibilityType:'All_FRIENDS'});

            ({mediaIds} = await TestContext.flows.storyFlow.storyMediaUpload([filePaths[2]]))
            let payload3 = StoryFactory.buildBulkStoryPayload({mediaIds:mediaIds,visibilityType:'Hello World'})

            if (payload1.stories && payload2.stories && payload3.stories) {
                payload1?.stories?.push(payload2?.stories[0])
                payload1?.stories?.push(payload3?.stories[0])
            }

            const {response} = await TestContext.services.storyService.bulkCreateStories(payload1)
            await ResponseValidator.validateStatus(response,400)
            await ResponseValidator.validateErrorMessage(response, 'stories.0.visibility must be one of the following values: ALL_FRIENDS, CLOSE_FRIENDS, SELECTED_FRIENDS')
        })

        test('Validate Creating Stories - With Different Thumbnails',async()=>{
            let filePaths:any=[]
            let filePath:any
            let mediaIds:any=[]
            let mediaId
            let friendId:any

            for(let i=1; i<=2; i++ ){
                filePaths.push(getRandomJpegFile())
            }
            ({mediaIds} = await TestContext.flows.storyFlow.storyMediaUpload([filePaths[0]]))
            filePath = getRandomJpegFile()
            mediaId = await TestContext.flows.storyFlow.storyMediaUpload([filePath])
            let payload1 = StoryFactory.buildBulkStoryPayload({mediaIds:mediaIds,visibilityType:'ALL_FRIENDS',thumbnailMediaIds:mediaId.mediaIds[0]});

            ({mediaIds} = await TestContext.flows.storyFlow.storyMediaUpload([filePaths[1]]))
            filePath = getRandomJpegFile()
            mediaId = await TestContext.flows.storyFlow.storyMediaUpload([filePath])
            let payload2 = StoryFactory.buildBulkStoryPayload({mediaIds:mediaIds,visibilityType:'ALL_FRIENDS',thumbnailMediaIds:mediaId.mediaIds[0]})

            if (payload1.stories && payload2.stories) {
                payload1?.stories?.push(payload2?.stories[0])
            }

            const {response} = await TestContext.services.storyService.bulkCreateStories(payload1)
            await ResponseValidator.validateStatus(response,201)
            await ResponseValidator.validateErrorMessage(response, 'Stories created successfully')
        })

        test('Validate Creating Stories - With Invalid Thumbnail Out Of Many',async()=>{
            let filePaths:any=[]
            let filePath:any
            let mediaIds:any=[]
            let mediaId
            let friendId:any

            for(let i=1; i<=2; i++ ){
                filePaths.push(getRandomJpegFile())
            }
            ({mediaIds} = await TestContext.flows.storyFlow.storyMediaUpload([filePaths[0]]))
            filePath = getRandomJpegFile()
            mediaId = await TestContext.flows.storyFlow.storyMediaUpload([filePath])
            let payload1 = StoryFactory.buildBulkStoryPayload({mediaIds:mediaIds,visibilityType:'ALL_FRIENDS',thumbnailMediaIds:mediaId.mediaIds[0]});

            ({mediaIds} = await TestContext.flows.storyFlow.storyMediaUpload([filePaths[1]]))
            let payload2 = StoryFactory.buildBulkStoryPayload({mediaIds:mediaIds,visibilityType:'ALL_FRIENDS',thumbnailMediaIds:'0196ee78-3ba1-7663-88fd-b385aa46c64b'})

            if (payload1.stories && payload2.stories) {
                payload1?.stories?.push(payload2?.stories[0])
            }

            const {response} = await TestContext.services.storyService.bulkCreateStories(payload1)
            await ResponseValidator.validateStatus(response,400)
            await ResponseValidator.validateErrorMessage(response, 'Stories created successfully')
        })

    })


    describe('Validate Creating Six Stories - Varying Payload',()=>{

        test('Validate Creating Story - All Visibility',async()=>{
            let filePaths:any=[]
            for(let i=1; i<=5; i++ ){
                filePaths.push(getRandomJpegFile())
            }
            const {mediaIds} = await TestContext.flows.storyFlow.storyMediaUpload(filePaths)
            
            const filePath = getRandomJpegFile()
            const mediaId = await TestContext.flows.storyFlow.storyMediaUpload([filePath])

            mediaIds.push(mediaId.mediaIds[0])

            const payload = StoryFactory.buildBulkStoryPayload({mediaIds:mediaIds, visibilityType:'ALL_FRIENDS'})
            const {response} = await TestContext.services.storyService.bulkCreateStories(payload)
            await ResponseValidator.validateStatus(response,400)
            await ResponseValidator.validateErrorMessage(response, 'medias must contain no more than 5 elements')
        })
    })


})