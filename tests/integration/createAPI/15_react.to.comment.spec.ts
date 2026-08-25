import { TestContext } from "src/context/test.context"

describe('Integration Testing',()=>{

    test('SIT - Logged In User Add / Remove reaction to comments on Post',async()=>{
        await TestContext.flows.feedFlow.reactToMyCommentOnMyPosts('friends visibility')
        // Validate data creation in friend request table and friends table
    })

    test('SIT - Logged In User Adds / Remove reaction to comments on Friends Post',async()=>{
        await TestContext.flows.feedFlow.reactToMyCommentOnMyFriendsPost('friends visibility')
        // Validate data creation in friend request table and friends table
    })

    test('SIT - Logged In User Adds / Remove reaction to comments on fof visibility post of fof',async()=>{
        await TestContext.flows.feedFlow.reactToMyCommentOnMyFriendsOfFriendsPost('fof visibility')
        // Validate data creation in friend request table and friends table
    })

    test('SIT - Logged In User Adds / Remove reaction to comments on public visibility post of non friends',async()=>{
        await TestContext.flows.feedFlow.reactToMyCommentOnMyFriendsOfFriendsPost('public')
        // Validate data creation in friend request table and friends table
    })
})