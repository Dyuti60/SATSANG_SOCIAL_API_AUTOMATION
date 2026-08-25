
// Test Friends Visibility Only

import { TestContext } from "src/context/test.context"
import { FeedFactory } from "testdata/factory/feed.factory"
import { getRandomJpegFile } from "utils/mediaPicker"
import { AllureHelper } from "utils/allureHelper"

describe('Create Post E2E Flow',()=>{

    test('Create Post With Friends Visibility E2E Flow',async()=>{

        let user1FeedResponse:any, user2FeedResponse:any
        let user1Id: string, user1: any, user2Id: string, user2: any

        //Step 1: Register User 1 And have user details
        await AllureHelper.step('Register User 1 And have user details',
            async()=>{
                TestContext.activeUser='current'
                await TestContext.flows.registrationFlow.registerUserFlow()
                user1Id= TestContext.currentMemuuid
                user1 = await TestContext.flows.userFlow.getParticularUserDetails(user1Id)
            }
        )


        //User1 Logs in
        await AllureHelper.step('User1 Logs in',
            async()=>{
                await TestContext.flows.loginFlow.loginFlow(user1.contact_number,user1Id,'current user')
            }
        )

        //Step 2: User 1 creates post with friends visibility
        // const user1PostDetails = await TestContext.flows.feedFlow.createPostWithMyPostMedia('friends visibility')
        await AllureHelper.step('User 1 creates post with friends visibility',
            async()=>{
                const {mediaIds} = await TestContext.flows.feedFlow.postMediaUpload([getRandomJpegFile()])
                const payload = FeedFactory.buildPostPayload({mediaIds})
                await TestContext.services.feedService.createPost(payload)
            }
        )


        //Step 3: User 1 post only comes in user 1 feed
        await AllureHelper.step('User 1 post only comes in user 1 feed',
            async()=>{
                user1FeedResponse = await TestContext.flows.feedFlow.getAllFeedOfUser()
            }
        )
        

        //Step 4: Register User 2 And have user details
        await AllureHelper.step('Register User 2 And have user details',
            async()=>{
                TestContext.activeUser='current'
                await TestContext.flows.registrationFlow.registerUserFlow()
                user2Id= TestContext.currentMemuuid
                user2 = await TestContext.flows.userFlow.getParticularUserDetails(user2Id)
            }
        )


        //User2 Logs in
        await AllureHelper.step('User2 Logs in',
            async()=>{
                await TestContext.flows.loginFlow.loginFlow(user2.contact_number,user2Id,'current user')
            }
        )
        

        //Step 5: User 2 shouldnt have post in feed
        await AllureHelper.step('User 2 shouldnt have post in feed',
            async()=>{
                user2FeedResponse = await TestContext.flows.feedFlow.getAllFeedOfUser()
            }
        )
        

        //Step 6: User 2 creates post with friends visibility
        // const user2PostDetails = await TestContext.flows.feedFlow.createPostWithMyPostMedia('friends visibility')
        await AllureHelper.step('User 2 creates post with friends visibility',
            async()=>{
                const media2 = await TestContext.flows.feedFlow.postMediaUpload([getRandomJpegFile()])
                const payload2 = FeedFactory.buildPostPayload({mediaIds:media2.mediaIds})
                await TestContext.services.feedService.createPost(payload2)
            }
        )
        
        
        //Step 7: User 2 sends friend request to User 1
        await AllureHelper.step('User 2 sends friend request to User 1',
            async()=>{
                await TestContext.services.userService.sendFriendRequest({
                    friendId: user1Id
                })
            }
        )


        //Step 8: User 1 accepts friend request of User 2
        await AllureHelper.step('User 1 accepts friend request of User 2',
            async()=>{
                await TestContext.flows.loginFlow.loginFlow(user1.contact_number,user1Id,'current user')
                await TestContext.services.userService.acceptFriendRequest({
                    friendId: user2Id
                })
            }
        )


        //Step 9: User 1 has post of user 2 in feed
        await AllureHelper.step('User 1 has post of user 2 in feed',
            async()=>{
                user1FeedResponse = await TestContext.flows.feedFlow.getAllFeedOfUser()
            }
        )
        


        //Step 10: User 1 sends and become friend of logged in user
        await AllureHelper.step('User 1 sends and become friend of logged in user',
            async()=>{
                await TestContext.services.userService.sendFriendRequest({
                    friendId: TestContext.initialMemuuid
                })
                TestContext.activeUser='initial'
                await TestContext.services.userService.acceptFriendRequest({
                    friendId: user1Id
                })
            }
        )


        //Step 11: User 1 sends and become friend of friends of friend user
        await AllureHelper.step('User 1 sends and become friend of friends of friend user',
            async()=>{
                TestContext.activeUser='current'
                const fofUserId = await TestContext.services.feedRepo.getMyFriendsOfFriendsRandomPostWithFriendsVisibility(user1Id)
                
                await TestContext.services.userService.sendFriendRequest({
                    friendId: fofUserId.userId
                })

                const fofDetails = await TestContext.flows.userFlow.getParticularUserDetails(fofUserId.userId)

                await TestContext.flows.loginFlow.loginFlow(fofDetails.contact_number,fofUserId.userId,'current user')
                await TestContext.services.userService.acceptFriendRequest({
                    friendId: user1Id
                })
            }
        )



        //Step 12: User 1 has posts of logged in user and fof user and user 2 in feed
        await AllureHelper.step('User 1 has posts of logged in user and fof user and user 2 in feed',
            async()=>{
                await TestContext.flows.loginFlow.loginFlow(user1.contact_number,user1Id,'current user')
                user1FeedResponse = await TestContext.flows.feedFlow.getAllFeedOfUser()
            }
        )
        

        //Step 13: User 2 has post of user 1 in feed
        await AllureHelper.step('User 2 has post of user 1 in feed',
            async()=>{
                await TestContext.flows.loginFlow.loginFlow(user2.contact_number,user2Id,'current user')
                user2FeedResponse = await TestContext.flows.feedFlow.getAllFeedOfUser()
            }
        )
        

        //Step 14: User 2 deletes user 2 from friend list
        await AllureHelper.step('User 2 deletes user 2 from friend list',
            async()=>{
                await TestContext.services.userService.deleteFriend({
                    friendId: user1Id
                })
            }
        )


        //Step 15: User 2 has no post of user 2
        await AllureHelper.step('User 2 has no post of user 1',
            async()=>{
                user2FeedResponse = await TestContext.flows.feedFlow.getAllFeedOfUser()
            }
        )
        

        //Step 16: User 1 has no post of user 2
        await AllureHelper.step('User 1 has no post of user 2',
            async()=>{
                await TestContext.flows.loginFlow.loginFlow(user1.contact_number,user1Id,'current user')
                user1FeedResponse = await TestContext.flows.feedFlow.getAllFeedOfUser()
            }
        )

    })
})
