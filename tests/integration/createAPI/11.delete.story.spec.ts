import { TestContext } from "src/context/test.context"

describe('Integration Testing',()=>{

    test('SIT - Delete Friends Visible Story',async()=>{
        const {storyId} = await TestContext.services.storyRepo.getMyPresentStoryMediaId(TestContext.initialMemuuid)
        await TestContext.services.storyService.deleteStory({
            storyId
        })
        // Validate data creation in friend request table and friends table
    })

})