import ResponseValidator from "api/response.validator"
import { TestContext } from "src/context/test.context"
import Log from "utils/logger"

describe('Bulk Bookmark Add',()=>{

    describe('Logged In User Bookmarks His Post',()=>{
        test('Bookmark My Public Post',async()=>{
            const TOTAL = 1;
            let count = 0
            while(count<TOTAL){
                Log.info("###################################################################################");
                Log.info(`Bookmark My Public Post - ${count + 1}/${TOTAL}`);
                Log.info("###################################################################################");
                
                const {postId} = await TestContext.services.feedRepo.getMyRandomPublicPost(TestContext.initialMemuuid)
                const {response} = await TestContext.services.feedService.bookmarkAPost({postId})
                await ResponseValidator.validateStatus(response, 201)
                count++
            }
        })

        test('Bookmark My Hidden Post',async()=>{
            const TOTAL = 5;
            let count = 0
            while(count<TOTAL){
                Log.info("###################################################################################");
                Log.info(`Bookmark My Hidden Post - ${count + 1}/${TOTAL}`);
                Log.info("###################################################################################");
                
                const {postId} = await TestContext.services.feedRepo.getMyRandomHiddenPost(TestContext.initialMemuuid)
                const {response} = await TestContext.services.feedService.bookmarkAPost({postId})
                await ResponseValidator.validateStatus(response, 201)
                count++
            }
        })
        test('Bookmark My Deleted Post',async()=>{
            const TOTAL = 5;
            let count = 0
            while(count<TOTAL){
                Log.info("###################################################################################");
                Log.info(`Bookmark My Hidden Post - ${count + 1}/${TOTAL}`);
                Log.info("###################################################################################");
                
                const {postId} = await TestContext.services.feedRepo.getMyRandomDeletedPost(TestContext.initialMemuuid)
                const {response} = await TestContext.services.feedService.bookmarkAPost({postId})
                await ResponseValidator.validateStatus(response, 201)
                count++
            }
        })
        test('Bookmark My Friends Visibility Post',async()=>{
            const TOTAL = 5;
            let count = 0
            while(count<TOTAL){
                Log.info("###################################################################################");
                Log.info(`Bookmark My Friends Visibility Post - ${count + 1}/${TOTAL}`);
                Log.info("###################################################################################");
                const {postId} = await TestContext.services.feedRepo.getMyRandomPostWithFriendsVisibility(TestContext.initialMemuuid)
                const {response} = await TestContext.services.feedService.bookmarkAPost({postId})
                await ResponseValidator.validateStatus(response, 201)
                count++
            }
        })
        test('Bookmark My Friends Friends Visibility Post',async()=>{
            const TOTAL = 5;
            let count = 0
            while(count<TOTAL){
                Log.info("###################################################################################");
                Log.info(`Bookmark My Friends Friend Visibility Post - ${count + 1}/${TOTAL}`);
                Log.info("###################################################################################");
                const {postId} = await TestContext.services.feedRepo.getMyRandomPostWithFriendsOfFriendVisibility(TestContext.initialMemuuid)
                const {response} = await TestContext.services.feedService.bookmarkAPost({postId})
                await ResponseValidator.validateStatus(response, 201)
                count++
            }
        })

    })

    describe('Logged In User Bookmarks His Friends Post',()=>{
        test('Bookmark My Friends - Public Post',async()=>{
            const TOTAL = 5;
            let count = 0
            while(count<TOTAL){
                Log.info("###################################################################################");
                Log.info(`Bookmark My Friends - Public Post - ${count + 1}/${TOTAL}`);
                Log.info("###################################################################################");
                const {postId} = await TestContext.services.feedRepo.getMyFriendsRandomPublicPost(TestContext.initialMemuuid)
                const {response} = await TestContext.services.feedService.bookmarkAPost({postId})
                await ResponseValidator.validateStatus(response, 201)
                count++
            }
        })
        test('Bookmark My Friends - Friend Visibility Post',async()=>{
            const TOTAL = 5;
            let count = 0
            while(count<TOTAL){
                Log.info("###################################################################################");
                Log.info(`Bookmark My Friends - Public Post - ${count + 1}/${TOTAL}`);
                Log.info("###################################################################################");
                const {postId} = await TestContext.services.feedRepo.getMyFriendsRandomPostWithFriendsVisibility(TestContext.initialMemuuid)
                const {response} = await TestContext.services.feedService.bookmarkAPost({postId})
                await ResponseValidator.validateStatus(response, 201)
                count++
            }
        })
        test('Bookmark My Friends - Friend Friend Visibility Post',async()=>{
            const TOTAL = 5;
            let count = 0
            while(count<TOTAL){
                Log.info("###################################################################################");
                Log.info(`Bookmark My Friends - Public Post - ${count + 1}/${TOTAL}`);
                Log.info("###################################################################################");
                const {postId} = await TestContext.services.feedRepo.getMyFriendsRandomPostWithFriendsOfFriendsVisibility(TestContext.initialMemuuid)
                const {response} = await TestContext.services.feedService.bookmarkAPost({postId})
                await ResponseValidator.validateStatus(response, 201)
                count++
            }
        })
    })

    describe('Logged In User Bookmarks His Friends Friend Post',()=>{
        
        test('Bookmark My Friends Friend - Public Post',async()=>{
            const TOTAL = 5;
            let count = 0
            while(count<TOTAL){
                Log.info("###################################################################################");
                Log.info(`Bookmark My Friends - Public Post - ${count + 1}/${TOTAL}`);
                Log.info("###################################################################################");
                const {postId} = await TestContext.services.feedRepo.getMyFriendsOfFriendsRandomPublicPost(TestContext.initialMemuuid)
                const {response} = await TestContext.services.feedService.bookmarkAPost({postId})
                await ResponseValidator.validateStatus(response, 201)
                count++
            }
        })
        test('Bookmark My Friends Friends - Friends Friends Visibility Post',async()=>{
            const TOTAL = 5;
            let count = 0
            while(count<TOTAL){
                Log.info("###################################################################################");
                Log.info(`Bookmark My Friends - Public Post - ${count + 1}/${TOTAL}`);
                Log.info("###################################################################################");
                const {postId} = await TestContext.services.feedRepo.getMyFriendsOfFriendsRandomPostWithFriendsVisibility(TestContext.initialMemuuid)
                const {response} = await TestContext.services.feedService.bookmarkAPost({postId})
                await ResponseValidator.validateStatus(response, 201)
                count++
            }
        })
    })

    describe('Logged In User Bookmarks His Non Friends Post',()=>{
        test('Bookmark My Non Friends - Public Post',async()=>{
            const TOTAL = 5;
            let count = 0
            while(count<TOTAL){
                Log.info("###################################################################################");
                Log.info(`Bookmark My Friends - Public Post - ${count + 1}/${TOTAL}`);
                Log.info("###################################################################################");
                const {postId} = await TestContext.services.feedRepo.getMyNonFriendsRandomPublicPost(TestContext.initialMemuuid)
                const {response} = await TestContext.services.feedService.bookmarkAPost({postId})
                await ResponseValidator.validateStatus(response, 201)
                count++
            }
        })
    })

    describe('Logged In Users - Friend - Logs In Bookmark His Post',()=>{
        test('Bookmark Public Post',async()=>{
            const TOTAL = 5;
            let count = 0
            while(count<TOTAL){
                Log.info("###################################################################################");
                Log.info(`Bookmark My Friends - Public Post - ${count + 1}/${TOTAL}`);
                Log.info("###################################################################################");
                const {postId, userId} = await TestContext.services.feedRepo.getMyFriendsRandomPublicPost(TestContext.initialMemuuid)
                const {contact_number} = await TestContext.flows.userFlow.getParticularUserDetails(userId)
                TestContext.activeUser='current'
                await TestContext.flows.loginFlow.loginFlow(contact_number,userId,'current user')
                const {response} = await TestContext.services.feedService.bookmarkAPost({postId})
                await ResponseValidator.validateStatus(response, 201)
                count++
            }
        })
        test('Bookmark Hidden Post',async()=>{
            const TOTAL = 5;
            let count = 0
            while(count<TOTAL){
                Log.info("###################################################################################");
                Log.info(`Bookmark My Friends - Public Post - ${count + 1}/${TOTAL}`);
                Log.info("###################################################################################");
                const {postId, userId} = await TestContext.services.feedRepo.getMyFriendsRandomHiddenPost(TestContext.initialMemuuid)
                const {contact_number} = await TestContext.flows.userFlow.getParticularUserDetails(userId)
                TestContext.activeUser='current'
                await TestContext.flows.loginFlow.loginFlow(contact_number,userId,'current user')
                const {response} = await TestContext.services.feedService.bookmarkAPost({postId})
                await ResponseValidator.validateStatus(response, 201)
                count++
            }
        })
        test('Bookmark Friends Visibility Post',async()=>{
            const TOTAL = 5;
            let count = 0
            while(count<TOTAL){
                Log.info("###################################################################################");
                Log.info(`Bookmark My Friends - Public Post - ${count + 1}/${TOTAL}`);
                Log.info("###################################################################################");
                const {postId, userId} = await TestContext.services.feedRepo.getMyFriendsRandomPostWithFriendsVisibility(TestContext.initialMemuuid)
                const {contact_number} = await TestContext.flows.userFlow.getParticularUserDetails(userId)
                TestContext.activeUser='current'
                await TestContext.flows.loginFlow.loginFlow(contact_number,userId,'current user')
                const {response} = await TestContext.services.feedService.bookmarkAPost({postId})
                await ResponseValidator.validateStatus(response, 201)
                count++
            }
        })
        test('Bookmark Friends Friends Visibility Post',async()=>{
            const TOTAL = 5;
            let count = 0
            while(count<TOTAL){
                Log.info("###################################################################################");
                Log.info(`Bookmark My Friends - Public Post - ${count + 1}/${TOTAL}`);
                Log.info("###################################################################################");
                const {postId, userId} = await TestContext.services.feedRepo.getMyFriendsRandomPostWithFriendsOfFriendsVisibility(TestContext.initialMemuuid)
                const {contact_number} = await TestContext.flows.userFlow.getParticularUserDetails(userId)
                TestContext.activeUser='current'
                await TestContext.flows.loginFlow.loginFlow(contact_number,userId,'current user')
                const {response} = await TestContext.services.feedService.bookmarkAPost({postId})
                await ResponseValidator.validateStatus(response, 201)
                count++
            }
        })
    })

    describe('Logged In Users - Friends friend - Logs In Bookmark His Post',()=>{
        test('Bookmark Public Post',async()=>{
            const TOTAL = 5;
            let count = 0
            while(count<TOTAL){
                Log.info("###################################################################################");
                Log.info(`Bookmark My Friends - Public Post - ${count + 1}/${TOTAL}`);
                Log.info("###################################################################################");
                const {postId, userId} = await TestContext.services.feedRepo.getMyFriendsOfFriendsRandomPublicPost(TestContext.initialMemuuid)
                const {contact_number} = await TestContext.flows.userFlow.getParticularUserDetails(userId)
                TestContext.activeUser='current'
                await TestContext.flows.loginFlow.loginFlow(contact_number,userId,'current user')
                const {response} = await TestContext.services.feedService.bookmarkAPost({postId})
                await ResponseValidator.validateStatus(response, 201)
                count++
            }
        })
        test('Bookmark Hidden Post',async()=>{
            const TOTAL = 5;
            let count = 0
            while(count<TOTAL){
                Log.info("###################################################################################");
                Log.info(`Bookmark My Friends - Public Post - ${count + 1}/${TOTAL}`);
                Log.info("###################################################################################");
                const {postId, userId} = await TestContext.services.feedRepo.getMyFriendsOfFriendsRandomHiddenPost(TestContext.initialMemuuid)
                const {contact_number} = await TestContext.flows.userFlow.getParticularUserDetails(userId)
                TestContext.activeUser='current'
                await TestContext.flows.loginFlow.loginFlow(contact_number,userId,'current user')
                const {response} = await TestContext.services.feedService.bookmarkAPost({postId})
                await ResponseValidator.validateStatus(response, 201)
                count++
            }
        })
        test('Bookmark Friends Visibility Post',async()=>{
            const TOTAL = 5;
            let count = 0
            while(count<TOTAL){
                Log.info("###################################################################################");
                Log.info(`Bookmark My Friends - Public Post - ${count + 1}/${TOTAL}`);
                Log.info("###################################################################################");
                const {postId, userId} = await TestContext.services.feedRepo.getMyFriendsOfFriendsRandomPostWithFriendsVisibility(TestContext.initialMemuuid)
                const {contact_number} = await TestContext.flows.userFlow.getParticularUserDetails(userId)
                TestContext.activeUser='current'
                await TestContext.flows.loginFlow.loginFlow(contact_number,userId,'current user')
                const {response} = await TestContext.services.feedService.bookmarkAPost({postId})
                await ResponseValidator.validateStatus(response, 201)
                count++
            }
        })
        test('Bookmark Friends Friends Visibility Post',async()=>{
            const TOTAL = 5;
            let count = 0
            while(count<TOTAL){
                Log.info("###################################################################################");
                Log.info(`Bookmark My Friends - Public Post - ${count + 1}/${TOTAL}`);
                Log.info("###################################################################################");
                const {postId, userId} = await TestContext.services.feedRepo.getMyFriendsOfFriendsRandomPostWithFriendsOfFriendVisibility(TestContext.initialMemuuid)
                const {contact_number} = await TestContext.flows.userFlow.getParticularUserDetails(userId)
                TestContext.activeUser='current'
                await TestContext.flows.loginFlow.loginFlow(contact_number,userId,'current user')
                const {response} = await TestContext.services.feedService.bookmarkAPost({postId})
                await ResponseValidator.validateStatus(response, 201)
                count++
            }
        })
    })

    describe('Logged In Users - non friend - Logs In Bookmark His Post',()=>{
        test('Bookmark Public Post',async()=>{
            const TOTAL = 5;
            let count = 0
            while(count<TOTAL){
                Log.info("###################################################################################");
                Log.info(`Bookmark My Friends - Public Post - ${count + 1}/${TOTAL}`);
                Log.info("###################################################################################");
                const {postId, userId} = await TestContext.services.feedRepo.getMyNonFriendsRandomPublicPost(TestContext.initialMemuuid)
                const {contact_number} = await TestContext.flows.userFlow.getParticularUserDetails(userId)
                TestContext.activeUser='current'
                await TestContext.flows.loginFlow.loginFlow(contact_number,userId,'current user')
                const {response} = await TestContext.services.feedService.bookmarkAPost({postId})
                await ResponseValidator.validateStatus(response, 201)
                count++
            }
        })
        test('Bookmark Hidden Post',async()=>{
            const TOTAL = 5;
            let count = 0
            while(count<TOTAL){
                Log.info("###################################################################################");
                Log.info(`Bookmark My Friends - Public Post - ${count + 1}/${TOTAL}`);
                Log.info("###################################################################################");
                const {postId, userId} = await TestContext.services.feedRepo.getMyNonFriendsRandomHiddenPost(TestContext.initialMemuuid)
                const {contact_number} = await TestContext.flows.userFlow.getParticularUserDetails(userId)
                TestContext.activeUser='current'
                await TestContext.flows.loginFlow.loginFlow(contact_number,userId,'current user')
                const {response} = await TestContext.services.feedService.bookmarkAPost({postId})
                await ResponseValidator.validateStatus(response, 201)
                count++
            }
        })
        test('Bookmark Friends Visibility Post',async()=>{
            const TOTAL = 5;
            let count = 0
            while(count<TOTAL){
                Log.info("###################################################################################");
                Log.info(`Bookmark My Friends - Public Post - ${count + 1}/${TOTAL}`);
                Log.info("###################################################################################");
                const {postId, userId} = await TestContext.services.feedRepo.getMyNonFriendsRandomPostWithFriendsVisibility(TestContext.initialMemuuid)
                const {contact_number} = await TestContext.flows.userFlow.getParticularUserDetails(userId)
                TestContext.activeUser='current'
                await TestContext.flows.loginFlow.loginFlow(contact_number,userId,'current user')
                const {response} = await TestContext.services.feedService.bookmarkAPost({postId})
                await ResponseValidator.validateStatus(response, 201)
                count++
            }
        })
        test('Bookmark Friends Friends Visibility Post',async()=>{
            const TOTAL = 5;
            let count = 0
            while(count<TOTAL){
                Log.info("###################################################################################");
                Log.info(`Bookmark My Friends - Public Post - ${count + 1}/${TOTAL}`);
                Log.info("###################################################################################");
                const {postId, userId} = await TestContext.services.feedRepo.getMyNonFriendsRandomPostWithFriendsOfFriendVisibility(TestContext.initialMemuuid)
                const {contact_number} = await TestContext.flows.userFlow.getParticularUserDetails(userId)
                TestContext.activeUser='current'
                await TestContext.flows.loginFlow.loginFlow(contact_number,userId,'current user')
                const {response} = await TestContext.services.feedService.bookmarkAPost({postId})
                await ResponseValidator.validateStatus(response, 201)
                count++
            }
        })
    })
})

