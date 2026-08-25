import { TestContext } from "src/context/test.context"

describe('Create And View Profile',()=>{
    
    test('Create And View Profile',async()=>{

        // Step 1: New User Registers 
        TestContext.activeUser='current'
        await TestContext.flows.registrationFlow.registerUserFlow()
        
        // Step 2: New User views profile
        await TestContext.services.userService.getProfile({
            userId: TestContext.currentMemuuid
        })

        // Step 3: New User views non friend logged in user profile
        await TestContext.services.userService.getProfile({
            userId: TestContext.initialMemuuid
        })

        // Step 4: New User sends friend request to logged in user
        await TestContext.services.userService.sendFriendRequest({
            friendId: TestContext.initialMemuuid
        })

        // Step 5: Logged In user views profile of new user
        TestContext.activeUser='initial'
        await TestContext.services.userService.getProfile({
            userId: TestContext.currentMemuuid
        })

        // Step 6: Logged in user accepts friend request of new user
        await TestContext.services.userService.acceptFriendRequest({
            friendId: TestContext.currentMemuuid
        })

        // Step 7: Logged in user views profile pf new user
        await TestContext.services.userService.getProfile({
            userId: TestContext.currentMemuuid
        })

        // Step 8: Logged in user views profile of friends of friends
        const {friendId} = await TestContext.services.userRepo.getValidFriendsOfFriendId(TestContext.initialMemuuid)
        await TestContext.services.userService.getProfile({
            userId:friendId
        })

        // Step 9: Logged in user views her profile
        await TestContext.services.userService.getProfile({
            userId: TestContext.initialMemuuid
        })


    })
})


// Registered User Views Personal Profile
// New User views Non - friend Sap Profile
// Sap views Friends Profile
// Sap views Non Friends Profile
// Sap views Friends Friend Profile
// Sap views Saps Profile 