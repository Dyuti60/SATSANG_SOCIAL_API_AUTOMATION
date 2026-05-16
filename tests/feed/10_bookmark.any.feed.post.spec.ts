import ResponseValidator from "api/response.validator"
import { TestContext } from "src/context/test.context"

describe('Validate POST /feed/post/bookmark Endpoint',()=>{

    describe('Add Bookmark',()=>{

            describe('Validate bookmark My Post',()=>{

                test('Validate bookmark my unbookmarked public post',async()=>{
                    const {response} = await TestContext.flows.feedFlow.bookmarkMyPosts('public')
                    await ResponseValidator.validateStatus(response,200)
                    await ResponseValidator.validateErrorMessage(response,'Bookmark added')
                })
                test('Validate bookmark my unbookmarked hidden post',async()=>{
                    const {response} = await TestContext.flows.feedFlow.bookmarkMyPosts('hidden')
                    await ResponseValidator.validateStatus(response,200)
                    await ResponseValidator.validateErrorMessage(response,'Bookmark added')
                })
                test('Validate bookmark my unbookmarked deleted post',async()=>{
                    const {response} = await TestContext.flows.feedFlow.bookmarkMyPosts('deleted')
                    await ResponseValidator.validateStatus(response,200)
                    await ResponseValidator.validateErrorMessage(response,'Bookmark added')
                })
                test('Validate bookmark my unbookmarked post having friends visibility',async()=>{
                    const {response} = await TestContext.flows.feedFlow.bookmarkMyPosts('friends visibility')
                    await ResponseValidator.validateStatus(response,200)
                    await ResponseValidator.validateErrorMessage(response,'Bookmark added')
                })
                test('Validate bookmark my unbookmarked post having friends of friend visibility',async()=>{
                    const {response} = await TestContext.flows.feedFlow.bookmarkMyPosts('fof visibility')
                    await ResponseValidator.validateStatus(response,200)
                    await ResponseValidator.validateErrorMessage(response,'Bookmark added')
                })
            })


            describe('Validate bookmark My Friends Post',()=>{

                test('Validate bookmark my friends unbookmarked public post',async()=>{
                    const {response} = await TestContext.flows.feedFlow.bookmarkMyFriendsPost('public')
                    await ResponseValidator.validateStatus(response,200)
                    await ResponseValidator.validateErrorMessage(response,'Bookmark added')
                })
                test('Validate bookmark my friends unbookmarked hidden post',async()=>{
                    const {response} = await TestContext.flows.feedFlow.bookmarkMyFriendsPost('hidden')
                    await ResponseValidator.validateStatus(response,200)
                    await ResponseValidator.validateErrorMessage(response,'Bookmark added')
                })
                test('Validate bookmark my friends unbookmarked deleted post',async()=>{
                    const {response} = await TestContext.flows.feedFlow.bookmarkMyFriendsPost('deleted')
                    await ResponseValidator.validateStatus(response,200)
                    await ResponseValidator.validateErrorMessage(response,'Bookmark added')
                })
                test('Validate bookmark my friends unbookmarked post having friends visibility',async()=>{
                    const {response} = await TestContext.flows.feedFlow.bookmarkMyFriendsPost('friends visibility')
                    await ResponseValidator.validateStatus(response,200)
                    await ResponseValidator.validateErrorMessage(response,'Bookmark added')
                })
                test('Validate bookmark my friends unbookmarked post having friends of friend visibility',async()=>{
                    const {response} = await TestContext.flows.feedFlow.bookmarkMyFriendsPost('fof visibility')
                    await ResponseValidator.validateStatus(response,200)
                    await ResponseValidator.validateErrorMessage(response,'Bookmark added')
                })
            })

            describe('Validate bookmark My Friends of Friend Post',()=>{

                test('Validate bookmark my friends of friend unbookmarked public post',async()=>{
                    const {response} = await TestContext.flows.feedFlow.bookmarkMyFriendsOfFriendsPost('public')
                    await ResponseValidator.validateStatus(response,200)
                    await ResponseValidator.validateErrorMessage(response,'Bookmark added')
                })
                test('Validate bookmark my friends of friend unbookmarked hidden post',async()=>{
                    const {response} = await TestContext.flows.feedFlow.bookmarkMyFriendsOfFriendsPost('hidden')
                    await ResponseValidator.validateStatus(response,200)
                    await ResponseValidator.validateErrorMessage(response,'Bookmark added')
                })
                test('Validate bookmark my friends of friend unbookmarked deleted post',async()=>{
                    const {response} = await TestContext.flows.feedFlow.bookmarkMyFriendsOfFriendsPost('deleted')
                    await ResponseValidator.validateStatus(response,200)
                    await ResponseValidator.validateErrorMessage(response,'Bookmark added')
                })
                test('Validate bookmark my friends of friend unbookmarked post having friends visibility',async()=>{
                    const {response} = await TestContext.flows.feedFlow.bookmarkMyFriendsOfFriendsPost('friends visibility')
                    await ResponseValidator.validateStatus(response,200)
                    await ResponseValidator.validateErrorMessage(response,'Bookmark added')
                })
                test('Validate bookmark my friends of friend unbookmarked post having friends of friend visibility',async()=>{
                    const {response} = await TestContext.flows.feedFlow.bookmarkMyFriendsOfFriendsPost('fof visibility')
                    await ResponseValidator.validateStatus(response,200)
                    await ResponseValidator.validateErrorMessage(response,'Bookmark added')
                })
            })

            describe('Validate bookmark Non Friend Post',()=>{

                test('Validate bookmark Non Friend unbookmarked public post',async()=>{
                    const {response} = await TestContext.flows.feedFlow.bookmarkOtherNonFriendsPost('public')
                    await ResponseValidator.validateStatus(response,200)
                    await ResponseValidator.validateErrorMessage(response,'Bookmark added')
                })
                test('Validate bookmark Non Friend unbookmarked hidden post',async()=>{
                    const {response} = await TestContext.flows.feedFlow.bookmarkOtherNonFriendsPost('hidden')
                    await ResponseValidator.validateStatus(response,200)
                    await ResponseValidator.validateErrorMessage(response,'Bookmark added')
                })
                test('Validate bookmark Non Friend unbookmarked deleted post',async()=>{
                    const {response} = await TestContext.flows.feedFlow.bookmarkOtherNonFriendsPost('deleted')
                    await ResponseValidator.validateStatus(response,200)
                    await ResponseValidator.validateErrorMessage(response,'Bookmark added')
                })
                test('Validate bookmark Non Friend unbookmarked post having friends visibility',async()=>{
                    const {response} = await TestContext.flows.feedFlow.bookmarkOtherNonFriendsPost('friends visibility')
                    await ResponseValidator.validateStatus(response,200)
                    await ResponseValidator.validateErrorMessage(response,'Bookmark added')
                })
                test('Validate bookmark Non Friend unbookmarked post having friends of friend visibility',async()=>{
                    const {response} = await TestContext.flows.feedFlow.bookmarkOtherNonFriendsPost('fof visibility')
                    await ResponseValidator.validateStatus(response,200)
                    await ResponseValidator.validateErrorMessage(response,'Bookmark added')
                })
            })
    })

    describe('Remove Bookmark',()=>{


            describe('Validate Remove bookmarking My Post',()=>{

                test('Validate remove bookmarking my bookmarked public post',async()=>{
                    const {response} = await TestContext.flows.feedFlow.removeBookmarkFromMyPosts('public')
                    await ResponseValidator.validateStatus(response,200)
                    await ResponseValidator.validateErrorMessage(response,'Bookmark added')
                })
                test('Validate remove bookmarking my bookmarked hidden post',async()=>{
                    const {response} = await TestContext.flows.feedFlow.removeBookmarkFromMyPosts('hidden')
                    await ResponseValidator.validateStatus(response,200)
                    await ResponseValidator.validateErrorMessage(response,'Bookmark added')
                })
                test('Validate remove bookmarking my bookmarked deleted post',async()=>{
                    const {response} = await TestContext.flows.feedFlow.removeBookmarkFromMyPosts('deleted')
                    await ResponseValidator.validateStatus(response,200)
                    await ResponseValidator.validateErrorMessage(response,'Bookmark added')
                })
                test('Validate remove bookmarking my bookmarked post having friends visibility',async()=>{
                    const {response} = await TestContext.flows.feedFlow.removeBookmarkFromMyPosts('friends visibility')
                    await ResponseValidator.validateStatus(response,200)
                    await ResponseValidator.validateErrorMessage(response,'Bookmark added')
                })
                test('Validate remove bookmarking my bookmarked post having friends of friend visibility',async()=>{
                    const {response} = await TestContext.flows.feedFlow.removeBookmarkFromMyPosts('fof visibility')
                    await ResponseValidator.validateStatus(response,200)
                    await ResponseValidator.validateErrorMessage(response,'Bookmark added')
                })
            })


            describe('Validate remove bookmarking My Friends Post',()=>{

                test('Validate remove bookmarking my friends bookmarked public post',async()=>{
                    const {response} = await TestContext.flows.feedFlow.removeBookmarkFromMyFriendsPost('public')
                    await ResponseValidator.validateStatus(response,200)
                    await ResponseValidator.validateErrorMessage(response,'Bookmark added')
                })
                test('Validate remove bookmarking my friends bookmarked hidden post',async()=>{
                    const {response} = await TestContext.flows.feedFlow.removeBookmarkFromMyFriendsPost('hidden')
                    await ResponseValidator.validateStatus(response,200)
                    await ResponseValidator.validateErrorMessage(response,'Bookmark added')
                })
                test('Validate remove bookmarking my friends bookmarked deleted post',async()=>{
                    const {response} = await TestContext.flows.feedFlow.removeBookmarkFromMyFriendsPost('deleted')
                    await ResponseValidator.validateStatus(response,200)
                    await ResponseValidator.validateErrorMessage(response,'Bookmark added')
                })
                test('Validate remove bookmarking my friends bookmarked post having friends visibility',async()=>{
                    const {response} = await TestContext.flows.feedFlow.removeBookmarkFromMyFriendsPost('friends visibility')
                    await ResponseValidator.validateStatus(response,200)
                    await ResponseValidator.validateErrorMessage(response,'Bookmark added')
                })
                test('Validate remove bookmarking my friends bookmarked post having friends of friend visibility',async()=>{
                    const {response} = await TestContext.flows.feedFlow.removeBookmarkFromMyFriendsPost('fof visibility')
                    await ResponseValidator.validateStatus(response,200)
                    await ResponseValidator.validateErrorMessage(response,'Bookmark added')
                })
            })

            describe('Validate remove bookmarking My Friends of Friend Post',()=>{

                test('Validate remove bookmarking my friends of friend bookmarked public post',async()=>{
                    const {response} = await TestContext.flows.feedFlow.RemovebookmarkFromMyFriendsOfFriendsPost('public')
                    await ResponseValidator.validateStatus(response,200)
                    await ResponseValidator.validateErrorMessage(response,'Bookmark added')
                })
                test('Validate remove bookmarking my friends of friend bookmarked hidden post',async()=>{
                    const {response} = await TestContext.flows.feedFlow.RemovebookmarkFromMyFriendsOfFriendsPost('hidden')
                    await ResponseValidator.validateStatus(response,200)
                    await ResponseValidator.validateErrorMessage(response,'Bookmark added')
                })
                test('Validate remove bookmarking my friends of friend bookmarked deleted post',async()=>{
                    const {response} = await TestContext.flows.feedFlow.RemovebookmarkFromMyFriendsOfFriendsPost('deleted')
                    await ResponseValidator.validateStatus(response,200)
                    await ResponseValidator.validateErrorMessage(response,'Bookmark added')
                })
                test('Validate remove bookmarking my friends of friend bookmarked post having friends visibility',async()=>{
                    const {response} = await TestContext.flows.feedFlow.RemovebookmarkFromMyFriendsOfFriendsPost('friends visibility')
                    await ResponseValidator.validateStatus(response,200)
                    await ResponseValidator.validateErrorMessage(response,'Bookmark added')
                })
                test('Validate remove bookmarking my friends of friend bookmarked post having friends of friend visibility',async()=>{
                    const {response} = await TestContext.flows.feedFlow.RemovebookmarkFromMyFriendsOfFriendsPost('fof visibility')
                    await ResponseValidator.validateStatus(response,200)
                    await ResponseValidator.validateErrorMessage(response,'Bookmark added')
                })
            })

            describe('Validate bookmark Non Friend Post',()=>{

                test('Validate bookmark Non Friend unbookmarked public post',async()=>{
                    const {response} = await TestContext.flows.feedFlow.removeBookmarkOtherNonFriendsPost('public')
                    await ResponseValidator.validateStatus(response,200)
                    await ResponseValidator.validateErrorMessage(response,'Bookmark added')
                })
                test('Validate bookmark Non Friend unbookmarked hidden post',async()=>{
                    const {response} = await TestContext.flows.feedFlow.removeBookmarkOtherNonFriendsPost('hidden')
                    await ResponseValidator.validateStatus(response,200)
                    await ResponseValidator.validateErrorMessage(response,'Bookmark added')
                })
                test('Validate bookmark Non Friend unbookmarked deleted post',async()=>{
                    const {response} = await TestContext.flows.feedFlow.removeBookmarkOtherNonFriendsPost('deleted')
                    await ResponseValidator.validateStatus(response,200)
                    await ResponseValidator.validateErrorMessage(response,'Bookmark added')
                })
                test('Validate bookmark Non Friend unbookmarked post having friends visibility',async()=>{
                    const {response} = await TestContext.flows.feedFlow.removeBookmarkOtherNonFriendsPost('friends visibility')
                    await ResponseValidator.validateStatus(response,200)
                    await ResponseValidator.validateErrorMessage(response,'Bookmark added')
                })
                test('Validate bookmark Non Friend unbookmarked post having friends of friend visibility',async()=>{
                    const {response} = await TestContext.flows.feedFlow.removeBookmarkOtherNonFriendsPost('fof visibility')
                    await ResponseValidator.validateStatus(response,200)
                    await ResponseValidator.validateErrorMessage(response,'Bookmark added')
                })
            })
    })
})