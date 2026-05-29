import ResponseValidator from "api/response.validator"
import { TestContext } from "src/context/test.context"

describe('Validate POST /feed/post/bookmark Endpoint',()=>{

    describe('Add Bookmark',()=>{

            describe('Validate Logged In User Add / Removes - Never Bookmarked his-her posts',()=>{

                test('Validate bookmark my unbookmarked public post',async()=>{
                    const userId=TestContext.initialMemuuid
                    const {response} = await TestContext.flows.feedFlow.bookmarkMyNeverBookmarkedPost('public','add')
                    await ResponseValidator.validateStatus(response,201)
                    await ResponseValidator.validateErrorMessage(response,'Successfully updated Post-Bookmark.')
                })
                test('Validate bookmark my unbookmarked hidden post',async()=>{
                    const {response} = await TestContext.flows.feedFlow.bookmarkMyNeverBookmarkedPost('hidden','add')
                    await ResponseValidator.validateStatus(response,201)
                    await ResponseValidator.validateErrorMessage(response,'Successfully updated Post-Bookmark.')
                })
                test('Validate bookmark my unbookmarked deleted post',async()=>{
                    const {response} = await TestContext.flows.feedFlow.bookmarkMyNeverBookmarkedPost('deleted','add')
                    await ResponseValidator.validateStatus(response,201)
                    await ResponseValidator.validateErrorMessage(response,'Successfully updated Post-Bookmark.')
                })
                test('Validate bookmark my unbookmarked post having friends visibility',async()=>{
                    const {response} = await TestContext.flows.feedFlow.bookmarkMyNeverBookmarkedPost('friends visibility','add')
                    await ResponseValidator.validateStatus(response,201)
                    await ResponseValidator.validateErrorMessage(response,'Successfully updated Post-Bookmark.')
                })
                test('Validate bookmark my unbookmarked post having friends of friend visibility',async()=>{
                    const {response} = await TestContext.flows.feedFlow.bookmarkMyNeverBookmarkedPost('fof visibility','add')
                    await ResponseValidator.validateStatus(response,201)
                    await ResponseValidator.validateErrorMessage(response,'Successfully updated Post-Bookmark.')
                })

                test('Validate remove bookmark my unbookmarked public post',async()=>{
                    const {response} = await TestContext.flows.feedFlow.bookmarkMyNeverBookmarkedPost('public','remove')
                    await ResponseValidator.validateStatus(response,400)
                    await ResponseValidator.validateErrorMessage(response,'Successfully updated Post-Bookmark.')
                })
                test('Validate remove bookmark my unbookmarked hidden post',async()=>{
                    const {response} = await TestContext.flows.feedFlow.bookmarkMyNeverBookmarkedPost('hidden','remove')
                    await ResponseValidator.validateStatus(response,400)
                    await ResponseValidator.validateErrorMessage(response,'Successfully updated Post-Bookmark.')
                })
                test('Validate remove bookmark my unbookmarked deleted post',async()=>{
                    const {response} = await TestContext.flows.feedFlow.bookmarkMyNeverBookmarkedPost('deleted','remove')
                    await ResponseValidator.validateStatus(response,400)
                    await ResponseValidator.validateErrorMessage(response,'Successfully updated Post-Bookmark.')
                })
                test('Validate remove bookmark my unbookmarked post having friends visibility',async()=>{
                    const {response} = await TestContext.flows.feedFlow.bookmarkMyNeverBookmarkedPost('friends visibility','remove')
                    await ResponseValidator.validateStatus(response,400)
                    await ResponseValidator.validateErrorMessage(response,'Successfully updated Post-Bookmark.')
                })
                test('Validate remove bookmark my unbookmarked post having friends of friend visibility',async()=>{
                    const {response} = await TestContext.flows.feedFlow.bookmarkMyNeverBookmarkedPost('fof visibility','remove')
                    await ResponseValidator.validateStatus(response,404)
                    await ResponseValidator.validateErrorMessage(response,'Successfully updated Post-Bookmark.')
                })
            })


            describe('Validate Logged In User Add / Removes - Never Bookmarked My Friends Post',()=>{

                test('Validate bookmark my friends unbookmarked public post',async()=>{
                    const {response} = await TestContext.flows.feedFlow.bookmarkNeverBookmarkedFriendsPost('public','add')
                    await ResponseValidator.validateStatus(response,201)
                    await ResponseValidator.validateErrorMessage(response,'Successfully updated Post-Bookmark.')
                })
                test('Validate bookmark my friends unbookmarked hidden post',async()=>{
                    const {response} = await TestContext.flows.feedFlow.bookmarkNeverBookmarkedFriendsPost('hidden','add')
                    await ResponseValidator.validateStatus(response,400)
                    await ResponseValidator.validateErrorMessage(response,'Bookmark added')
                })
                test('Validate bookmark my friends unbookmarked deleted post',async()=>{
                    const {response} = await TestContext.flows.feedFlow.bookmarkNeverBookmarkedFriendsPost('deleted','add')
                    await ResponseValidator.validateStatus(response,400)
                    await ResponseValidator.validateErrorMessage(response,'Bookmark added')
                })
                test('Validate bookmark my friends unbookmarked post having friends visibility',async()=>{
                    const {response} = await TestContext.flows.feedFlow.bookmarkNeverBookmarkedFriendsPost('friends visibility','add')
                    await ResponseValidator.validateStatus(response,201)
                    await ResponseValidator.validateErrorMessage(response,'Successfully updated Post-Bookmark.')
                })
                test('Validate bookmark my friends unbookmarked post having friends of friend visibility',async()=>{
                    const {response} = await TestContext.flows.feedFlow.bookmarkNeverBookmarkedFriendsPost('fof visibility','add')
                    await ResponseValidator.validateStatus(response,201)
                    await ResponseValidator.validateErrorMessage(response,'Successfully updated Post-Bookmark.')
                })
                test('Validate remove bookmark my friends unbookmarked public post',async()=>{
                    const {response} = await TestContext.flows.feedFlow.bookmarkNeverBookmarkedFriendsPost('public','remove')
                    await ResponseValidator.validateStatus(response,400)
                    await ResponseValidator.validateErrorMessage(response,'Successfully updated Post-Bookmark.')
                })
                test('Validate remove bookmark my friends unbookmarked hidden post',async()=>{
                    const {response} = await TestContext.flows.feedFlow.bookmarkNeverBookmarkedFriendsPost('hidden','remove')
                    await ResponseValidator.validateStatus(response,400)
                    await ResponseValidator.validateErrorMessage(response,'Bookmark added')
                })
                test('Validate remove bookmark my friends unbookmarked deleted post',async()=>{
                    const {response} = await TestContext.flows.feedFlow.bookmarkNeverBookmarkedFriendsPost('deleted','remove')
                    await ResponseValidator.validateStatus(response,400)
                    await ResponseValidator.validateErrorMessage(response,'Bookmark added')
                })
                test('Validate remove bookmark my friends unbookmarked post having friends visibility',async()=>{
                    const {response} = await TestContext.flows.feedFlow.bookmarkNeverBookmarkedFriendsPost('friends visibility','remove')
                    await ResponseValidator.validateStatus(response,400)
                    await ResponseValidator.validateErrorMessage(response,'Successfully updated Post-Bookmark.')
                })
                test('Validate remove bookmark my friends unbookmarked post having friends of friend visibility',async()=>{
                    const {response} = await TestContext.flows.feedFlow.bookmarkNeverBookmarkedFriendsPost('fof visibility','remove')
                    await ResponseValidator.validateStatus(response,400)
                    await ResponseValidator.validateErrorMessage(response,'Bookmark added')
                })
            })

            describe('Validate Logged In User Add / Remove - Never Bookmarked My Friends of Friend Post',()=>{

                test('Validate bookmark my friends of friend unbookmarked public post',async()=>{
                    const {response} = await TestContext.flows.feedFlow.bookmarkNeverBookmarkedMyFriendsOfFriendsPost('public','add')
                    await ResponseValidator.validateStatus(response,201)
                    await ResponseValidator.validateErrorMessage(response,'Successfully updated Post-Bookmark.')
                })
                test('Validate bookmark my friends of friend unbookmarked hidden post',async()=>{
                    const {response} = await TestContext.flows.feedFlow.bookmarkNeverBookmarkedMyFriendsOfFriendsPost('hidden','add')
                    await ResponseValidator.validateStatus(response,400)
                    await ResponseValidator.validateErrorMessage(response,'Bookmark added')
                })
                test('Validate bookmark my friends of friend unbookmarked deleted post',async()=>{
                    const {response} = await TestContext.flows.feedFlow.bookmarkNeverBookmarkedMyFriendsOfFriendsPost('deleted','add')
                    await ResponseValidator.validateStatus(response,400)
                    await ResponseValidator.validateErrorMessage(response,'Bookmark added')
                })
                test('Validate bookmark my friends of friend unbookmarked post having friends visibility',async()=>{
                    const {response} = await TestContext.flows.feedFlow.bookmarkNeverBookmarkedMyFriendsOfFriendsPost('friends visibility','add')
                    await ResponseValidator.validateStatus(response,400)
                    await ResponseValidator.validateErrorMessage(response,'Successfully updated Post-Bookmark.')
                })
                test('Validate bookmark my friends of friend unbookmarked post having friends of friend visibility',async()=>{
                    const {response} = await TestContext.flows.feedFlow.bookmarkNeverBookmarkedMyFriendsOfFriendsPost('fof visibility','add')
                    await ResponseValidator.validateStatus(response,201)
                    await ResponseValidator.validateErrorMessage(response,'Successfully updated Post-Bookmark.')
                })

                test('Validate remove bookmark my friends of friend unbookmarked public post',async()=>{
                    const {response} = await TestContext.flows.feedFlow.bookmarkNeverBookmarkedMyFriendsOfFriendsPost('public','remove')
                    await ResponseValidator.validateStatus(response,400)
                    await ResponseValidator.validateErrorMessage(response,'Successfully updated Post-Bookmark.')
                })
                test('Validate remove bookmark my friends of friend unbookmarked hidden post',async()=>{
                    const {response} = await TestContext.flows.feedFlow.bookmarkNeverBookmarkedMyFriendsOfFriendsPost('hidden','remove')
                    await ResponseValidator.validateStatus(response,400)
                    await ResponseValidator.validateErrorMessage(response,'Bookmark added')
                })
                test('Validate remove bookmark my friends of friend unbookmarked deleted post',async()=>{
                    const {response} = await TestContext.flows.feedFlow.bookmarkNeverBookmarkedMyFriendsOfFriendsPost('deleted','remove')
                    await ResponseValidator.validateStatus(response,400)
                    await ResponseValidator.validateErrorMessage(response,'Bookmark added')
                })
                test('Validate remove bookmark my friends of friend unbookmarked post having friends visibility',async()=>{
                    const {response} = await TestContext.flows.feedFlow.bookmarkNeverBookmarkedMyFriendsOfFriendsPost('friends visibility','remove')
                    await ResponseValidator.validateStatus(response,400)
                    await ResponseValidator.validateErrorMessage(response,'Successfully updated Post-Bookmark.')
                })
                test('Validate remove bookmark my friends of friend unbookmarked post having friends of friend visibility',async()=>{
                    const {response} = await TestContext.flows.feedFlow.bookmarkNeverBookmarkedMyFriendsOfFriendsPost('fof visibility','remove')
                    await ResponseValidator.validateStatus(response,400)
                    await ResponseValidator.validateErrorMessage(response,'Successfully updated Post-Bookmark.')
                })
            })

            describe('Validate Logged In User Add / Remove - Never Bookmarked My Non Friend Post',()=>{

                test('Validate bookmark Non Friend unbookmarked public post',async()=>{
                    const {response} = await TestContext.flows.feedFlow.bookmarkNeverBookmarkedOtherNonFriendsPost('public','add')
                    await ResponseValidator.validateStatus(response,201)
                    await ResponseValidator.validateErrorMessage(response,'Successfully updated Post-Bookmark.')
                })
                test('Validate bookmark Non Friend unbookmarked hidden post',async()=>{
                    const {response} = await TestContext.flows.feedFlow.bookmarkNeverBookmarkedOtherNonFriendsPost('hidden','add')
                    await ResponseValidator.validateStatus(response,400)
                    await ResponseValidator.validateErrorMessage(response,'Bookmark added')
                })
                test('Validate bookmark Non Friend unbookmarked deleted post',async()=>{
                    const {response} = await TestContext.flows.feedFlow.bookmarkNeverBookmarkedOtherNonFriendsPost('deleted','add')
                    await ResponseValidator.validateStatus(response,400)
                    await ResponseValidator.validateErrorMessage(response,'Bookmark added')
                })
                test('Validate bookmark Non Friend unbookmarked post having friends visibility',async()=>{
                    const {response} = await TestContext.flows.feedFlow.bookmarkNeverBookmarkedOtherNonFriendsPost('friends visibility','add')
                    await ResponseValidator.validateStatus(response,400)
                    await ResponseValidator.validateErrorMessage(response,'Bookmark added')
                })
                test('Validate bookmark Non Friend unbookmarked post having friends of friend visibility',async()=>{
                    const {response} = await TestContext.flows.feedFlow.bookmarkNeverBookmarkedOtherNonFriendsPost('fof visibility','add')
                    await ResponseValidator.validateStatus(response,400)
                    await ResponseValidator.validateErrorMessage(response,'Bookmark added')
                })

                test('Validate remove bookmark Non Friend unbookmarked public post',async()=>{
                    const {response} = await TestContext.flows.feedFlow.bookmarkNeverBookmarkedOtherNonFriendsPost('public','remove')
                    await ResponseValidator.validateStatus(response,400)
                    await ResponseValidator.validateErrorMessage(response,'Successfully updated Post-Bookmark.')
                })
                test('Validate remove bookmark Non Friend unbookmarked hidden post',async()=>{
                    const {response} = await TestContext.flows.feedFlow.bookmarkNeverBookmarkedOtherNonFriendsPost('hidden','remove')
                    await ResponseValidator.validateStatus(response,400)
                    await ResponseValidator.validateErrorMessage(response,'Bookmark added')
                })
                test('Validate remove bookmark Non Friend unbookmarked deleted post',async()=>{
                    const {response} = await TestContext.flows.feedFlow.bookmarkNeverBookmarkedOtherNonFriendsPost('deleted','remove')
                    await ResponseValidator.validateStatus(response,400)
                    await ResponseValidator.validateErrorMessage(response,'Bookmark added')
                })
                test('Validate remove bookmark Non Friend unbookmarked post having friends visibility',async()=>{
                    const {response} = await TestContext.flows.feedFlow.bookmarkNeverBookmarkedOtherNonFriendsPost('friends visibility','remove')
                    await ResponseValidator.validateStatus(response,400)
                    await ResponseValidator.validateErrorMessage(response,'Bookmark added')
                })
                test('Validate remove bookmark Non Friend unbookmarked post having friends of friend visibility',async()=>{
                    const {response} = await TestContext.flows.feedFlow.bookmarkNeverBookmarkedOtherNonFriendsPost('fof visibility','remove')
                    await ResponseValidator.validateStatus(response,400)
                    await ResponseValidator.validateErrorMessage(response,'Bookmark added')
                })
            })
    })
    describe('Add Bookmark By Bookmarked User (logged In User) - Never BookmarkedPost',()=>{

        test('logged in user (my friend) bookmark - friends visibility post of mine',async()=>{
            const {postId,postedByUserId,bookmarkedByUserId} =await TestContext.services.feedRepo.getMyRandomNeverBookmarkedPost(TestContext.initialMemuuid,'friends visibility')
            const {friendId} = await TestContext.flows.userFlow.getRandomFriendOfParticularUser()

            const {contact_number} = await TestContext.flows.userFlow.getParticularUserDetails(friendId)
            TestContext.activeUser='current'
            await TestContext.flows.loginFlow.loginFlow(contact_number,friendId,'current user')

            const {response} = await TestContext.services.feedService.bookmarkAPost({
                postId: postId
            })
            await ResponseValidator.validateStatus(response,201)
            await ResponseValidator.validateErrorMessage(response,'Successfully updated Post-Bookmark.')
        })

        test('logged in user (my friend friend) bookmark - friends friend visibility post of mine',async()=>{
            const {postId,postedByUserId,bookmarkedByUserId} =await TestContext.services.feedRepo.getMyRandomNeverBookmarkedPost(TestContext.initialMemuuid,'fof visibility')
            const {friendId} = await TestContext.flows.userFlow.getRandomFriendsOfFriendOfParticularUser()

            const {contact_number} = await TestContext.flows.userFlow.getParticularUserDetails(friendId)
            TestContext.activeUser='current'
            await TestContext.flows.loginFlow.loginFlow(contact_number,friendId,'current user')

            const {response} = await TestContext.services.feedService.bookmarkAPost({
                postId: postId
            })
            await ResponseValidator.validateStatus(response,201)
            await ResponseValidator.validateErrorMessage(response,'Successfully updated Post-Bookmark.')
        })

        test('logged in user (my friend) bookmark post of my friend',async()=>{
            const {postId,postedByUserId,bookmarkedByUserId} =await TestContext.services.feedRepo.getMyFriendsRandomNeverBookmarkedPost(TestContext.initialMemuuid,'friends visibility')

            const {contact_number} = await TestContext.flows.userFlow.getParticularUserDetails(postedByUserId)
            TestContext.activeUser='current'
            await TestContext.flows.loginFlow.loginFlow(contact_number,postedByUserId,'current user')

            const {response} = await TestContext.services.feedService.bookmarkAPost({
                postId: postId
            })
            await ResponseValidator.validateStatus(response,201)
            await ResponseValidator.validateErrorMessage(response,'Successfully updated Post-Bookmark.')
        })

        test('logged in user (my friend friend) bookmark post of friends friend',async()=>{
            const {postId,postedByUserId,bookmarkedByUserId} =await TestContext.services.feedRepo.getMyFriendsFriendsRandomNeverBookmarkedPost(TestContext.initialMemuuid,'friends visibility')

            const {contact_number} = await TestContext.flows.userFlow.getParticularUserDetails(postedByUserId)
            TestContext.activeUser='current'
            await TestContext.flows.loginFlow.loginFlow(contact_number,postedByUserId,'current user')

            const {response} = await TestContext.services.feedService.bookmarkAPost({
                postId: postId
            })
            await ResponseValidator.validateStatus(response,201)
            await ResponseValidator.validateErrorMessage(response,'Successfully updated Post-Bookmark.')
        })

        test('logged in user (my non friend) bookmark post of non friend',async()=>{
            const {postId,postedByUserId,bookmarkedByUserId} =await TestContext.services.feedRepo.getMyNonFriendsRandomNeverBookmarkedPost(TestContext.initialMemuuid,'friends visibility')

            const {contact_number} = await TestContext.flows.userFlow.getParticularUserDetails(postedByUserId)
            TestContext.activeUser='current'
            await TestContext.flows.loginFlow.loginFlow(contact_number,postedByUserId,'current user')

            const {response} = await TestContext.services.feedService.bookmarkAPost({
                postId: postId
            })
            await ResponseValidator.validateStatus(response,201)
            await ResponseValidator.validateErrorMessage(response,'Successfully updated Post-Bookmark.')  
        })
    })

    describe('Add Bookmark By Bookmarked User (logged In User) - Already BookmarkedPost',()=>{

        test('logged in user adds again the bookmarked post by him',async()=>{
            const {response} = await TestContext.flows.feedFlow.getBookmarkedPostsByMe('add','friends visibility')
            await ResponseValidator.validateStatus(response,400)
            await ResponseValidator.validateErrorMessage(response,'Bookmark already added')

        })
        test('logged in user (my friend) adds again the bookmarked post by him',async()=>{
            const {postId,postedByUserId,bookmarkedByUserId} =await TestContext.services.feedRepo.getPostsBookmarkedByMyFriends(TestContext.initialMemuuid,'add','friends visibility')
            const {contact_number} = await TestContext.flows.userFlow.getParticularUserDetails(bookmarkedByUserId)
            TestContext.activeUser='current'
            await TestContext.flows.loginFlow.loginFlow(contact_number,bookmarkedByUserId,'current user')
            const {response} = await TestContext.services.feedService.bookmarkAPost({
                postId
            })
            await ResponseValidator.validateStatus(response,400)
            await ResponseValidator.validateErrorMessage(response,'Bookmark already added')
        })
        test('logged in user (my friend friend) adds again the bookmarked post by him',async()=>{
            const {postId,postedByUserId,bookmarkedByUserId} =await TestContext.services.feedRepo.getPostBookmrkedByMyFriendsFriends(TestContext.initialMemuuid,'add','friends visibility')
            const {contact_number} = await TestContext.flows.userFlow.getParticularUserDetails(bookmarkedByUserId)
            TestContext.activeUser='current'
            await TestContext.flows.loginFlow.loginFlow(contact_number,bookmarkedByUserId,'current user')
            const {response} = await TestContext.services.feedService.bookmarkAPost({
                postId
            })
            await ResponseValidator.validateStatus(response,400)
            await ResponseValidator.validateErrorMessage(response,'Bookmark already added')
        })
        test('logged in user (my non friend) adds again the bookmarked post by him',async()=>{
            const {postId,postedByUserId,bookmarkedByUserId} =await TestContext.services.feedRepo.getPostBookmarkedByMyNonFriends(TestContext.initialMemuuid,'add','friends visibility')
            const {contact_number} = await TestContext.flows.userFlow.getParticularUserDetails(bookmarkedByUserId)
            TestContext.activeUser='current'
            await TestContext.flows.loginFlow.loginFlow(contact_number,bookmarkedByUserId,'current user')
            const {response} = await TestContext.services.feedService.bookmarkAPost({
                postId
            })
            await ResponseValidator.validateStatus(response,400)
            await ResponseValidator.validateErrorMessage(response,'Bookmark already added')
        })
    })

    describe('Add Bookmark By Bookmarked User (logged In User) - Already Removed BookmarkedPost',()=>{

        test('logged in user adds again the removed bookmarked post by him',async()=>{
            const {postId,postedByUserId,bookmarkedByUserId} = await TestContext.services.feedRepo.getPostsBookmarkedByMe(TestContext.initialMemuuid,'remove','friends visibility')
            const {response} = await TestContext.services.feedService.bookmarkAPost({
                postId
            })
            await ResponseValidator.validateStatus(response,201)
            await ResponseValidator.validateErrorMessage(response,'Successfully updated Post-Bookmark.')

        })
        test('logged in user (my friend) adds again the removed bookmarked post by him',async()=>{
            const {postId,postedByUserId,bookmarkedByUserId} =await TestContext.services.feedRepo.getPostsBookmarkedByMyFriends(TestContext.initialMemuuid,'remove','friends visibility')
            const {contact_number} = await TestContext.flows.userFlow.getParticularUserDetails(bookmarkedByUserId)
            TestContext.activeUser='current'
            await TestContext.flows.loginFlow.loginFlow(contact_number,bookmarkedByUserId,'current user')
            const {response} = await TestContext.services.feedService.bookmarkAPost({
                postId
            })
            await ResponseValidator.validateStatus(response,201)
            await ResponseValidator.validateErrorMessage(response,'Successfully updated Post-Bookmark.')
        })
        test('logged in user (my friend friend) adds again the removed bookmarked post by him',async()=>{
            const {postId,postedByUserId,bookmarkedByUserId} =await TestContext.services.feedRepo.getPostBookmrkedByMyFriendsFriends(TestContext.initialMemuuid,'remove','friends visibility')
            const {contact_number} = await TestContext.flows.userFlow.getParticularUserDetails(bookmarkedByUserId)
            TestContext.activeUser='current'
            await TestContext.flows.loginFlow.loginFlow(contact_number,bookmarkedByUserId,'current user')
            const {response} = await TestContext.services.feedService.bookmarkAPost({
                postId
            })
            await ResponseValidator.validateStatus(response,201)
            await ResponseValidator.validateErrorMessage(response,'Successfully updated Post-Bookmark.')
        })
        test('logged in user (my non friend) adds again the removed bookmarked post by him',async()=>{
            const {postId,postedByUserId,bookmarkedByUserId} =await TestContext.services.feedRepo.getPostBookmarkedByMyNonFriends(TestContext.initialMemuuid,'remove','friends visibility')
            const {contact_number} = await TestContext.flows.userFlow.getParticularUserDetails(bookmarkedByUserId)
            TestContext.activeUser='current'
            await TestContext.flows.loginFlow.loginFlow(contact_number,bookmarkedByUserId,'current user')
            const {response} = await TestContext.services.feedService.bookmarkAPost({
                postId
            })
            await ResponseValidator.validateStatus(response,201)
            await ResponseValidator.validateErrorMessage(response,'Successfully updated Post-Bookmark.')
        })
    })


    describe('Remove Bookmark By Bookmarked User (logged In User) - Already BookmarkedPost',()=>{

        test('logged in user removes the bookmarked post by him',async()=>{
            const {postId,postedByUserId,bookmarkedByUserId} = await TestContext.services.feedRepo.getPostsBookmarkedByMe(TestContext.initialMemuuid,'add','friends visibility')
            const {response} = await TestContext.services.feedService.removePostFromBookmark({
                postId
            })
            await ResponseValidator.validateStatus(response,200)
            await ResponseValidator.validateErrorMessage(response,'Successfully updated Post-Bookmark.')
        })
        test('logged in user (my friend) removes the bookmarked post by him',async()=>{
            const {postId,postedByUserId,bookmarkedByUserId} =await TestContext.services.feedRepo.getPostsBookmarkedByMyFriends(TestContext.initialMemuuid,'add','friends visibility')
            const {contact_number} = await TestContext.flows.userFlow.getParticularUserDetails(bookmarkedByUserId)
            TestContext.activeUser='current'
            await TestContext.flows.loginFlow.loginFlow(contact_number,bookmarkedByUserId,'current user')
            const {response} = await TestContext.services.feedService.removePostFromBookmark({
                postId
            })
            await ResponseValidator.validateStatus(response,200)
            await ResponseValidator.validateErrorMessage(response,'Successfully updated Post-Bookmark.')
        })
        test('logged in user (my friend friend) removes the bookmarked post by him',async()=>{
            const {postId,postedByUserId,bookmarkedByUserId} =await TestContext.services.feedRepo.getPostBookmrkedByMyFriendsFriends(TestContext.initialMemuuid,'add','friends visibility')
            const {contact_number} = await TestContext.flows.userFlow.getParticularUserDetails(bookmarkedByUserId)
            TestContext.activeUser='current'
            await TestContext.flows.loginFlow.loginFlow(contact_number,bookmarkedByUserId,'current user')
            const {response} = await TestContext.services.feedService.removePostFromBookmark({
                postId
            })
            await ResponseValidator.validateStatus(response,200)
            await ResponseValidator.validateErrorMessage(response,'Successfully updated Post-Bookmark.')
        })
        test('logged in user (non friend) removes the bookmarked post by him',async()=>{
            const {postId,postedByUserId,bookmarkedByUserId} =await TestContext.services.feedRepo.getPostBookmarkedByMyNonFriends(TestContext.initialMemuuid,'add','friends visibility')
            const {contact_number} = await TestContext.flows.userFlow.getParticularUserDetails(bookmarkedByUserId)
            TestContext.activeUser='current'
            await TestContext.flows.loginFlow.loginFlow(contact_number,bookmarkedByUserId,'current user')
            const {response} = await TestContext.services.feedService.removePostFromBookmark({
                postId
            })
            await ResponseValidator.validateStatus(response,200)
            await ResponseValidator.validateErrorMessage(response,'Successfully updated Post-Bookmark.')
        })
    })


    describe('Remove Bookmark By Bookmarked User (logged In User) - Already Removed BookmarkedPost',()=>{

        test('logged in user removes the bookmarked post (removed) by him',async()=>{
            const {postId,postedByUserId,bookmarkedByUserId} = await TestContext.services.feedRepo.getPostsBookmarkedByMe(TestContext.initialMemuuid,'remove','friends visibility')
            const {response} = await TestContext.services.feedService.removePostFromBookmark({
                postId
            })
            await ResponseValidator.validateStatus(response,200)
            await ResponseValidator.validateErrorMessage(response,'Successfully updated Post-Bookmark.')
        })
        test('logged in user (my friend) removes the bookmarked post (removed) by him',async()=>{
            const {postId,postedByUserId,bookmarkedByUserId} =await TestContext.services.feedRepo.getPostsBookmarkedByMyFriends(TestContext.initialMemuuid,'remove','friends visibility')
            const {contact_number} = await TestContext.flows.userFlow.getParticularUserDetails(bookmarkedByUserId)
            TestContext.activeUser='current'
            await TestContext.flows.loginFlow.loginFlow(contact_number,bookmarkedByUserId,'current user')
            const {response} = await TestContext.services.feedService.removePostFromBookmark({
                postId
            })
            await ResponseValidator.validateStatus(response,200)
            await ResponseValidator.validateErrorMessage(response,'Successfully updated Post-Bookmark.')
        })
        test('logged in user (my friend friend) removes the bookmarked post (removed) by him',async()=>{
            const {postId,postedByUserId,bookmarkedByUserId} =await TestContext.services.feedRepo.getPostBookmrkedByMyFriendsFriends(TestContext.initialMemuuid,'remove','friends visibility')
            const {contact_number} = await TestContext.flows.userFlow.getParticularUserDetails(bookmarkedByUserId)
            TestContext.activeUser='current'
            await TestContext.flows.loginFlow.loginFlow(contact_number,bookmarkedByUserId,'current user')
            const {response} = await TestContext.services.feedService.removePostFromBookmark({
                postId
            })
            await ResponseValidator.validateStatus(response,200)
            await ResponseValidator.validateErrorMessage(response,'Successfully updated Post-Bookmark.')
        })
        test('logged in user (non friend) removes the bookmarked post (removed) by him',async()=>{
            const {postId,postedByUserId,bookmarkedByUserId} =await TestContext.services.feedRepo.getPostBookmarkedByMyNonFriends(TestContext.initialMemuuid,'remove','friends visibility')
            const {contact_number} = await TestContext.flows.userFlow.getParticularUserDetails(bookmarkedByUserId)
            TestContext.activeUser='current'
            await TestContext.flows.loginFlow.loginFlow(contact_number,bookmarkedByUserId,'current user')
            const {response} = await TestContext.services.feedService.removePostFromBookmark({
                postId
            })
            await ResponseValidator.validateStatus(response,200)
            await ResponseValidator.validateErrorMessage(response,'Successfully updated Post-Bookmark.')
        })
    })

    describe('Remove Bookmark By logged In User - Never BookmarkedPost',()=>{

        test('logged in user removes bookmark from never bookmarked post of mine',async()=>{
            const {postId,postedByUserId,bookmarkedByUserId} = await TestContext.services.feedRepo.getMyRandomNeverBookmarkedPost(TestContext.initialMemuuid,'friends visibility')
            const {response} = await TestContext.services.feedService.removePostFromBookmark({
                postId
            })
            await ResponseValidator.validateStatus(response,400)
            await ResponseValidator.validateErrorMessage(response,'Never Bookmark added')
        })
        test('logged in user removes the bookmarked from never bookmarked post by friend',async()=>{
            const {postId,postedByUserId,bookmarkedByUserId} =await TestContext.services.feedRepo.getMyFriendsRandomNeverBookmarkedPost(TestContext.initialMemuuid,'friends visibility')
            const {response} = await TestContext.services.feedService.removePostFromBookmark({
                postId
            })
            await ResponseValidator.validateStatus(response,400)
            await ResponseValidator.validateErrorMessage(response,'Never Bookmark added')
        })
        test('logged in user (my friend friend) removes the bookmarked post by him',async()=>{
            const {postId,postedByUserId,bookmarkedByUserId} =await TestContext.services.feedRepo.getMyFriendsFriendsRandomNeverBookmarkedPost(TestContext.initialMemuuid,'friends visibility')
            const {response} = await TestContext.services.feedService.removePostFromBookmark({
                postId
            })
            await ResponseValidator.validateStatus(response,400)
            await ResponseValidator.validateErrorMessage(response,'Never Bookmark added')
        })
        test('logged in user (non friend) removes the bookmarked post by him',async()=>{
            const {postId,postedByUserId,bookmarkedByUserId} =await TestContext.services.feedRepo.getMyNonFriendsRandomNeverBookmarkedPost(TestContext.initialMemuuid,'friends visibility')
            const {response} = await TestContext.services.feedService.removePostFromBookmark({
                postId
            })
            await ResponseValidator.validateStatus(response,400)
            await ResponseValidator.validateErrorMessage(response,'Never Bookmark added')
        })
    })

    describe('Remove Bookmark By logged In User - Already BookmarkedPost By Other',()=>{
        test('logged in user remove bookmark to friends post (bookmark by other)',async()=>{
            const {postId,postedByUserId,bookmarkedByUserId} =await TestContext.services.feedRepo.getPostsBookmarkedByMyFriends(TestContext.initialMemuuid,'add','friends visibility')
            const {response} = await TestContext.services.feedService.removePostFromBookmark({
                postId
            })
            await ResponseValidator.validateStatus(response,400)
            await ResponseValidator.validateErrorMessage(response,'Successfully updated Post-Bookmark.')
        })
        test('logged in user remove bookmark to friends friend post (bookmark by other)',async()=>{
            const {postId,postedByUserId,bookmarkedByUserId} =await TestContext.services.feedRepo.getPostBookmrkedByMyFriendsFriends(TestContext.initialMemuuid,'add','friends visibility')
            const {response} = await TestContext.services.feedService.removePostFromBookmark({
                postId
            })
            await ResponseValidator.validateStatus(response,400)
            await ResponseValidator.validateErrorMessage(response,'Successfully updated Post-Bookmark.')
        })
        test('logged in user remove bookmark to non friends post (bookmark by other)',async()=>{
            const {postId,postedByUserId,bookmarkedByUserId} =await TestContext.services.feedRepo.getPostBookmarkedByMyNonFriends(TestContext.initialMemuuid,'add','friends visibility')
            const {response} = await TestContext.services.feedService.removePostFromBookmark({
                postId
            })
            await ResponseValidator.validateStatus(response,400)
            await ResponseValidator.validateErrorMessage(response,'Successfully updated Post-Bookmark.')
        })
    })
})