describe('Bulk Bookmark Remove',()=>{

    describe('Logged In User Remove His Bookmarked Post',()=>{

        test('Remove My Public Bookmarked Post',async()=>{
            const TOTAL = 1;
            let count = 0
            while(count<TOTAL){
                Log.info("###################################################################################");
                Log.info(`Bookmark My Friends - Public Post - ${count + 1}/${TOTAL}`);
                Log.info("###################################################################################");
            const {postId,postedByUserId,bookmarkedByUserId} = await TestContext.services.feedRepo.getPostsBookmarkedByMe(TestContext.initialMemuuid,'add','public')
            const {response} = await TestContext.services.feedService.removePostFromBookmark({
                postId
            })
            await ResponseValidator.validateStatus(response,200)
            count++
            }
        })
    })
        test('Remove My Hidden Bookmarked Post',async()=>{
            const TOTAL = 1;
            let count = 0
            while(count<TOTAL){
                Log.info("###################################################################################");
                Log.info(`Bookmark My Friends - Public Post - ${count + 1}/${TOTAL}`);
                Log.info("###################################################################################");
                const {postId,postedByUserId,bookmarkedByUserId} = await TestContext.services.feedRepo.getPostsBookmarkedByMe(TestContext.initialMemuuid,'add','hidden')
                const {response} = await TestContext.services.feedService.removePostFromBookmark({
                    postId
                })
                await ResponseValidator.validateStatus(response,200)
                count++
            }
        })
        test('Remove My Friends Visibility Bookmarked Post',async()=>{
            const TOTAL = 1;
            let count = 0
            while(count<TOTAL){
                Log.info("###################################################################################");
                Log.info(`Bookmark My Friends - Public Post - ${count + 1}/${TOTAL}`);
                Log.info("###################################################################################");
                const {postId,postedByUserId,bookmarkedByUserId} = await TestContext.services.feedRepo.getPostsBookmarkedByMe(TestContext.initialMemuuid,'add','friends visibility')
                const {response} = await TestContext.services.feedService.removePostFromBookmark({
                    postId
                })
                await ResponseValidator.validateStatus(response,200)
                count++
            }
        })
        test('Remove My Friends Friends Visibility Bookmarked Post',async()=>{
            const TOTAL = 1;
            let count = 0
            while(count<TOTAL){
                Log.info("###################################################################################");
                Log.info(`Bookmark My Friends - Public Post - ${count + 1}/${TOTAL}`);
                Log.info("###################################################################################");

                const {postId,postedByUserId,bookmarkedByUserId} = await TestContext.services.feedRepo.getPostsBookmarkedByMe(TestContext.initialMemuuid,'add','friends visibility')
                const {response} = await TestContext.services.feedService.removePostFromBookmark({
                    postId
                })
                await ResponseValidator.validateStatus(response,200)
                count++
            }
        })

    })

    describe('Logged In User Remove Bookmarks His Friends Post',()=>{
        test('Remove Bookmark My Friends - Public Post',async()=>{
            const TOTAL = 1;
            let count = 0
            while(count<TOTAL){
                Log.info("###################################################################################");
                Log.info(`Bookmark My Friends - Public Post - ${count + 1}/${TOTAL}`);
                Log.info("###################################################################################");

                const {postId,postedByUserId,bookmarkedByUserId} = await TestContext.services.feedRepo.getPostsBookmakedByMeOfMyFriend(TestContext.initialMemuuid,'add','public')
                const {response} = await TestContext.services.feedService.removePostFromBookmark({
                    postId
                })
                await ResponseValidator.validateStatus(response,200)
                count++
            }
        })
        test('Remove Bookmark My Friends - Friend Visibility Post',async()=>{
            const TOTAL = 1;
            let count = 0
            while(count<TOTAL){
                Log.info("###################################################################################");
                Log.info(`Bookmark My Friends - Public Post - ${count + 1}/${TOTAL}`);
                Log.info("###################################################################################");

                const {postId,postedByUserId,bookmarkedByUserId} = await TestContext.services.feedRepo.getPostsBookmakedByMeOfMyFriend(TestContext.initialMemuuid,'add','friends visibility')
                const {response} = await TestContext.services.feedService.removePostFromBookmark({
                    postId
                })
                await ResponseValidator.validateStatus(response,200)
                count++
            }
        })
        test('Remove Bookmark My Friends - Friend Friend Visibility Post',async()=>{
            const TOTAL = 1;
            let count = 0
            while(count<TOTAL){
                Log.info("###################################################################################");
                Log.info(`Bookmark My Friends - Public Post - ${count + 1}/${TOTAL}`);
                Log.info("###################################################################################");

                const {postId,postedByUserId,bookmarkedByUserId} = await TestContext.services.feedRepo.getPostsBookmakedByMeOfMyFriend(TestContext.initialMemuuid,'add','fof visibility')
                const {response} = await TestContext.services.feedService.removePostFromBookmark({
                    postId
                })
                await ResponseValidator.validateStatus(response,200)
                count++
            }
        })
    })

    describe('Logged In User Remove Bookmarks His Friends Friend Post',()=>{
        
        test('Remove Bookmark My Friends Friend - Public Post',async()=>{
            const TOTAL = 1;
            let count = 0
            while(count<TOTAL){
                Log.info("###################################################################################");
                Log.info(`Bookmark My Friends - Public Post - ${count + 1}/${TOTAL}`);
                Log.info("###################################################################################");

                const {postId,postedByUserId,bookmarkedByUserId} = await TestContext.services.feedRepo.getPostsBookmakedByMeOfMyFriendsFriend(TestContext.initialMemuuid,'add','public')
                const {response} = await TestContext.services.feedService.removePostFromBookmark({
                    postId
                })
                await ResponseValidator.validateStatus(response,200)
                count++
            }
        })
        test('Remove Bookmark My Friends Friends - Friends Friends Visibility Post',async()=>{
            const TOTAL = 1;
            let count = 0
            while(count<TOTAL){
                Log.info("###################################################################################");
                Log.info(`Bookmark My Friends - Public Post - ${count + 1}/${TOTAL}`);
                Log.info("###################################################################################");

                const {postId,postedByUserId,bookmarkedByUserId} = await TestContext.services.feedRepo.getPostsBookmakedByMeOfMyFriendsFriend(TestContext.initialMemuuid,'add','fof visibility')
                const {response} = await TestContext.services.feedService.removePostFromBookmark({
                    postId
                })
                await ResponseValidator.validateStatus(response,200)
                count++
            }
        })
    })

    describe('Logged In User Remove Bookmarks His Non Friends Post',()=>{
        test('Remove Bookmark My Friends Friend - Public Post',async()=>{
            const TOTAL = 1;
            let count = 0
            while(count<TOTAL){
                Log.info("###################################################################################");
                Log.info(`Bookmark My Friends - Public Post - ${count + 1}/${TOTAL}`);
                Log.info("###################################################################################");

                const {postId,postedByUserId,bookmarkedByUserId} = await TestContext.services.feedRepo.getPostsBookmakedByMeOfNonFriend(TestContext.initialMemuuid,'add','public')
                const {response} = await TestContext.services.feedService.removePostFromBookmark({
                    postId
                })
                await ResponseValidator.validateStatus(response,200)
                count++
            }
        })
    })

    describe('Logged In Users - Friend - Logs In Remove Bookmark His Post',()=>{
        test('Remove Bookmark Public Post',async()=>{
            const TOTAL = 1;
            let count = 0
            while(count<TOTAL){
                Log.info("###################################################################################");
                Log.info(`Bookmark My Friends - Public Post - ${count + 1}/${TOTAL}`);
                Log.info("###################################################################################");

                const {postId,postedByUserId,bookmarkedByUserId} = await TestContext.services.feedRepo.getPostsBookmarkedByMyFriends(TestContext.initialMemuuid,'add','public')
                const {contact_number} =await TestContext.flows.userFlow.getParticularUserDetails(bookmarkedByUserId)
                TestContext.activeUser='current'
                await TestContext.flows.loginFlow.loginFlow(contact_number,bookmarkedByUserId,'current user')
                const {response} = await TestContext.services.feedService.removePostFromBookmark({
                    postId
                })
                await ResponseValidator.validateStatus(response,200)
                count++
            }
        })
        test('Remove Bookmark Hidden Post',async()=>{
            const TOTAL = 1;
            let count = 0
            while(count<TOTAL){
                Log.info("###################################################################################");
                Log.info(`Bookmark My Friends - Public Post - ${count + 1}/${TOTAL}`);
                Log.info("###################################################################################");

                const {postId,postedByUserId,bookmarkedByUserId} = await TestContext.services.feedRepo.getPostsBookmarkedByMyFriends(TestContext.initialMemuuid,'add','hidden')
                const {contact_number} =await TestContext.flows.userFlow.getParticularUserDetails(bookmarkedByUserId)
                TestContext.activeUser='current'
                await TestContext.flows.loginFlow.loginFlow(contact_number,bookmarkedByUserId,'current user')
                const {response} = await TestContext.services.feedService.removePostFromBookmark({
                    postId
                })
                await ResponseValidator.validateStatus(response,200)
                count++
            }
        })
        test('Remove Bookmark Friends Visibility Post',async()=>{
            const TOTAL = 1;
            let count = 0
            while(count<TOTAL){
                Log.info("###################################################################################");
                Log.info(`Bookmark My Friends - Public Post - ${count + 1}/${TOTAL}`);
                Log.info("###################################################################################");

                const {postId,postedByUserId,bookmarkedByUserId} = await TestContext.services.feedRepo.getPostsBookmarkedByMyFriends(TestContext.initialMemuuid,'add','friends visibility')
                const {contact_number} =await TestContext.flows.userFlow.getParticularUserDetails(bookmarkedByUserId)
                TestContext.activeUser='current'
                await TestContext.flows.loginFlow.loginFlow(contact_number,bookmarkedByUserId,'current user')
                const {response} = await TestContext.services.feedService.removePostFromBookmark({
                    postId
                })
                await ResponseValidator.validateStatus(response,200)
                count++
            }
        })
        test('Remove Bookmark Friends Friends Visibility Post',async()=>{
            const TOTAL = 1;
            let count = 0
            while(count<TOTAL){
                Log.info("###################################################################################");
                Log.info(`Bookmark My Friends - Public Post - ${count + 1}/${TOTAL}`);
                Log.info("###################################################################################");

                const {postId,postedByUserId,bookmarkedByUserId} = await TestContext.services.feedRepo.getPostsBookmarkedByMyFriends(TestContext.initialMemuuid,'add','fof visibility')
                const {contact_number} =await TestContext.flows.userFlow.getParticularUserDetails(bookmarkedByUserId)
                TestContext.activeUser='current'
                await TestContext.flows.loginFlow.loginFlow(contact_number,bookmarkedByUserId,'current user')
                const {response} = await TestContext.services.feedService.removePostFromBookmark({
                    postId
                })
                await ResponseValidator.validateStatus(response,200)
                count++
            }
        })
    })

    describe('Logged In Users - Friends friend - Logs In Remove Bookmark His Post',()=>{
        test('Remove Bookmark Public Post',async()=>{
            const TOTAL = 1;
            let count = 0
            while(count<TOTAL){
                Log.info("###################################################################################");
                Log.info(`Bookmark My Friends - Public Post - ${count + 1}/${TOTAL}`);
                Log.info("###################################################################################");

                const {postId,postedByUserId,bookmarkedByUserId} = await TestContext.services.feedRepo.getPostBookmrkedByMyFriendsFriends(TestContext.initialMemuuid,'add','public')
                const {contact_number} =await TestContext.flows.userFlow.getParticularUserDetails(bookmarkedByUserId)
                TestContext.activeUser='current'
                await TestContext.flows.loginFlow.loginFlow(contact_number,bookmarkedByUserId,'current user')
                const {response} = await TestContext.services.feedService.removePostFromBookmark({
                    postId
                })
                await ResponseValidator.validateStatus(response,200)
                count++
            }
        })
        test('Remove Bookmark Hidden Post',async()=>{
            const TOTAL = 1;
            let count = 0
            while(count<TOTAL){
                Log.info("###################################################################################");
                Log.info(`Bookmark My Friends - Public Post - ${count + 1}/${TOTAL}`);
                Log.info("###################################################################################");

                const {postId,postedByUserId,bookmarkedByUserId} = await TestContext.services.feedRepo.getPostBookmrkedByMyFriendsFriends(TestContext.initialMemuuid,'add','hidden')
                const {contact_number} =await TestContext.flows.userFlow.getParticularUserDetails(bookmarkedByUserId)
                TestContext.activeUser='current'
                await TestContext.flows.loginFlow.loginFlow(contact_number,bookmarkedByUserId,'current user')
                const {response} = await TestContext.services.feedService.removePostFromBookmark({
                    postId
                })
                await ResponseValidator.validateStatus(response,200)
                count++
            }
        })
        test('Remove Bookmark Friends Visibility Post',async()=>{
            const TOTAL = 1;
            let count = 0
            while(count<TOTAL){
                Log.info("###################################################################################");
                Log.info(`Bookmark My Friends - Public Post - ${count + 1}/${TOTAL}`);
                Log.info("###################################################################################");

                const {postId,postedByUserId,bookmarkedByUserId} = await TestContext.services.feedRepo.getPostBookmrkedByMyFriendsFriends(TestContext.initialMemuuid,'add','friends visibility')
                const {contact_number} =await TestContext.flows.userFlow.getParticularUserDetails(bookmarkedByUserId)
                TestContext.activeUser='current'
                await TestContext.flows.loginFlow.loginFlow(contact_number,bookmarkedByUserId,'current user')
                const {response} = await TestContext.services.feedService.removePostFromBookmark({
                    postId
                })
                await ResponseValidator.validateStatus(response,200)
                count++
            }
        })
        test('Remove Bookmark Friends Friends Visibility Post',async()=>{
            const TOTAL = 1;
            let count = 0
            while(count<TOTAL){
                Log.info("###################################################################################");
                Log.info(`Bookmark My Friends - Public Post - ${count + 1}/${TOTAL}`);
                Log.info("###################################################################################");

                const {postId,postedByUserId,bookmarkedByUserId} = await TestContext.services.feedRepo.getPostBookmrkedByMyFriendsFriends(TestContext.initialMemuuid,'add','fof visibility')
                const {contact_number} =await TestContext.flows.userFlow.getParticularUserDetails(bookmarkedByUserId)
                TestContext.activeUser='current'
                await TestContext.flows.loginFlow.loginFlow(contact_number,bookmarkedByUserId,'current user')
                const {response} = await TestContext.services.feedService.removePostFromBookmark({
                    postId
                })
                await ResponseValidator.validateStatus(response,200)
                count++
            }
        })
    })

    describe('Logged In Users - non friend - Logs In Removes Bookmark His Post',()=>{
        test('Remove Bookmark Public Post',async()=>{
            const TOTAL = 1;
            let count = 0
            while(count<TOTAL){
                Log.info("###################################################################################");
                Log.info(`Bookmark My Friends - Public Post - ${count + 1}/${TOTAL}`);
                Log.info("###################################################################################");

                const {postId,postedByUserId,bookmarkedByUserId} = await TestContext.services.feedRepo.getPostBookmarkedByMyNonFriends(TestContext.initialMemuuid,'add','public')
                const {contact_number} =await TestContext.flows.userFlow.getParticularUserDetails(bookmarkedByUserId)
                TestContext.activeUser='current'
                await TestContext.flows.loginFlow.loginFlow(contact_number,bookmarkedByUserId,'current user')
                const {response} = await TestContext.services.feedService.removePostFromBookmark({
                    postId
                })
                await ResponseValidator.validateStatus(response,200)
                count++
            }
        })
        test('Remove Bookmark Hidden Post',async()=>{
            const TOTAL = 1;
            let count = 0
            while(count<TOTAL){
                Log.info("###################################################################################");
                Log.info(`Bookmark My Friends - Public Post - ${count + 1}/${TOTAL}`);
                Log.info("###################################################################################");

                const {postId,postedByUserId,bookmarkedByUserId} = await TestContext.services.feedRepo.getPostBookmarkedByMyNonFriends(TestContext.initialMemuuid,'add','hidden')
                const {contact_number} =await TestContext.flows.userFlow.getParticularUserDetails(bookmarkedByUserId)
                TestContext.activeUser='current'
                await TestContext.flows.loginFlow.loginFlow(contact_number,bookmarkedByUserId,'current user')
                const {response} = await TestContext.services.feedService.removePostFromBookmark({
                    postId
                })
                await ResponseValidator.validateStatus(response,200)
                count++
            }
        })
        test('Remove Bookmark Friends Visibility Post',async()=>{
            const TOTAL = 1;
            let count = 0
            while(count<TOTAL){
                Log.info("###################################################################################");
                Log.info(`Bookmark My Friends - Public Post - ${count + 1}/${TOTAL}`);
                Log.info("###################################################################################");

                const {postId,postedByUserId,bookmarkedByUserId} = await TestContext.services.feedRepo.getPostBookmarkedByMyNonFriends(TestContext.initialMemuuid,'add','friends visibility')
                const {contact_number} =await TestContext.flows.userFlow.getParticularUserDetails(bookmarkedByUserId)
                TestContext.activeUser='current'
                await TestContext.flows.loginFlow.loginFlow(contact_number,bookmarkedByUserId,'current user')
                const {response} = await TestContext.services.feedService.removePostFromBookmark({
                    postId
                })
                await ResponseValidator.validateStatus(response,200)
                count++
            }
        })
        test('Remove Bookmark Friends Friends Visibility Post',async()=>{
            const TOTAL = 1;
            let count = 0
            while(count<TOTAL){
                Log.info("###################################################################################");
                Log.info(`Bookmark My Friends - Public Post - ${count + 1}/${TOTAL}`);
                Log.info("###################################################################################");

                const {postId,postedByUserId,bookmarkedByUserId} = await TestContext.services.feedRepo.getPostBookmarkedByMyNonFriends(TestContext.initialMemuuid,'add','fof visibility')
                const {contact_number} =await TestContext.flows.userFlow.getParticularUserDetails(bookmarkedByUserId)
                TestContext.activeUser='current'
                await TestContext.flows.loginFlow.loginFlow(contact_number,bookmarkedByUserId,'current user')
                const {response} = await TestContext.services.feedService.removePostFromBookmark({
                    postId
                })
                await ResponseValidator.validateStatus(response,200)
                count++
            }
        })
    })