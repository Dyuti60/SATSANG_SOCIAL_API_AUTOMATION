import { TestContext } from "src/context/test.context"

describe('Integration Testing',()=>{

    test('SIT - Logged In User Add / Remove Bookmark to Post',async()=>{
        await TestContext.flows.feedFlow.bookmarkMyNeverBookmarkedPost('friends visibility','add')

        await TestContext.flows.feedFlow.bookmarkMyNeverBookmarkedPost('friends visibility','remove')
        // Validate data creation in friend request table and friends table
    })

    test('SIT - Logged In User Adds / Remove Bookmark to Friends Post',async()=>{
        await TestContext.flows.feedFlow.bookmarkNeverBookmarkedFriendsPost('friends visibility','add')

        await TestContext.flows.feedFlow.bookmarkNeverBookmarkedFriendsPost('friends visibility','remove')
        // Validate data creation in friend request table and friends table
    })

    test('SIT - Logged In User Adds / Remove Bookmark to fof visibility post of fof',async()=>{
        await TestContext.flows.feedFlow.bookmarkNeverBookmarkedMyFriendsOfFriendsPost('friends visibility','add')

        await TestContext.flows.feedFlow.bookmarkNeverBookmarkedMyFriendsOfFriendsPost('friends visibility','remove')
        // Validate data creation in friend request table and friends table
    })

    test('SIT - Logged In User Adds / Remove Bookmark to public visibility post of non friends',async()=>{
        await TestContext.flows.feedFlow.bookmarkNeverBookmarkedOtherNonFriendsPost('friends visibility','add')

        await TestContext.flows.feedFlow.bookmarkNeverBookmarkedOtherNonFriendsPost('friends visibility','remove')
        // Validate data creation in friend request table and friends table
    })
})