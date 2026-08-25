import { TestContext } from "src/context/test.context"

describe('Integration Testing',()=>{

    test('SIT - Reject Friend Request',async()=>{
        
        const {friendId} = await TestContext.services.userRepo.getRandomValidSendFriendId(TestContext.initialMemuuid)
        await TestContext.services.userService.sendFriendRequest({
            friendId
        })

        TestContext.activeUser='current'
        const {contact_number} = await TestContext.flows.userFlow.getParticularUserDetails(friendId)
        await TestContext.flows.loginFlow.loginFlow(contact_number,friendId,'current user')

        await TestContext.services.userService.rejectFriendRequest({
            friendId: TestContext.initialMemuuid
        })
        // Validate data creation in friend request table

        await TestContext.services.userService.sendFriendRequest({
            friendId: TestContext.initialMemuuid
        })

        await TestContext.services.userService.rejectFriendRequest({
            friendId
        })
    })
})