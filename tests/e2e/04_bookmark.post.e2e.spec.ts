import { TestContext } from "src/context/test.context"
import { getRandomJpegFile } from "utils/mediaPicker"

describe('Add And Remove Bookmark E2E Flow',()=>{
    
    // New User creates A Post Add Bookmark, remove bookmark, view bookmark, add bookmarks, view bookmark, remove bookmark, view bookmark
    test('Add And Remove My Post With Friends Visibility- Bookmark E2E',async()=>{
        
        // Step 1: New User registers and logs in
        TestContext.activeUser='current'
        await TestContext.flows.registrationFlow.registerUserFlow()
        const newUserDetails = await TestContext.flows.userFlow.getParticularUserDetails(TestContext.currentMemuuid)

        // Step 2: New User Creates Post with friends visibility
        TestContext.activeUser='current'
        await TestContext.flows.feedFlow.createPostWithMyNewPostMedia([getRandomJpegFile()],202)

        // Step 3: Remove Bookmark
        const postDetails = await TestContext.services.feedRepo.getMyRandomNeverBookmarkedPost(TestContext.initialMemuuid,'friends visibility')
        await TestContext.services.feedService.removePostFromBookmark({
            postId: postDetails.postId
        })

        // Step 4: View Bookmark
        await TestContext.services.feedService.getBookmarkedPosts({pageNo:1})

        // Step 5: Adds Bookmarks
        await TestContext.services.feedService.bookmarkAPost({
            postId: postDetails.postId
        })

        // Step 6: View Bookmark
        await TestContext.services.feedService.getBookmarkedPosts({pageNo:1})

        // Step 7: Remove Bookmark
        await TestContext.services.feedService.removePostFromBookmark({
            postId: postDetails.postId
        })

        // Step 8: View Bookmark
        await TestContext.services.feedService.getBookmarkedPosts({pageNo:1})

    })

    
    // Logged In user creates a post, New User (friend) removes bookmark, view bookmark, add bookmarks, view bookmark, remove bookmark, view bookmark
    test('Add And Remove My Post With Friends Visibility- Bookmark E2E',async()=>{
        
        // Step 1: New User registers and logs in
        TestContext.activeUser='current'
        await TestContext.flows.registrationFlow.registerUserFlow()
        const newUserDetails = await TestContext.flows.userFlow.getParticularUserDetails(TestContext.currentMemuuid)

        // Step 2.2: New User Sends request to logged in user
        await TestContext.services.userService.sendFriendRequest({
            friendId: TestContext.initialMemuuid
        })

        // Step 2.3: Get post of logged in user which is never bookmarked
        const postDetails = await TestContext.services.feedRepo.getMyRandomNeverBookmarkedPost(TestContext.initialMemuuid,'friends visibility')
        
        // Step 3: New User Removes Bookmark
        await TestContext.services.feedService.removePostFromBookmark({
            postId: postDetails.postId
        })

        // Step 3.1: Logged In User accepts friend request of the new user
        TestContext.activeUser='initial'
        await TestContext.services.userService.acceptFriendRequest({
            friendId: TestContext.currentMemuuid
        })


        // Step 4: View Bookmark
        TestContext.activeUser='current'
        await TestContext.services.feedService.getBookmarkedPosts({pageNo:1})

        // Step 5: Adds Bookmarks
        await TestContext.services.feedService.bookmarkAPost({
            postId: postDetails.postId
        })

        // Step 6: View Bookmark
        await TestContext.services.feedService.getBookmarkedPosts({pageNo:1})

        // Step 7: Remove Bookmark
        await TestContext.services.feedService.removePostFromBookmark({
            postId: postDetails.postId
        })

        // Step 8: View Bookmark
        await TestContext.services.feedService.getBookmarkedPosts({pageNo:1})

        // Step 9: Adds Bookmarks
        await TestContext.services.feedService.bookmarkAPost({
            postId: postDetails.postId
        })

        // Step 10: View Bookmark
        await TestContext.services.feedService.getBookmarkedPosts({pageNo:1})

    })

    // New user creates a post, friends of friend removes bookmark,  view bookmark, add bookmarks, view bookmark, remove bookmark, view bookmark
    test('Add And Remove My Friends Of Friends Post With Friends Visibility- Bookmark E2E',async()=>{
        
        // Step 1: New User registers and logs in
        TestContext.activeUser='current'
        await TestContext.flows.registrationFlow.registerUserFlow()
        const newUserDetails = await TestContext.flows.userFlow.getParticularUserDetails(TestContext.currentMemuuid)

        // Step 2.2: New User Sends request to logged in user
        await TestContext.services.userService.sendFriendRequest({
            friendId: TestContext.initialMemuuid
        })

        // Step 2.3: Logged In User accepts friend request of the new user
        TestContext.activeUser='initial'
        await TestContext.services.userService.acceptFriendRequest({
            friendId: TestContext.currentMemuuid
        })

        // Step 2.4: Get Never Bookmarked Post of friends of friends
        TestContext.activeUser='current'
        const {postId} = await TestContext.services.feedRepo.getMyFriendsFriendsRandomNeverBookmarkedPost(TestContext.currentMemuuid,'friends visibility')

        // Step 4: View Bookmark
        await TestContext.services.feedService.getBookmarkedPosts({pageNo:1})

        // Step 5: Adds Bookmarks
        await TestContext.services.feedService.bookmarkAPost({
            postId: postId
        })

        // Step 6: View Bookmark
        await TestContext.services.feedService.getBookmarkedPosts({pageNo:1})

        // Step 7: Remove Bookmark
        await TestContext.services.feedService.removePostFromBookmark({
            postId: postId
        })

        // Step 8: View Bookmark
        await TestContext.services.feedService.getBookmarkedPosts({pageNo:1})

        // Step 9: Add Bookmark
        await TestContext.services.feedService.bookmarkAPost({
            postId: postId
        })

        // Step 10: Remove Bookmark
        await TestContext.services.feedService.removePostFromBookmark({
            postId: postId
        })
    })

    // New use creates a post, non social friend remove bookmark,  view bookmark, add bookmarks, view bookmark, remove bookmark, view bookmark
    test('Add And Remove My Non Friends Post With Friends Visibility- Bookmark E2E',async()=>{
        
        // Step 1: New User registers and logs in
        TestContext.activeUser='current'
        await TestContext.flows.registrationFlow.registerUserFlow()
        const newUserDetails = await TestContext.flows.userFlow.getParticularUserDetails(TestContext.currentMemuuid)


        // Step 2: Never Bookmarked Non Social Post
        const {postId} = await TestContext.services.feedRepo.getMyNonFriendsRandomNeverBookmarkedPost(TestContext.currentMemuuid,'friends visibility')

        // Step 4: View Bookmark
        await TestContext.services.feedService.getBookmarkedPosts({pageNo:1})

        // Step 5: Adds Bookmarks
        await TestContext.services.feedService.bookmarkAPost({
            postId: postId
        })

        // Step 6: View Bookmark
        await TestContext.services.feedService.getBookmarkedPosts({pageNo:1})

        // Step 7: Remove Bookmark
        await TestContext.services.feedService.removePostFromBookmark({
            postId: postId
        })

        // Step 8: View Bookmark
        await TestContext.services.feedService.getBookmarkedPosts({pageNo:1})

        // Step 9: Add Bookmark
        await TestContext.services.feedService.bookmarkAPost({
            postId: postId
        })

        // Step 10: Remove Bookmark
        await TestContext.services.feedService.removePostFromBookmark({
            postId: postId
        })
    })
})




