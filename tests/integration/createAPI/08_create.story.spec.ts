import { TestContext } from "src/context/test.context"
import { StoryFactory } from "testdata/factory/story.factory"
import { getRandomJpegFile } from "utils/mediaPicker"

describe('Integration Testing',()=>{

    test('SIT - Create Story With Friends Visibility - Existing User',async()=>{
        await TestContext.flows.storyFlow.createStoryWithMyNewStoryMedia([getRandomJpegFile()])
        // Validate data creation in friend request table and friends table
    })

    test('SIT - Create Story With Friends Visibility - New User',async()=>{
        TestContext.activeUser='current'
        await TestContext.flows.registrationFlow.registerUserFlow()
        const userDetails = await TestContext.flows.userFlow.getParticularUserDetails(TestContext.currentMemuuid)
        await TestContext.flows.storyFlow.createStoryWithMyNewStoryMedia([getRandomJpegFile()])
        // Validate data creation in friend request table and friends table
    })

    test('SIT - Create Story With Selected Friends Visibility - Existing User',async()=>{
         const {mediaIds} = await TestContext.flows.mediaFlow.verifyUploadStatus('story',[getRandomJpegFile()])
         const friendId1 = await TestContext.flows.userFlow.getRandomFriendOfParticularUser()
         const friendId2 = await TestContext.flows.userFlow.getRandomFriendOfParticularUser()
        await TestContext.services.storyService.createStory({
            mediaId: mediaIds[0],
            visibility: 'SELECTED_FRIENDS',
            caption: 'Hello All',
            viewerIds:[friendId1.friendId,friendId2.friendId]
        })
        // Validate data creation in friend request table and friends table
    })

    test('SIT - Create Story With Selected Friends Visibility - New User',async()=>{
        TestContext.activeUser='current'
        await TestContext.flows.registrationFlow.registerUserFlow()
        const userDetails = await TestContext.flows.userFlow.getParticularUserDetails(TestContext.currentMemuuid)
        
        await TestContext.services.userService.sendFriendRequest({
            friendId: TestContext.initialMemuuid
        })
        
        TestContext.activeUser='initial'
        await TestContext.services.userService.acceptFriendRequest({
            friendId: TestContext.currentMemuuid
        })

        TestContext.activeUser='current'
        const {mediaIds} = await TestContext.flows.mediaFlow.verifyUploadStatus('story',[getRandomJpegFile()])
        await TestContext.services.storyService.createStory({
            mediaId: mediaIds[0],
            visibility: 'SELECTED_FRIENDS',
            caption: 'Hello All',
            viewerIds:[TestContext.initialMemuuid]
        })
        // Validate data creation in friend request table and friends table
    })
})