import ResponseValidator from "api/response.validator";
import { TestContext } from "src/context/test.context";
import { FeedFactory } from "testdata/factory/feed.factory";
import Log from "utils/logger";

describe('Bulk Other Comment Creation',()=>{

    describe('Add My Friends Comment To My Post',()=>{

        test('Add My Friends Comment To My - Public Post',async()=>{
            const TOTAL = 1;
            let count = 0
            while(count<TOTAL){
                Log.info("###################################################################################");
                Log.info(`Add Comment To My - Public Post - ${count + 1}/${TOTAL}`);
                Log.info("###################################################################################");
                
                const {friendId} = await TestContext.flows.userFlow.getRandomFriendOfParticularUser()
                const {contact_number} = await TestContext.flows.userFlow.getParticularUserDetails(friendId)
                TestContext.activeUser='current'
                await TestContext.flows.loginFlow.loginFlow(contact_number,friendId,'current user')
                const {postId} = await TestContext.services.feedRepo.getMyRandomPublicPost(TestContext.initialMemuuid)
                const payload = FeedFactory.buildPostCommentPayload({
                    postId
                })
                const {response} = await TestContext.services.feedService.placeCommentToAPost(payload)
                await ResponseValidator.validateStatus(response,201)
                count++
            }
        })
        test('Add My Friends Comment To My - Hidden Post',async()=>{
            const TOTAL = 1;
            let count = 0
            while(count<TOTAL){
                Log.info("###################################################################################");
                Log.info(`Add Comment To My - Public Post - ${count + 1}/${TOTAL}`);
                Log.info("###################################################################################");
                
                const {friendId} = await TestContext.flows.userFlow.getRandomFriendOfParticularUser()
                const {contact_number} = await TestContext.flows.userFlow.getParticularUserDetails(friendId)
                TestContext.activeUser='current'
                await TestContext.flows.loginFlow.loginFlow(contact_number,friendId,'current user')
                const {postId} = await TestContext.services.feedRepo.getMyRandomHiddenPost(TestContext.initialMemuuid)
                const payload = FeedFactory.buildPostCommentPayload({
                    postId
                })
                const {response} = await TestContext.services.feedService.placeCommentToAPost(payload)
                await ResponseValidator.validateStatus(response,201)
                count++
            }
        })
        test('Add My Friends Comment To My - Deleted Post',async()=>{
            const TOTAL = 1;
            let count = 0
            while(count<TOTAL){
                Log.info("###################################################################################");
                Log.info(`Add Comment To My - Public Post - ${count + 1}/${TOTAL}`);
                Log.info("###################################################################################");
                
                const {friendId} = await TestContext.flows.userFlow.getRandomFriendOfParticularUser()
                const {contact_number} = await TestContext.flows.userFlow.getParticularUserDetails(friendId)
                TestContext.activeUser='current'
                await TestContext.flows.loginFlow.loginFlow(contact_number,friendId,'current user')
                const {postId} = await TestContext.services.feedRepo.getMyRandomDeletedPost(TestContext.initialMemuuid)
                const payload = FeedFactory.buildPostCommentPayload({
                    postId
                })
                const {response} = await TestContext.services.feedService.placeCommentToAPost(payload)
                await ResponseValidator.validateStatus(response,201)
                count++
            }
        })
        test('Add My Friends Comment To My - Friends Visibility Post',async()=>{
            const TOTAL = 1;
            let count = 0
            while(count<TOTAL){
                Log.info("###################################################################################");
                Log.info(`Add Comment To My - Public Post - ${count + 1}/${TOTAL}`);
                Log.info("###################################################################################");
                
                const {friendId} = await TestContext.flows.userFlow.getRandomFriendOfParticularUser()
                const {contact_number} = await TestContext.flows.userFlow.getParticularUserDetails(friendId)
                TestContext.activeUser='current'
                await TestContext.flows.loginFlow.loginFlow(contact_number,friendId,'current user')
                const {postId} = await TestContext.services.feedRepo.getMyRandomPostWithFriendsVisibility(TestContext.initialMemuuid)
                const payload = FeedFactory.buildPostCommentPayload({
                    postId
                })
                const {response} = await TestContext.services.feedService.placeCommentToAPost(payload)
                await ResponseValidator.validateStatus(response,201)
                count++
            }
        })
        test('Add My Friends Comment To My - Friends of Friends Visibility Post',async()=>{
            const TOTAL = 1;
            let count = 0
            while(count<TOTAL){
                Log.info("###################################################################################");
                Log.info(`Add Comment To My - Public Post - ${count + 1}/${TOTAL}`);
                Log.info("###################################################################################");
                
                const {friendId} = await TestContext.flows.userFlow.getRandomFriendOfParticularUser()
                const {contact_number} = await TestContext.flows.userFlow.getParticularUserDetails(friendId)
                TestContext.activeUser='current'
                await TestContext.flows.loginFlow.loginFlow(contact_number,friendId,'current user')
                const {postId} = await TestContext.services.feedRepo.getMyRandomPostWithFriendsOfFriendVisibility(TestContext.initialMemuuid)
                const payload = FeedFactory.buildPostCommentPayload({
                    postId
                })
                const {response} = await TestContext.services.feedService.placeCommentToAPost(payload)
                await ResponseValidator.validateStatus(response,201)
                count++
            }
        })
    })



    describe('Add My Friends Friend Comment To My Post',()=>{

        test('Add My Friends Friend Comment To My - Public Post',async()=>{
            const TOTAL = 1;
            let count = 0
            while(count<TOTAL){
                Log.info("###################################################################################");
                Log.info(`Add My Friends Friend Comment To My - Public Post - ${count + 1}/${TOTAL}`);
                Log.info("###################################################################################");
                
                const {friendId} = await TestContext.flows.userFlow.getRandomFriendsOfFriendOfParticularUser()
                const {contact_number} = await TestContext.flows.userFlow.getParticularUserDetails(friendId)
                TestContext.activeUser='current'
                await TestContext.flows.loginFlow.loginFlow(contact_number,friendId,'current user')
                const {postId} = await TestContext.services.feedRepo.getMyRandomPublicPost(TestContext.initialMemuuid)
                const payload = FeedFactory.buildPostCommentPayload({
                    postId
                })
                const {response} = await TestContext.services.feedService.placeCommentToAPost(payload)
                await ResponseValidator.validateStatus(response,201)
                count++
            }
        })
        test('Add My Friends Friend Comment To My - Hidden Post',async()=>{
            const TOTAL = 1;
            let count = 0
            while(count<TOTAL){
                Log.info("###################################################################################");
                Log.info(`Add My Friends Friend Comment To My - Public Post - ${count + 1}/${TOTAL}`);
                Log.info("###################################################################################");
                
                const {friendId} = await TestContext.flows.userFlow.getRandomFriendsOfFriendOfParticularUser()
                const {contact_number} = await TestContext.flows.userFlow.getParticularUserDetails(friendId)
                TestContext.activeUser='current'
                await TestContext.flows.loginFlow.loginFlow(contact_number,friendId,'current user')
                const {postId} = await TestContext.services.feedRepo.getMyRandomHiddenPost(TestContext.initialMemuuid)
                const payload = FeedFactory.buildPostCommentPayload({
                    postId
                })
                const {response} = await TestContext.services.feedService.placeCommentToAPost(payload)
                await ResponseValidator.validateStatus(response,201)
                count++
            }
        })
        test('Add My Friends Friend Comment To My - Deleted Post',async()=>{
            const TOTAL = 1;
            let count = 0
            while(count<TOTAL){
                Log.info("###################################################################################");
                Log.info(`Add My Friends Friend Comment To My - Public Post - ${count + 1}/${TOTAL}`);
                Log.info("###################################################################################");
                
                const {friendId} = await TestContext.flows.userFlow.getRandomFriendsOfFriendOfParticularUser()
                const {contact_number} = await TestContext.flows.userFlow.getParticularUserDetails(friendId)
                TestContext.activeUser='current'
                await TestContext.flows.loginFlow.loginFlow(contact_number,friendId,'current user')
                const {postId} = await TestContext.services.feedRepo.getMyRandomDeletedPost(TestContext.initialMemuuid)
                const payload = FeedFactory.buildPostCommentPayload({
                    postId
                })
                const {response} = await TestContext.services.feedService.placeCommentToAPost(payload)
                await ResponseValidator.validateStatus(response,201)
                count++
            }
        })
        test('Add My Friends Friend Comment To My - Friends Visibility Post',async()=>{
            const TOTAL = 1;
            let count = 0
            while(count<TOTAL){
                Log.info("###################################################################################");
                Log.info(`Add My Friends Friend Comment To My - Public Post - ${count + 1}/${TOTAL}`);
                Log.info("###################################################################################");
                
                const {friendId} = await TestContext.flows.userFlow.getRandomFriendsOfFriendOfParticularUser()
                const {contact_number} = await TestContext.flows.userFlow.getParticularUserDetails(friendId)
                TestContext.activeUser='current'
                await TestContext.flows.loginFlow.loginFlow(contact_number,friendId,'current user')
                const {postId} = await TestContext.services.feedRepo.getMyRandomPostWithFriendsVisibility(TestContext.initialMemuuid)
                const payload = FeedFactory.buildPostCommentPayload({
                    postId
                })
                const {response} = await TestContext.services.feedService.placeCommentToAPost(payload)
                await ResponseValidator.validateStatus(response,201)
                count++
            }
        })
        test('Add My Friends Friend Comment To My - Friends of Friends Visibility Post',async()=>{
            const TOTAL = 1;
            let count = 0
            while(count<TOTAL){
                Log.info("###################################################################################");
                Log.info(`Add My Friends Friend Comment To My - Public Post - ${count + 1}/${TOTAL}`);
                Log.info("###################################################################################");
                
                const {friendId} = await TestContext.flows.userFlow.getRandomFriendsOfFriendOfParticularUser()
                const {contact_number} = await TestContext.flows.userFlow.getParticularUserDetails(friendId)
                TestContext.activeUser='current'
                await TestContext.flows.loginFlow.loginFlow(contact_number,friendId,'current user')
                const {postId} = await TestContext.services.feedRepo.getMyRandomPostWithFriendsOfFriendVisibility(TestContext.initialMemuuid)
                const payload = FeedFactory.buildPostCommentPayload({
                    postId
                })
                const {response} = await TestContext.services.feedService.placeCommentToAPost(payload)
                await ResponseValidator.validateStatus(response,201)
                count++
            }
        })
    })

    describe('Add Non Friends Comment To My Post',()=>{

        test('Add Non Friends Comment To My - Public Post',async()=>{
            const TOTAL = 1;
            let count = 0
            while(count<TOTAL){
                Log.info("###################################################################################");
                Log.info(`Add My Friends Friend Comment To My - Public Post - ${count + 1}/${TOTAL}`);
                Log.info("###################################################################################");
                
                const {friendId} = await TestContext.flows.userFlow.getRandomNonFriendOfParticularUser()
                const {contact_number} = await TestContext.flows.userFlow.getParticularUserDetails(friendId)
                TestContext.activeUser='current'
                await TestContext.flows.loginFlow.loginFlow(contact_number,friendId,'current user')
                const {postId} = await TestContext.services.feedRepo.getMyRandomPublicPost(TestContext.initialMemuuid)
                const payload = FeedFactory.buildPostCommentPayload({
                    postId
                })
                const {response} = await TestContext.services.feedService.placeCommentToAPost(payload)
                await ResponseValidator.validateStatus(response,201)
                count++
            }
        })
    })
})