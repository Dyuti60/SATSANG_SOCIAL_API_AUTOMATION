import { TestContext } from "src/context/test.context"

describe('Integration Testing',()=>{

    test('SIT - Logged In User Add / Remove Reaction to Post',async()=>{
        await TestContext.flows.feedFlow.reactToMyPost('friends visibility')
        // Validate data creation in friend request table and friends table
    })

    test('SIT - Logged In User Adds / Remove Reaction to Friends Post',async()=>{
        await TestContext.flows.feedFlow.reactToMyFriendsPost('friends visibility')
        // Validate data creation in friend request table and friends table
    })

    test('SIT - Logged In User Adds / Remove Reaction to fof visibility post of fof',async()=>{
        await TestContext.flows.feedFlow.reactToMyFriendsOfFriendsPost('fof visibility')
        // Validate data creation in friend request table and friends table
    })

    test('SIT - Logged In User Adds / Remove Reaction to public visibility post of non friends',async()=>{
        await TestContext.flows.feedFlow.reactToNonFriendsPost('public')
        // Validate data creation in friend request table and friends table
    })
})