import { TestContext } from "src/context/test.context"

describe('Integration Testing',()=>{

    test('SIT - Send Friend Request',async()=>{
        
        const {friendId} = await TestContext.services.userRepo.getRandomValidSendFriendId(TestContext.initialMemuuid)
        await TestContext.services.userService.sendFriendRequest({
            friendId
        })

        // Validate data creation in friend request table

        await TestContext.services.userService.cancelFriendRequest({
            friendId
        })

        TestContext.activeUser='current'
        const {contact_number} = await TestContext.flows.userFlow.getParticularUserDetails(TestContext.currentMemuuid)
        await TestContext.flows.userFlow.loginUserFlow(contact_number)

        await TestContext.services.userService.sendFriendRequest({
            friendId: TestContext.currentMemuuid
        })

        // Validate data creation in friend request table
    })
})