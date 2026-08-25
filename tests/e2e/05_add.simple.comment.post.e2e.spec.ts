import { TestContext } from "src/context/test.context"

describe('Comment - E2E Flow',()=>{
// Add Simple Comment In Post
    test('Add Simple Comment In Post With Friends Visibility - E2E Flow',async()=>{

        // New User Creates A Post with friends visibility
        TestContext.activeUser='current'
        await TestContext.flows.registrationFlow.registerUserFlow()
        const newUserDetails = await TestContext.flows.userFlow.getParticularUserDetails(TestContext.currentMemuuid)
        await TestContext.flows.feedFlow.createPostWithMyPostMedia('friends visibility')
        const newUserPostDetails = await TestContext.services.feedRepo.getMyRandomPostWithFriendsVisibility(TestContext.currentMemuuid)


        // New User Adds Comment To Users Post
        await TestContext.services.feedService.placeCommentToAPost({
            postId: newUserPostDetails.postId,
            content: `Comment Added By ${TestContext.currentFirstName} ${TestContext.currentLastName}` 
        })
        
        // New User Views Comment Added To Users Post
        await TestContext.services.feedService.getCommentOnPost({
            postId:newUserPostDetails.postId
        })

        // Logged In User becomes friend of new user
        await TestContext.services.userService.sendFriendRequest({
            friendId: TestContext.initialMemuuid
        })

        TestContext.activeUser='initial'
        await TestContext.services.userService.acceptFriendRequest({
            friendId: TestContext.currentMemuuid
        })

        // Logged In User Views Comment Added In Users Post
        await TestContext.services.feedService.getCommentOnPost({
            postId:newUserPostDetails.postId
        })

        // Logged In User Adds Comment In New Users Post (Once Friend)
        await TestContext.services.feedService.placeCommentToAPost({
            postId: newUserPostDetails.postId,
            content: `Comment Added By ${TestContext.initialFirstName} ${TestContext.initialLastName}` 
        })

        // Logged In User Views Comment Added In Users Post
        await TestContext.services.feedService.getCommentOnPost({
            postId:newUserPostDetails.postId
        })

        // New User Views Comment
        TestContext.activeUser='current'
        await TestContext.services.feedService.getCommentOnPost({
            postId:newUserPostDetails.postId
        })

        // New Users - Friends of Friend Adds comment 
        const fofId = await TestContext.services.userRepo.getValidFriendsOfFriendId(TestContext.currentMemuuid)
        const fofIdDetails = await TestContext.flows.userFlow.getParticularUserDetails(fofId.friendId)
        await TestContext.flows.loginFlow.loginFlow(fofIdDetails.contact_number,fofId.friendId,'current user')
        await TestContext.services.feedService.placeCommentToAPost({
            postId: newUserPostDetails.postId,
            content: `Comment Added By fof ${fofId.friendId}` 
        })

        // Friend of friend of new user views New Users posts comments
        await TestContext.services.feedService.getCommentOnPost({
            postId:newUserPostDetails.postId
        })

        // New Users - Non Social Adds comment
        const nfId = await TestContext.services.userRepo.getRandomNonSocialFriendId(TestContext.currentMemuuid)
        const nfIdDetails = await TestContext.flows.userFlow.getParticularUserDetails(nfId)
        await TestContext.flows.loginFlow.loginFlow(nfIdDetails.contact_number,nfId,'current user')
        await TestContext.services.feedService.placeCommentToAPost({
            postId: newUserPostDetails.postId,
            content: `Comment Added By non social friend ${nfId}` 
        })

        // Non friend of new user views New Users posts comments
        await TestContext.services.feedService.getCommentOnPost({
            postId:newUserPostDetails.postId
        })

        // New User logs in
        await TestContext.flows.loginFlow.loginFlow(newUserDetails.contact_number,newUserDetails.sfmm_id,'current user')
        
        // New User Views Comment Added To Users Post
        await TestContext.services.feedService.getCommentOnPost({
            postId:newUserPostDetails.postId
        })
    })
})

















// Friends of Friends views comment

// New User views comment

// New Users - Non Social Adds comment

// Non Social views comment

// New User views comment
