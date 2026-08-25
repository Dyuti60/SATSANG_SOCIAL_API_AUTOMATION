import { TestContext } from "src/context/test.context"

describe('Integration Testing',()=>{

    test('SIT - React To My Post',async()=>{
        const {postId} = await TestContext.services.feedRepo.getMyRandomPostWithFriendsVisibility(TestContext.initialMemuuid)
        await TestContext.services.feedService.reactToPost({
            postId: postId,
            reactionType:true
        })
        // Validate data creation in friend request table and friends table
    })

    test('SIT - React To My Friends Post',async()=>{
        const {postId} = await TestContext.services.feedRepo.getMyFriendsRandomPostWithFriendsVisibility(TestContext.initialMemuuid)
        await TestContext.services.feedService.reactToPost({
            postId: postId,
            reactionType:true
        })
        // Validate data creation in friend request table and friends table
    })

    test('SIT - Friend Reacts to his/her post',async()=>{
        const {postId,userId} = await TestContext.services.feedRepo.getMyFriendsRandomPostWithFriendsVisibility(TestContext.initialMemuuid)
        const {contact_number}= await TestContext.flows.userFlow.getParticularUserDetails(userId)
        TestContext.activeUser='current'
        await TestContext.flows.loginFlow.loginFlow(contact_number,userId,'current user')
        await TestContext.services.feedService.reactToPost({
            postId: postId,
            reactionType:true
        })
        // Validate data creation in friend request table and friends table
    })

    test('SIT - Friend reacts to my post',async()=>{
        const {postId} = await TestContext.services.feedRepo.getMyRandomPostWithFriendsVisibility(TestContext.initialMemuuid)

        const {friendId} = await TestContext.flows.userFlow.getRandomFriendOfParticularUser()
        const {contact_number}= await TestContext.flows.userFlow.getParticularUserDetails(friendId)
        TestContext.activeUser='current'
        await TestContext.flows.loginFlow.loginFlow(contact_number,friendId,'current user')
        await TestContext.services.feedService.reactToPost({
            postId: postId,
            reactionType:true
        })
        // Validate data creation in friend request table and friends table
    })
})