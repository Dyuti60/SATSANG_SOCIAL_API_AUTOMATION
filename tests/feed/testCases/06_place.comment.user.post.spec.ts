import ResponseValidator from "../../../src/api/response.validator"
import { TestContext } from "../../../src/context/test.context"

describe('Validate POST /feed/post/comment Endpoint',()=>{

    describe('Add Comment On Post',()=>{

            describe('Comment On Publicly Visible Post',()=>{

                test('Validate comment on my public visibility post',async()=>{
                    const {response} = await TestContext.flows.feedFlow.addCommentToMyPosts('public')
                    await ResponseValidator.validateStatus(response,201)
                    await ResponseValidator.validateErrorMessage(response, 'Successfully saved post-comment.')
                })
                test('Validate comment on my friends public visibility post',async()=>{
                    const {response} = await TestContext.flows.feedFlow.addCommentToMyFriendsPost('public')
                    await ResponseValidator.validateStatus(response,201)
                    await ResponseValidator.validateErrorMessage(response, 'Successfully saved post-comment.')
                })
                test('Validate comment on my friends friend public visibility post',async()=>{
                    const {response} = await TestContext.flows.feedFlow.addCommentToMyFriendsOfFriendsPost('public')
                    await ResponseValidator.validateStatus(response,201)
                    await ResponseValidator.validateErrorMessage(response, 'Successfully saved post-comment.')
                })
                test('Validate comment on my non friend public visibility post',async()=>{
                    const {response} = await TestContext.flows.feedFlow.addCommentToOtherNonFriendsPost('public')
                    await ResponseValidator.validateStatus(response,201)
                    await ResponseValidator.validateErrorMessage(response, 'Successfully saved post-comment.')
                })

            })

            describe('Comment On Post With Hidden Visibility',()=>{

                test('Validate comment on my hidden visibility post',async()=>{
                    const {response} = await TestContext.flows.feedFlow.addCommentToMyPosts('hidden')
                    await ResponseValidator.validateStatus(response,201)
                    await ResponseValidator.validateErrorMessage(response, 'Successfully saved post-comment.')
                })
                test('Validate comment on my friends hidden visibility post',async()=>{
                    const {response} = await TestContext.flows.feedFlow.addCommentToMyFriendsPost('hidden')
                    await ResponseValidator.validateStatus(response,400)
                    await ResponseValidator.validateErrorMessage(response, 'Successfully saved post-comment.')
                })
                test('Validate comment on my friends friend hidden visibility post',async()=>{
                    const {response} = await TestContext.flows.feedFlow.addCommentToMyFriendsOfFriendsPost('hidden')
                    await ResponseValidator.validateStatus(response,400)
                    await ResponseValidator.validateErrorMessage(response, 'Successfully saved post-comment.')
                })
                test('Validate comment on my non friend hidden visibility post',async()=>{
                    const {response} = await TestContext.flows.feedFlow.addCommentToOtherNonFriendsPost('hidden')
                    await ResponseValidator.validateStatus(response,400)
                    await ResponseValidator.validateErrorMessage(response, 'Successfully saved post-comment.')
                })
            })

            describe('Comment On Post With Friends Visibility',()=>{

                test('Validate comment on my post with friends visibility',async()=>{
                    const {response} = await TestContext.flows.feedFlow.addCommentToMyPosts('friends visibility')
                    await ResponseValidator.validateStatus(response,201)
                    await ResponseValidator.validateErrorMessage(response, 'Successfully saved post-comment.')
                })
                test('Validate comment on my friends post with friend visibility',async()=>{
                    const {response} = await TestContext.flows.feedFlow.addCommentToMyFriendsPost('friends visibility')
                    await ResponseValidator.validateStatus(response,201)
                    await ResponseValidator.validateErrorMessage(response, 'Successfully saved post-comment.')
                })
                test('Validate comment on my friends friend post with friend visibility',async()=>{
                    const {response} = await TestContext.flows.feedFlow.addCommentToMyFriendsOfFriendsPost('friends visibility')
                    await ResponseValidator.validateStatus(response,400)
                    await ResponseValidator.validateErrorMessage(response, 'Comment Added Successfully')
                })
                test('Validate comment on my non friend post with friend visibility',async()=>{
                    const {response} = await TestContext.flows.feedFlow.addCommentToOtherNonFriendsPost('friends visibility')
                    await ResponseValidator.validateStatus(response,400)
                    await ResponseValidator.validateErrorMessage(response, 'Comment Added Successfully')
                })
            })

            describe('React To Friends Of Friend Visibility Post',()=>{

                test('Validate comment on my friends of friends visibility post',async()=>{
                    const {response} = await TestContext.flows.feedFlow.addCommentToMyPosts('fof visibility')
                    await ResponseValidator.validateStatus(response,201)
                    await ResponseValidator.validateErrorMessage(response, 'Successfully saved post-comment.')
                })
                test('Validate comment on my friends with friends of friend visibility',async()=>{
                    const {response} = await TestContext.flows.feedFlow.addCommentToMyFriendsPost('fof visibility')
                    await ResponseValidator.validateStatus(response,201)
                    await ResponseValidator.validateErrorMessage(response, 'Successfully saved post-comment.')
                })
                test('Validate comment on my friends friend post with friends of friend visibility',async()=>{
                    const {response} = await TestContext.flows.feedFlow.addCommentToMyFriendsPost('fof visibility')
                    await ResponseValidator.validateStatus(response,201)
                    await ResponseValidator.validateErrorMessage(response, 'Successfully saved post-comment.')
                })
                test('Validate comment on my non friend post with friend of friends visibility',async()=>{
                    const {response} = await TestContext.flows.feedFlow.addCommentToOtherNonFriendsPost('fof visibility')
                    await ResponseValidator.validateStatus(response,400)
                    await ResponseValidator.validateErrorMessage(response, 'Successfully saved post-comment.')
                })
            })

            describe('Comment On Deleted Post',()=>{

                test('Validate comment on my deleted post',async()=>{
                    const {response} = await TestContext.flows.feedFlow.addCommentToMyPosts('deleted')
                    await ResponseValidator.validateStatus(response,400)
                    await ResponseValidator.validateErrorMessage(response, 'Successfully saved post-comment.')
                })
                test('Validate comment on my friends deleted post',async()=>{
                    const {response} = await TestContext.flows.feedFlow.addCommentToMyFriendsPost('deleted')
                    await ResponseValidator.validateStatus(response,400)
                    await ResponseValidator.validateErrorMessage(response, 'Successfully saved post-comment.')
                })
                test('Validate comment on my friends friend deleted post',async()=>{
                    const {response} = await TestContext.flows.feedFlow.addCommentToMyFriendsPost('deleted')
                    await ResponseValidator.validateStatus(response,400)
                    await ResponseValidator.validateErrorMessage(response, 'Successfully saved post-comment.')
                })
                test('Validate comment my non friend deleted post',async()=>{
                    const {response} = await TestContext.flows.feedFlow.addCommentToOtherNonFriendsPost('deleted')
                    await ResponseValidator.validateStatus(response,400)
                    await ResponseValidator.validateErrorMessage(response, 'Successfully saved post-comment.')
                })
            })
    })



    describe('Reply To My Comment On Post',()=>{

    
            describe('Reply To My Comment On Publicly Visible Post',()=>{

                test('Validate reply to my comment on my public visibility post',async()=>{
                    const {response} = await TestContext.flows.feedFlow.replyMyCommentToMyPosts('public')
                    await ResponseValidator.validateStatus(response,201)
                    await ResponseValidator.validateErrorMessage(response, 'Successfully saved post-comment.')
                })
                test('Validate reply to my comment on my friends public visibility post',async()=>{
                    const {response} = await TestContext.flows.feedFlow.replyMyCommentOnMyFriendsPost('public')
                    await ResponseValidator.validateStatus(response,201)
                    await ResponseValidator.validateErrorMessage(response, 'Successfully saved post-comment.')
                })
                test('Validate reply to my comment on my friends friend public visibility post',async()=>{
                    const {response} = await TestContext.flows.feedFlow.replyMyCommentOnMyFriendsOfFriendsPost('public')
                    await ResponseValidator.validateStatus(response,201)
                    await ResponseValidator.validateErrorMessage(response, 'Successfully saved post-comment.')
                })
                test('Validate reply to my comment on my non friend public visibility post',async()=>{
                    const {response} = await TestContext.flows.feedFlow.replyMyCommentOfMyNonFriendsPost('public')
                    await ResponseValidator.validateStatus(response,201)
                    await ResponseValidator.validateErrorMessage(response, 'Successfully saved post-comment.')
                })

            })

            describe('Reply To My Comment On Post With Hidden Visibility',()=>{

                test('Validate reply to my comment on my hidden visibility post',async()=>{
                    const {response} = await TestContext.flows.feedFlow.replyMyCommentToMyPosts('hidden')
                    await ResponseValidator.validateStatus(response,400)
                    await ResponseValidator.validateErrorMessage(response, 'Comment Added Successfully')
                })
                test('Validate reply to my comment on my friends hidden visibility post',async()=>{
                    const {response} = await TestContext.flows.feedFlow.replyMyCommentOnMyFriendsPost('hidden')
                    await ResponseValidator.validateStatus(response,400)
                    await ResponseValidator.validateErrorMessage(response, 'Comment Added Successfully')
                })
                test('Validate reply to my comment on my friends friend hidden visibility post',async()=>{
                    const {response} = await TestContext.flows.feedFlow.replyMyCommentOnMyFriendsOfFriendsPost('hidden')
                    await ResponseValidator.validateStatus(response,400)
                    await ResponseValidator.validateErrorMessage(response, 'Comment Added Successfully')
                })
                test('Validate reply to my comment on my non friend hidden visibility post',async()=>{
                    const {response} = await TestContext.flows.feedFlow.replyMyCommentOfMyNonFriendsPost('hidden')
                    await ResponseValidator.validateStatus(response,400)
                    await ResponseValidator.validateErrorMessage(response, 'Comment Added Successfully')
                })
            })

            describe('Reply To My Comment On Post With Friends Visibility',()=>{

                test('Validate reply to my comment on my post with friends visibility',async()=>{
                    const {response} = await TestContext.flows.feedFlow.replyMyCommentToMyPosts('friends visibility')
                    await ResponseValidator.validateStatus(response,201)
                    await ResponseValidator.validateErrorMessage(response, 'Successfully saved post-comment.')
                })
                test('Validate reply to my comment on my friends post with friend visibility',async()=>{
                    const {response} = await TestContext.flows.feedFlow.replyMyCommentOnMyFriendsPost('friends visibility')
                    await ResponseValidator.validateStatus(response,201)
                    await ResponseValidator.validateErrorMessage(response, 'Successfully saved post-comment.')
                })
                test('Validate reply to my comment on my friends friend post with friends visibility',async()=>{
                    const {response} = await TestContext.flows.feedFlow.replyMyCommentOnMyFriendsOfFriendsPost('friends visibility')
                    await ResponseValidator.validateStatus(response,400)
                    await ResponseValidator.validateErrorMessage(response, 'Comment Added Successfully')
                })
                test('Validate reply to my comment on my non friend post with friends visibility',async()=>{
                    const {response} = await TestContext.flows.feedFlow.replyMyCommentOfMyNonFriendsPost('friends visibility')
                    await ResponseValidator.validateStatus(response,400)
                    await ResponseValidator.validateErrorMessage(response, 'Comment Added Successfully')
                })
            })

            describe('Reply To My Comment On Post With Friends Of Friend Visibility',()=>{

                test('Validate reply to my comment on my friends of friends visibility post',async()=>{
                    const {response} = await TestContext.flows.feedFlow.replyMyCommentToMyPosts('fof visibility')
                    await ResponseValidator.validateStatus(response,201)
                    await ResponseValidator.validateErrorMessage(response, 'Successfully saved post-comment.')
                })
                test('Validate reply to my comment on my friends with friends of friend visibility',async()=>{
                    const {response} = await TestContext.flows.feedFlow.replyMyCommentOnMyFriendsPost('fof visibility')
                    await ResponseValidator.validateStatus(response,201)
                    await ResponseValidator.validateErrorMessage(response, 'Successfully saved post-comment.')
                })
                test('Validate reply to my comment on my friends friend post with friends of friend visibility',async()=>{
                    const {response} = await TestContext.flows.feedFlow.replyMyCommentOnMyFriendsOfFriendsPost('fof visibility')
                    await ResponseValidator.validateStatus(response,201)
                    await ResponseValidator.validateErrorMessage(response, 'Successfully saved post-comment.')
                })
                test('Validate reply to my comment on my non friend post with friend of friends visibility',async()=>{
                    const {response} = await TestContext.flows.feedFlow.replyMyCommentOfMyNonFriendsPost('fof visibility')
                    await ResponseValidator.validateStatus(response,400)
                    await ResponseValidator.validateErrorMessage(response, 'Comment Added Successfully')
                })
            })

            describe('Reply To My Comment On Deleted Post',()=>{

                test('Validate reply to my comment on my deleted post',async()=>{
                    const {response} = await TestContext.flows.feedFlow.replyMyCommentToMyPosts('deleted')
                    await ResponseValidator.validateStatus(response,400)
                    await ResponseValidator.validateErrorMessage(response, 'Comment Added Successfully')
                })
                test('Validate reply to my comment on my friends deleted post',async()=>{
                    const {response} = await TestContext.flows.feedFlow.replyMyCommentOnMyFriendsPost('deleted')
                    await ResponseValidator.validateStatus(response,400)
                    await ResponseValidator.validateErrorMessage(response, 'Comment Added Successfully')
                })
                test('Validate reply to my comment on my friends friend deleted post',async()=>{
                    const {response} = await TestContext.flows.feedFlow.replyMyCommentOnMyFriendsOfFriendsPost('deleted')
                    await ResponseValidator.validateStatus(response,400)
                    await ResponseValidator.validateErrorMessage(response, 'Comment Added Successfully')
                })
                test('Validate reply to my comment my non friend deleted post',async()=>{
                    const {response} = await TestContext.flows.feedFlow.replyMyCommentOfMyNonFriendsPost('deleted')
                    await ResponseValidator.validateStatus(response,400)
                    await ResponseValidator.validateErrorMessage(response, 'Comment Added Successfully')
                })
            })
    })



    describe('Reply To Others Comment On Post',()=>{

            describe('Reply To Others Comment On Publicly Visible Post',()=>{

                test('Validate reply to others comment on my public visibility post',async()=>{
                    const {response} = await TestContext.flows.feedFlow.replyOthersCommentToMyPosts('public')
                    await ResponseValidator.validateStatus(response,201)
                    await ResponseValidator.validateErrorMessage(response, 'Successfully saved post-comment.')
                })
                test('Validate reply to others comment on my friends public visibility post',async()=>{
                    const {response} = await TestContext.flows.feedFlow.replyOthersCommentOnMyFriendsPost('public')
                    await ResponseValidator.validateStatus(response,201)
                    await ResponseValidator.validateErrorMessage(response, 'Successfully saved post-comment.')
                })
                test('Validate reply to others comment on my friends friend public visibility post',async()=>{
                    const {response} = await TestContext.flows.feedFlow.replyOthersCommentOnMyFriendsOfFriendsPost('public')
                    await ResponseValidator.validateStatus(response,201)
                    await ResponseValidator.validateErrorMessage(response, 'Successfully saved post-comment.')
                })
                test('Validate reply to others comment on my non friend public visibility post',async()=>{
                    const {response} = await TestContext.flows.feedFlow.replyOthersCommentOnMyNonFriendsPost('public')
                    await ResponseValidator.validateStatus(response,201)
                    await ResponseValidator.validateErrorMessage(response, 'Successfully saved post-comment.')
                })

            })

            describe('Reply To Others Comment On Post With Hidden Visibility',()=>{

                test('Validate reply to others comment on my hidden visibility post',async()=>{
                    const {response} = await TestContext.flows.feedFlow.replyOthersCommentToMyPosts('hidden')
                    await ResponseValidator.validateStatus(response,400)
                    await ResponseValidator.validateErrorMessage(response, 'Comment Added Successfully')
                })
                test('Validate reply to others comment on my friends hidden visibility post',async()=>{
                    const {response} = await TestContext.flows.feedFlow.replyOthersCommentOnMyFriendsPost('hidden')
                    await ResponseValidator.validateStatus(response,400)
                    await ResponseValidator.validateErrorMessage(response, 'Comment Added Successfully')
                })
                test('Validate reply to others comment on my friends friend hidden visibility post',async()=>{
                    const {response} = await TestContext.flows.feedFlow.replyOthersCommentOnMyFriendsOfFriendsPost('hidden')
                    await ResponseValidator.validateStatus(response,400)
                    await ResponseValidator.validateErrorMessage(response, 'Comment Added Successfully')
                })
                test('Validate reply to others comment on my non friend hidden visibility post',async()=>{
                    const {response} = await TestContext.flows.feedFlow.replyOthersCommentOnMyNonFriendsPost('hidden')
                    await ResponseValidator.validateStatus(response,400)
                    await ResponseValidator.validateErrorMessage(response, 'Comment Added Successfully')
                })
            })

            describe('Reply To Others Comment On Post With Friends Visibility',()=>{

                test('Validate reply to others comment on my post with friends visibility',async()=>{
                    const {response} = await TestContext.flows.feedFlow.replyOthersCommentToMyPosts('friends visibility')
                    await ResponseValidator.validateStatus(response,201)
                    await ResponseValidator.validateErrorMessage(response, 'Successfully saved post-comment.')
                })
                test('Validate reply to others comment on my friends post with friend visibility',async()=>{
                    const {response} = await TestContext.flows.feedFlow.replyOthersCommentOnMyFriendsPost('friends visibility')
                    await ResponseValidator.validateStatus(response,201)
                    await ResponseValidator.validateErrorMessage(response, 'Successfully saved post-comment.')
                })
                test('Validate reply to others comment on my friends friend post with friends visibility',async()=>{
                    const {response} = await TestContext.flows.feedFlow.replyOthersCommentOnMyFriendsOfFriendsPost('friends visibility')
                    await ResponseValidator.validateStatus(response,400)
                    await ResponseValidator.validateErrorMessage(response, 'Successfully saved post-comment.')
                })
                test('Validate reply to others comment on my non friend post with hidden visibility',async()=>{
                    const {response} = await TestContext.flows.feedFlow.replyOthersCommentOnMyNonFriendsPost('friends visibility')
                    await ResponseValidator.validateStatus(response,400)
                    await ResponseValidator.validateErrorMessage(response, 'Comment Added Successfully')
                })
            })

            describe('Reply To Others Comment On Post With Friends Of Friend Visibility',()=>{

                test('Validate reply to others comment on my friends of friends visibility post',async()=>{
                    const {response} = await TestContext.flows.feedFlow.replyOthersCommentToMyPosts('fof visibility')
                    await ResponseValidator.validateStatus(response,201)
                    await ResponseValidator.validateErrorMessage(response, 'Successfully saved post-comment.')
                })
                test('Validate reply to others comment on my friends with friends of friend visibility',async()=>{
                    const {response} = await TestContext.flows.feedFlow.replyOthersCommentOnMyFriendsPost('fof visibility')
                    await ResponseValidator.validateStatus(response,201)
                    await ResponseValidator.validateErrorMessage(response, 'Successfully saved post-comment.')
                })
                test('Validate reply to others comment on my friends friend post with friends of friend visibility',async()=>{
                    const {response} = await TestContext.flows.feedFlow.replyOthersCommentOnMyFriendsOfFriendsPost('fof visibility')
                    await ResponseValidator.validateStatus(response,201)
                    await ResponseValidator.validateErrorMessage(response, 'Successfully saved post-comment.')
                })
                test('Validate reply to others comment on my non friend post with friend of friends visibility',async()=>{
                    const {response} = await TestContext.flows.feedFlow.replyOthersCommentOnMyNonFriendsPost('fof visibility')
                    await ResponseValidator.validateStatus(response,400)
                    await ResponseValidator.validateErrorMessage(response, 'Comment Added Successfully')
                })
            })

            describe('Reply To Others Comment On Deleted Post',()=>{

                test('Validate reply to others comment on my deleted post',async()=>{
                    const {response} = await TestContext.flows.feedFlow.replyOthersCommentToMyPosts('deleted')
                    await ResponseValidator.validateStatus(response,400)
                    await ResponseValidator.validateErrorMessage(response, 'Comment Added Successfully')
                })
                test('Validate reply to others comment on my friends deleted post',async()=>{
                    const {response} = await TestContext.flows.feedFlow.replyOthersCommentOnMyFriendsPost('deleted')
                    await ResponseValidator.validateStatus(response,400)
                    await ResponseValidator.validateErrorMessage(response, 'Comment Added Successfully')
                })
                test('Validate reply to others comment on my friends friend deleted post',async()=>{
                    const {response} = await TestContext.flows.feedFlow.replyOthersCommentOnMyFriendsOfFriendsPost('deleted')
                    await ResponseValidator.validateStatus(response,400)
                    await ResponseValidator.validateErrorMessage(response, 'Comment Added Successfully')
                })
                test('Validate reply to others comment my non friend deleted post',async()=>{
                    const {response} = await TestContext.flows.feedFlow.replyOthersCommentOnMyNonFriendsPost('deleted')
                    await ResponseValidator.validateStatus(response,400)
                    await ResponseValidator.validateErrorMessage(response, 'Comment Added Successfully')
                })
            })
    })


    describe('Update My Comment On Post',()=>{


            describe('Update My Comment On Publicly Visible Post',()=>{

                test('Validate update my comment on my public visibility post',async()=>{
                    const {response} = await TestContext.flows.feedFlow.updateMyCommentOnMyPosts('public')
                    await ResponseValidator.validateStatus(response,201)
                    await ResponseValidator.validateErrorMessage(response, 'Comment Added Successfully')
                })
                test('Validate update my comment on my friends public visibility post',async()=>{
                    const {response} = await TestContext.flows.feedFlow.updateMyCommentOnMyFriendsPost('public')
                    await ResponseValidator.validateStatus(response,201)
                    await ResponseValidator.validateErrorMessage(response, 'Comment Added Successfully')
                })
                test('Validate update my comment on my friends friend public visibility post',async()=>{
                    const {response} = await TestContext.flows.feedFlow.updateMyCommentOnMyFriendsOfFriendsPost('public')
                    await ResponseValidator.validateStatus(response,201)
                    await ResponseValidator.validateErrorMessage(response, 'Comment Added Successfully')
                })
                test('Validate update my comment on my non friend public visibility post',async()=>{
                    const {response} = await TestContext.flows.feedFlow.updateMyCommentOnMyNonFriendsPost('public')
                    await ResponseValidator.validateStatus(response,201)
                    await ResponseValidator.validateErrorMessage(response, 'Comment Added Successfully')
                })

            })

            describe('Update My Comment On Post With Hidden Visibility',()=>{

                test('Validate update my comment on my hidden visibility post',async()=>{
                    const {response} = await TestContext.flows.feedFlow.updateMyCommentOnMyPosts('hidden')
                    await ResponseValidator.validateStatus(response,201)
                    await ResponseValidator.validateErrorMessage(response, 'Comment Added Successfully')
                })
                test('Validate update my comment on my friends hidden visibility post',async()=>{
                    const {response} = await TestContext.flows.feedFlow.updateMyCommentOnMyFriendsPost('hidden')
                    await ResponseValidator.validateStatus(response,400)
                    await ResponseValidator.validateErrorMessage(response, 'Failed to save post-comment.')
                })
                test('Validate update my comment on my friends friend hidden visibility post',async()=>{
                    const {response} = await TestContext.flows.feedFlow.updateMyCommentOnMyFriendsOfFriendsPost('hidden')
                    await ResponseValidator.validateStatus(response,400)
                    await ResponseValidator.validateErrorMessage(response, 'Failed to save post-comment.')
                })
                test('Validate update my comment on my non friend hidden visibility post',async()=>{
                    const {response} = await TestContext.flows.feedFlow.updateMyCommentOnMyNonFriendsPost('hidden')
                    await ResponseValidator.validateStatus(response,400)
                    await ResponseValidator.validateErrorMessage(response, 'Failed to save post-comment.')
                })
            })

            describe('Update My Comment On Post With Friends Visibility',()=>{

                test('Validate update my comment on my post with friends visibility',async()=>{
                    const {response} = await TestContext.flows.feedFlow.updateMyCommentOnMyPosts('friends visibility')
                    await ResponseValidator.validateStatus(response,201)
                    await ResponseValidator.validateErrorMessage(response, 'Comment Added Successfully')
                })
                test('Validate update my comment on my friends post with friend visibility',async()=>{
                    const {response} = await TestContext.flows.feedFlow.updateMyCommentOnMyFriendsPost('friends visibility')
                    await ResponseValidator.validateStatus(response,201)
                    await ResponseValidator.validateErrorMessage(response, 'Comment Added Successfully')
                })
                test('Validate update my comment on my friends friend post with friends visibility',async()=>{
                    const {response} = await TestContext.flows.feedFlow.updateMyCommentOnMyFriendsOfFriendsPost('friends visibility')
                    await ResponseValidator.validateStatus(response,400)
                    await ResponseValidator.validateErrorMessage(response, 'Failed to save post-comment.')
                })
                test('Validate update my comment on my non friend post with hidden visibility',async()=>{
                    const {response} = await TestContext.flows.feedFlow.updateMyCommentOnMyNonFriendsPost('friends visibility')
                    await ResponseValidator.validateStatus(response,400)
                    await ResponseValidator.validateErrorMessage(response, 'Failed to save post-comment.')
                })
            })

            describe('Update My Comment On Post With Friends Of Friend Visibility',()=>{

                test('Validate update my comment on my post with friends of friends visibility post',async()=>{
                    const {response} = await TestContext.flows.feedFlow.updateMyCommentOnMyPosts('fof visibility')
                    await ResponseValidator.validateStatus(response,201)
                    await ResponseValidator.validateErrorMessage(response, 'Comment Added Successfully')
                })
                test('Validate update my comment on my friends post with friends of friend visibility',async()=>{
                    const {response} = await TestContext.flows.feedFlow.updateMyCommentOnMyFriendsPost('fof visibility')
                    await ResponseValidator.validateStatus(response,201)
                    await ResponseValidator.validateErrorMessage(response, 'Comment Added Successfully')
                })
                test('Validate update my comment on my friends friend post with friends of friend visibility',async()=>{
                    const {response} = await TestContext.flows.feedFlow.updateMyCommentOnMyFriendsOfFriendsPost('fof visibility')
                    await ResponseValidator.validateStatus(response,201)
                    await ResponseValidator.validateErrorMessage(response, 'Comment Added Successfully')
                })
                test('Validate update my comment on my non friend post with friend of friends visibility',async()=>{
                    const {response} = await TestContext.flows.feedFlow.updateMyCommentOnMyNonFriendsPost('fof visibility')
                    await ResponseValidator.validateStatus(response,400)
                    await ResponseValidator.validateErrorMessage(response, 'Failed to save post-comment.')
                })
            })

            describe('Update My Comment On Deleted Post',()=>{

                test('Validate update my comment on my deleted post',async()=>{
                    const {response} = await TestContext.flows.feedFlow.updateMyCommentOnMyPosts('deleted')
                    await ResponseValidator.validateStatus(response,400)
                    await ResponseValidator.validateErrorMessage(response, 'Failed to save post-comment.')
                })
                test('Validate update my comment on my friends deleted post',async()=>{
                    const {response} = await TestContext.flows.feedFlow.updateMyCommentOnMyFriendsPost('deleted')
                    await ResponseValidator.validateStatus(response,400)
                    await ResponseValidator.validateErrorMessage(response, 'Failed to save post-comment.')
                })
                test('Validate update my comment on my friends friend deleted post',async()=>{
                    const {response} = await TestContext.flows.feedFlow.updateMyCommentOnMyFriendsOfFriendsPost('deleted')
                    await ResponseValidator.validateStatus(response,400)
                    await ResponseValidator.validateErrorMessage(response, 'Failed to save post-comment.')
                })
                test('Validate update my comment my non friend deleted post',async()=>{
                    const {response} = await TestContext.flows.feedFlow.updateMyCommentOnMyNonFriendsPost('deleted')
                    await ResponseValidator.validateStatus(response,400)
                    await ResponseValidator.validateErrorMessage(response, 'Failed to save post-comment.')
                })
            })
    })


    describe('Update Others Comment On Post',()=>{

        describe('Friend Updates Friends Comment On Post',()=>{

            test('My Friends Updates his-her Comment On my Public Post',async()=>{
                const {friendId} = await TestContext.flows.userFlow.getRandomFriendOfParticularUser()
                const {contact_number} = await TestContext.flows.userFlow.getParticularUserDetails(friendId)
                TestContext.activeUser='current'
                await TestContext.flows.loginFlow.loginFlow(contact_number,friendId,'current user')
                const {response} = await TestContext.flows.feedFlow.updateOthersCommentOnMyPosts('public','current')
                await ResponseValidator.validateStatus(response,201)
                await ResponseValidator.validateErrorMessage(response, 'Failed to save post-comment.')
            })
            test('My Friends Updates his her Comment On my Post with friends visibility',async()=>{
                const {friendId} = await TestContext.flows.userFlow.getRandomFriendOfParticularUser()
                const {contact_number} = await TestContext.flows.userFlow.getParticularUserDetails(friendId)
                TestContext.activeUser='current'
                await TestContext.flows.loginFlow.loginFlow(contact_number,friendId,'current user')
                const {response} = await TestContext.flows.feedFlow.updateOthersCommentOnMyPosts('friends visibility','current')
                await ResponseValidator.validateStatus(response,201)
                await ResponseValidator.validateErrorMessage(response, 'Failed to save post-comment.')
            })
        })


        describe('Update My Friends Comment On Post',()=>{

            test('Update My Friends Comment On my Public Post',async()=>{
                const {friendId} = await TestContext.flows.userFlow.getRandomFriendOfParticularUser()
                const {contact_number} = await TestContext.flows.userFlow.getParticularUserDetails(friendId)
                TestContext.activeUser='current'
                await TestContext.flows.loginFlow.loginFlow(contact_number,friendId,'current user')

                const {response} = await TestContext.flows.feedFlow.updateOthersCommentOnMyPosts('public','initial')
                await ResponseValidator.validateStatus(response,400)
                await ResponseValidator.validateErrorMessage(response, 'Failed to save post-comment.')
            })
            test('Update My Friends Comment On my Post with friends visibility',async()=>{
                const {friendId} = await TestContext.flows.userFlow.getRandomFriendOfParticularUser()
                const {contact_number} = await TestContext.flows.userFlow.getParticularUserDetails(friendId)
                TestContext.activeUser='current'
                await TestContext.flows.loginFlow.loginFlow(contact_number,friendId,'current user')
                
                const {response} = await TestContext.flows.feedFlow.updateOthersCommentOnMyPosts('friends visibility','initial')
                await ResponseValidator.validateStatus(response,400)
                await ResponseValidator.validateErrorMessage(response, 'Failed to save post-comment.')
            })
        })

        describe('Update My Friends Friend Comment On Post',()=>{

            test('Update My Friends Friend Comment On my Public Post',async()=>{
                const {friendId} = await TestContext.flows.userFlow.getRandomFriendsOfFriendOfParticularUser()
                const {contact_number} = await TestContext.flows.userFlow.getParticularUserDetails(friendId)
                TestContext.activeUser='current'
                await TestContext.flows.loginFlow.loginFlow(contact_number,friendId,'current user')
                
                const {response} = await TestContext.flows.feedFlow.updateOthersCommentOnMyPosts('public','initial')
                await ResponseValidator.validateStatus(response,400)
                await ResponseValidator.validateErrorMessage(response, 'Failed to save post-comment.')
            })
            test('Update My Friends Friend Comment On my Post with friends visibility',async()=>{
                const {friendId} = await TestContext.flows.userFlow.getRandomFriendsOfFriendOfParticularUser()
                const {contact_number} = await TestContext.flows.userFlow.getParticularUserDetails(friendId)
                TestContext.activeUser='current'
                await TestContext.flows.loginFlow.loginFlow(contact_number,friendId,'current user')
                
                const {response} = await TestContext.flows.feedFlow.updateOthersCommentOnMyPosts('friends visibility','initial')
                await ResponseValidator.validateStatus(response,400)
                await ResponseValidator.validateErrorMessage(response, 'Failed to save post-comment.')
            })
            test('Update My Friends Friend Comment On my Post with friends friend visibility',async()=>{
                const {friendId} = await TestContext.flows.userFlow.getRandomFriendsOfFriendOfParticularUser()
                const {contact_number} = await TestContext.flows.userFlow.getParticularUserDetails(friendId)
                TestContext.activeUser='current'
                await TestContext.flows.loginFlow.loginFlow(contact_number,friendId,'current user')
                
                const {response} = await TestContext.flows.feedFlow.updateOthersCommentOnMyPosts('fof visibility','initial')
                await ResponseValidator.validateStatus(response,400)
                await ResponseValidator.validateErrorMessage(response, 'Failed to save post-comment.')
            })
        })

        describe('Update My Non Friends Comment On Post',()=>{

            test('Update My Non Friends Comment On my Public Post',async()=>{
                const {friendId} = await TestContext.flows.userFlow.getRandomNonFriendOfParticularUser()
                const {contact_number} = await TestContext.flows.userFlow.getParticularUserDetails(friendId)
                TestContext.activeUser='current'
                await TestContext.flows.loginFlow.loginFlow(contact_number,friendId,'current user')
                
                const {response} = await TestContext.flows.feedFlow.updateOthersCommentOnMyPosts('public','initial')
                await ResponseValidator.validateStatus(response,400)
                await ResponseValidator.validateErrorMessage(response, 'Failed to save post-comment.')
            })
        })
    })
})