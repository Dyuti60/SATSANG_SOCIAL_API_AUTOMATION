import { TestContext } from "src/context/test.context"

// Add Simple Comment In Post
describe('React To Post - E2E Flow',()=>{

// React To Post
    test('React to Post With Friends Visibility - E2E Flow',async()=>{
    
        // New User Creates A Post with friends visibility
        TestContext.activeUser='current'
        await TestContext.flows.registrationFlow.registerUserFlow()
        const newUserDetails = await TestContext.flows.userFlow.getParticularUserDetails(TestContext.currentMemuuid)
        await TestContext.flows.feedFlow.createPostWithMyPostMedia('friends visibility')
        const newUserPostDetails = await TestContext.services.feedRepo.getMyRandomPostWithFriendsVisibility(TestContext.currentMemuuid)


        // New User reacts to his post
        await TestContext.services.feedService.reactToPost({
            postId: newUserPostDetails.postId,
            reactType: 501
        })

        // New User views reaction in post
        await TestContext.services.feedService.getAllReactionOnPost({
            postId: newUserPostDetails.postId
        })

        // Logged In User becomes friend of new user
        await TestContext.services.userService.sendFriendRequest({
            friendId: TestContext.initialMemuuid
        })

        TestContext.activeUser='initial'
        await TestContext.services.userService.acceptFriendRequest({
            friendId: TestContext.currentMemuuid
        })

        // Logged In User views reaction in post
        await TestContext.services.feedService.getAllReactionOnPost({
            postId: newUserPostDetails.postId
        })

        // Logged In user reacts to his post
        await TestContext.services.feedService.reactToPost({
            postId: newUserPostDetails.postId,
            reactType: 501
        })

        // Logged In User views reaction in post (once friend)
        await TestContext.services.feedService.getAllReactionOnPost({
            postId: newUserPostDetails.postId
        })

        // New User Views Reaction to Post
        TestContext.activeUser='current'
        await TestContext.services.feedService.getAllReactionOnPost({
            postId: newUserPostDetails.postId
        })

        // New Users - Friends of Friend Adds reaction 
        const fofId = await TestContext.services.userRepo.getValidFriendsOfFriendId(TestContext.currentMemuuid)
        const fofIdDetails = await TestContext.flows.userFlow.getParticularUserDetails(fofId.friendId)
        await TestContext.flows.loginFlow.loginFlow(fofIdDetails.contact_number,fofId.friendId,'current user')
        await TestContext.services.feedService.reactToPost({
            postId: newUserPostDetails.postId,
            reactType: 501
        })

        // Friends of Friends views reaction in post
        await TestContext.services.feedService.getAllReactionOnPost({
            postId: newUserPostDetails.postId
        })

        // New Users - Non Social Adds reaction
        const nfId = await TestContext.services.userRepo.getRandomNonSocialFriendId(TestContext.currentMemuuid)
        const nfIdDetails = await TestContext.flows.userFlow.getParticularUserDetails(nfId)
        await TestContext.flows.loginFlow.loginFlow(nfIdDetails.contact_number,nfId,'current user')
        await TestContext.services.feedService.reactToPost({
            postId: newUserPostDetails.postId,
            reactType: 501
        })

        // Non Social views reaction in post
        await TestContext.services.feedService.getAllReactionOnPost({
            postId: newUserPostDetails.postId
        })


        // New User logs in
        await TestContext.flows.loginFlow.loginFlow(newUserDetails.contact_number,newUserDetails.sfmm_id,'current user')


        // New User views reaction in post
        await TestContext.services.feedService.getAllReactionOnPost({
            postId: newUserPostDetails.postId
        })

    })

// React To Post
    test('React And Remove Reaction from - to Post With Friends Visibility - E2E Flow',async()=>{
    
        // New User Creates A Post with friends visibility
        TestContext.activeUser='current'
        await TestContext.flows.registrationFlow.registerUserFlow()
        const newUserDetails = await TestContext.flows.userFlow.getParticularUserDetails(TestContext.currentMemuuid)
        await TestContext.flows.feedFlow.createPostWithMyPostMedia('friends visibility')
        const newUserPostDetails = await TestContext.services.feedRepo.getMyRandomPostWithFriendsVisibility(TestContext.currentMemuuid)

        // New User removes reaction to his post (even when not added)
        await TestContext.services.feedService.removeReactionFromPost({
            postId: newUserPostDetails.postId
        })

        // New User reacts to his post
        await TestContext.services.feedService.reactToPost({
            postId: newUserPostDetails.postId,
            reactType: 501
        })

        // New User removes reaction to his post
        await TestContext.services.feedService.removeReactionFromPost({
            postId: newUserPostDetails.postId
        })

        // New User views reaction in post
        await TestContext.services.feedService.getAllReactionOnPost({
            postId: newUserPostDetails.postId
        })

        // New User reacts to his post
        await TestContext.services.feedService.reactToPost({
            postId: newUserPostDetails.postId,
            reactType: 501
        })

        // New User views reaction in post
        await TestContext.services.feedService.getAllReactionOnPost({
            postId: newUserPostDetails.postId
        })

        // Logged In User becomes friend of new user
        await TestContext.services.userService.sendFriendRequest({
            friendId: TestContext.initialMemuuid
        })

        TestContext.activeUser='initial'
        await TestContext.services.userService.acceptFriendRequest({
            friendId: TestContext.currentMemuuid
        })

        // Logged In User views reaction in post
        await TestContext.services.feedService.getAllReactionOnPost({
            postId: newUserPostDetails.postId
        })

        // Logged In user reacts to his post
        await TestContext.services.feedService.reactToPost({
            postId: newUserPostDetails.postId,
            reactType: 501
        })

        // Logged In user removes reaction from post
        await TestContext.services.feedService.removeReactionFromPost({
            postId: newUserPostDetails.postId
        })
        
        // Logged In user reacts to his post
        await TestContext.services.feedService.reactToPost({
            postId: newUserPostDetails.postId,
            reactType: 501
        })

        // Logged In User views reaction in post (once friend)
        await TestContext.services.feedService.getAllReactionOnPost({
            postId: newUserPostDetails.postId
        })

        // New User Views Reaction to Post
        TestContext.activeUser='current'
        await TestContext.services.feedService.getAllReactionOnPost({
            postId: newUserPostDetails.postId
        })

        // New Users - Friends of Friend Adds reaction 
        const fofId = await TestContext.services.userRepo.getValidFriendsOfFriendId(TestContext.currentMemuuid)
        const fofIdDetails = await TestContext.flows.userFlow.getParticularUserDetails(fofId.friendId)
        await TestContext.flows.loginFlow.loginFlow(fofIdDetails.contact_number,fofId.friendId,'current user')
        await TestContext.services.feedService.reactToPost({
            postId: newUserPostDetails.postId,
            reactType: 501
        })

        // FOF user removes reaction from post
        await TestContext.services.feedService.removeReactionFromPost({
            postId: newUserPostDetails.postId
        })

        // New Users - Friends of Friend Adds reaction 
        await TestContext.services.feedService.reactToPost({
            postId: newUserPostDetails.postId,
            reactType: 501
        })

        // Friends of Friends views reaction in post
        await TestContext.services.feedService.getAllReactionOnPost({
            postId: newUserPostDetails.postId
        })

        // New Users - Non Social Adds reaction
        const nfId = await TestContext.services.userRepo.getRandomNonSocialFriendId(TestContext.currentMemuuid)
        const nfIdDetails = await TestContext.flows.userFlow.getParticularUserDetails(nfId)
        await TestContext.flows.loginFlow.loginFlow(nfIdDetails.contact_number,nfId,'current user')
        await TestContext.services.feedService.reactToPost({
            postId: newUserPostDetails.postId,
            reactType: 501
        })

        // FOF user removes reaction from post
        await TestContext.services.feedService.removeReactionFromPost({
            postId: newUserPostDetails.postId
        })

        // New Users - Non Social Adds reaction
        await TestContext.services.feedService.reactToPost({
            postId: newUserPostDetails.postId,
            reactType: 501
        })

        // Non Social views reaction in post
        await TestContext.services.feedService.getAllReactionOnPost({
            postId: newUserPostDetails.postId
        })


        // New User logs in
        await TestContext.flows.loginFlow.loginFlow(newUserDetails.contact_number,newUserDetails.sfmm_id,'current user')


        // New User views reaction in post
        await TestContext.services.feedService.getAllReactionOnPost({
            postId: newUserPostDetails.postId
        })

    })
})

