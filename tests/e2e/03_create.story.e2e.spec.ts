
// Test Friends Visibility Only

import { TestContext } from "src/context/test.context"
import { getRandomJpegFile } from "utils/mediaPicker"

describe('Create Story E2E Flow',()=>{

    test('Create Story With Friends Visibility E2E Flow',async()=>{

        let user1FeedResponse:any, user2FeedResponse:any

        //Step 1: Register User 1 And have user details
        TestContext.activeUser='current'
        await TestContext.flows.registrationFlow.registerUserFlow()
        const user1Id= TestContext.currentMemuuid
        const user1 = await TestContext.flows.userFlow.getParticularUserDetails(user1Id)

        //Step 2: User 1 creates story with friends visibility
        const user1StoryDetails = await TestContext.flows.storyFlow.createStoryWithMyNewStoryMedia([getRandomJpegFile()])

        //Step 3: User 1 story only comes in user 1 story feed
        user1FeedResponse = await TestContext.services.storyService.fetchStories({})

        //Step 4: Register User 2 And have user details
        TestContext.activeUser='current'
        await TestContext.flows.registrationFlow.registerUserFlow()
        const user2Id= TestContext.currentMemuuid
        const user2 = await TestContext.flows.userFlow.getParticularUserDetails(user2Id)


        //Step 5: User 2 shouldnt have story in story feed
        user2FeedResponse = await TestContext.services.storyService.fetchStories({})

        //Step 6: User 2 creates story with friends visibility
        const user2StoryDetails = await TestContext.flows.storyFlow.createStoryWithMyNewStoryMedia([getRandomJpegFile()])
        
        //Step 7: User 2 sends friend request to User 1
        await TestContext.services.userService.sendFriendRequest({
            friendId: user1Id
        })

        //Step 8: User 1 accepts friend request of User 2
        await TestContext.flows.loginFlow.loginFlow(user1.contact_number,user1Id,'current user')
        await TestContext.services.userService.acceptFriendRequest({
            friendId: user2Id
        })

        //Step 9: User 1 has story of user 2 in story feed
        user1FeedResponse = await TestContext.services.storyService.fetchStories({})


        //Step 10: User 1 sends and become friend of logged in user
        await TestContext.services.userService.sendFriendRequest({
            friendId: TestContext.initialMemuuid
        })
        TestContext.activeUser='initial'
        await TestContext.services.userService.acceptFriendRequest({
            friendId: user1Id
        })

        //Step 11: User 1 sends and become friend of friends of friend user
        TestContext.activeUser='current'
        const fofUserId = await TestContext.services.storyRepo.myFriendOfFriendPresentStoryMediaId(user1Id)
        
        await TestContext.services.userService.sendFriendRequest({
            friendId: fofUserId.friendId
        })

        const fofDetails = await TestContext.flows.userFlow.getParticularUserDetails(fofUserId.friendId)

        await TestContext.flows.loginFlow.loginFlow(fofDetails.contact_number,fofUserId.friendId,'current user')
        await TestContext.services.userService.acceptFriendRequest({
            friendId: user1Id
        })


        //Step 12: User 1 has stories of logged in user and fof user and user 2 in feed
        await TestContext.flows.loginFlow.loginFlow(user1.contact_number,user1Id,'current user')
        user1FeedResponse = await TestContext.services.storyService.fetchStories({})

        //Step 13: User 2 has story of user 1 in feed
        await TestContext.flows.loginFlow.loginFlow(user2.contact_number,user2Id,'current user')
        user2FeedResponse = await TestContext.services.storyService.fetchStories({})

        //Step 14: User 2 deletes user 2 from friend list
        await TestContext.services.userService.deleteFriend({
            friendId: user1Id
        })

        //Step 15: User 2 has no post of user 2
        user2FeedResponse = await TestContext.services.storyService.fetchStories({})

        //Step 16: User 1 deletes user 2 from friend list
        await TestContext.flows.loginFlow.loginFlow(user1.contact_number,user1Id,'current user')
        await TestContext.services.userService.deleteFriend({
            friendId: TestContext.initialMemuuid
        })

        //Step 17: User 1 has no post of user 2
        user1FeedResponse = await TestContext.services.feedService.getPostInFeed()
    })
})
