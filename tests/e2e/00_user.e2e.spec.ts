import { TestContext } from "src/context/test.context"

describe('USER E2E VALIDATION',()=>{

    test('New User Registers And Sends Friend Request To Sap Becomes Friends And Sap Deletes New User from friend list',async()=>{

        /**
         * This E2E Test Case will validate following API Endpoints
         * 
         */
        
        //Step 1: New User Registers And logs in
        TestContext.activeUser='current'
        await TestContext.flows.registrationFlow.registerUserFlow()

        //Step 3: New User sends requests to SAP
        await TestContext.services.userService.sendFriendRequest({
            friendId: TestContext.initialMemuuid
        })

        //Step 4: New User cancels requests to SAP
        await TestContext.services.userService.cancelFriendRequest({
            friendId: TestContext.initialMemuuid
        })

        //Step 5: New User sends requests to SAP
        await TestContext.services.userService.sendFriendRequest({
            friendId: TestContext.initialMemuuid
        })

        //Step 6: SAP Logs in and Rejects Received Request
        TestContext.activeUser='initial'
        await TestContext.services.userService.rejectFriendRequest({
            friendId: TestContext.currentMemuuid
        })

        //Step 7: New User logs in and sends request to SAP again
        TestContext.activeUser='current'
        const {contact_number} = await TestContext.flows.userFlow.getParticularUserDetails(TestContext.currentMemuuid)
        await TestContext.flows.loginFlow.loginFlow(contact_number,TestContext.currentMemuuid,'current user')
        await TestContext.services.userService.sendFriendRequest({
            friendId: TestContext.initialMemuuid
        })

        //Step 8: SAP logs in and accept friend request of New User
        TestContext.activeUser='initial'
        await TestContext.services.userService.acceptFriendRequest({
            friendId: TestContext.currentMemuuid
        })

        //Step 9: Sap deletes New User from friend list
        await TestContext.services.userService.deleteFriend({
            friendId: TestContext.currentMemuuid
        })

    })

})