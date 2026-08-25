import { TestContext } from "src/context/test.context"
import { getRandomJpegFile } from "utils/mediaPicker"

describe('Integration Testing',()=>{

    test('SIT - Create Bulk Story With Friends Visibility - Existing User',async()=>{
        await TestContext.flows.storyFlow.createBulkStoryWithNewMedia([getRandomJpegFile(),getRandomJpegFile()])
        // Validate data creation in friend request table and friends table
    })

    test('SIT - Create Bulk Story With Friends Visibility - New User',async()=>{
        TestContext.activeUser='current'
        await TestContext.flows.registrationFlow.registerUserFlow()
        const userDetails = await TestContext.flows.userFlow.getParticularUserDetails(TestContext.currentMemuuid)
        await TestContext.flows.storyFlow.createBulkStoryWithNewMedia([getRandomJpegFile(),getRandomJpegFile()])
        // Validate data creation in friend request table and friends table
    })

})