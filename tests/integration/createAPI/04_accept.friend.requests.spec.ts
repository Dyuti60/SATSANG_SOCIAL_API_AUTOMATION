import { TestContext } from "src/context/test.context"

describe('Integration Testing',()=>{

    test('SIT - Existing Accept Friend Request',async()=>{
        
        const {friendId} = await TestContext.services.userRepo.getRandomValidSendFriendId(TestContext.initialMemuuid)
        await TestContext.services.userService.sendFriendRequest({
            friendId
        })

        TestContext.activeUser='current'
        const {contact_number} = await TestContext.flows.userFlow.getParticularUserDetails(friendId)
        await TestContext.flows.loginFlow.loginFlow(contact_number,friendId,'current user')

        await TestContext.services.userService.acceptFriendRequest({
            friendId: TestContext.initialMemuuid
        })
        // Validate data creation in friend request table
    })

    test('SIT - New Accept Friend Request',async()=>{
        
        TestContext.activeUser='current'
        await TestContext.flows.registrationFlow.registerUserFlow()
        TestContext.activeUser='current'
        const {contact_number} = await TestContext.flows.userFlow.getParticularUserDetails(TestContext.currentMemuuid)
        await TestContext.flows.loginFlow.loginFlow(contact_number,TestContext.currentMemuuid,'current user')

        // Send friend request to logged in user
        await TestContext.services.userService.sendFriendRequest({
            friendId: TestContext.initialMemuuid
        })

        // Logged In Accepst friend request
        TestContext.activeUser='initial'
        await TestContext.services.userService.acceptFriendRequest({
            friendId: TestContext.currentMemuuid
        })

        // Validate data creation in friend request table and friends table
    })
})