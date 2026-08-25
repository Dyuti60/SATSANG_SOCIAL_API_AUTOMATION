import { TestContext } from "src/context/test.context"

describe('Integration Testing',()=>{

    test('SIT - Logged In User Add Comment to Post',async()=>{
        await TestContext.flows.feedFlow.addCommentToMyPosts('friends visibility')
        // Validate data creation in friend request table and friends table
    })

    test('SIT - Logged In User Adds Comment to Friends Post',async()=>{
        await TestContext.flows.feedFlow.addCommentToMyFriendsPost('friends visibility')
        // Validate data creation in friend request table and friends table
    })

    test('SIT - Logged In User Adds Comment to fof visibility post of fof',async()=>{
        await TestContext.flows.feedFlow.addCommentToMyFriendsOfFriendsPost('fof visibility')
        // Validate data creation in friend request table and friends table
    })

    test('SIT - Logged In User Adds Comment to public visibility post of non friends',async()=>{
        await TestContext.flows.feedFlow.addCommentToOtherNonFriendsPost('public')
        // Validate data creation in friend request table and friends table
    })
})