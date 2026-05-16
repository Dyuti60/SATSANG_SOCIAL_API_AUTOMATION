import ResponseValidator from "api/response.validator"
import { TestContext } from "src/context/test.context"

describe('Validate POST /feed/post/comment Endpoint',()=>{

    describe('Add Comment On Post',()=>{

            describe('Comment On Publicly Visible Post',()=>{

                test('Validate comment on my public visibility post',async()=>{
                    const {response} = await TestContext.flows.feedFlow.addCommentToMyPosts('public')
                    await ResponseValidator.validateStatus(response,200)
                    await ResponseValidator.validateErrorMessage(response, 'Comment Added Successfully')
                })
                test('Validate comment on my friends public visibility post',async()=>{
                    const {response} = await TestContext.flows.feedFlow.addCommentToMyFriendsPost('public')
                    await ResponseValidator.validateStatus(response,200)
                    await ResponseValidator.validateErrorMessage(response, 'Comment Added Successfully')
                })
                test('Validate comment on my friends friend public visibility post',async()=>{
                    const {response} = await TestContext.flows.feedFlow.addCommentToMyFriendsOfFriendsPost('public')
                    await ResponseValidator.validateStatus(response,200)
                    await ResponseValidator.validateErrorMessage(response, 'Comment Added Successfully')
                })
                test('Validate comment on my non friend public visibility post',async()=>{
                    const {response} = await TestContext.flows.feedFlow.addCommentToOtherNonFriendsPost('public')
                    await ResponseValidator.validateStatus(response,200)
                    await ResponseValidator.validateErrorMessage(response, 'Comment Added Successfully')
                })

            })

            describe('Comment On Post With Hidden Visibility',()=>{

                test('Validate comment on my hidden visibility post',async()=>{
                    const {response} = await TestContext.flows.feedFlow.addCommentToMyPosts('hidden')
                    await ResponseValidator.validateStatus(response,200)
                    await ResponseValidator.validateErrorMessage(response, 'Comment Added Successfully')
                })
                test('Validate comment on my friends hidden visibility post',async()=>{
                    const {response} = await TestContext.flows.feedFlow.addCommentToMyFriendsPost('hidden')
                    await ResponseValidator.validateStatus(response,200)
                    await ResponseValidator.validateErrorMessage(response, 'Comment Added Successfully')
                })
                test('Validate comment on my friends friend hidden visibility post',async()=>{
                    const {response} = await TestContext.flows.feedFlow.addCommentToMyFriendsOfFriendsPost('hidden')
                    await ResponseValidator.validateStatus(response,200)
                    await ResponseValidator.validateErrorMessage(response, 'Comment Added Successfully')
                })
                test('Validate comment on my non friend hidden visibility post',async()=>{
                    const {response} = await TestContext.flows.feedFlow.addCommentToOtherNonFriendsPost('hidden')
                    await ResponseValidator.validateStatus(response,200)
                    await ResponseValidator.validateErrorMessage(response, 'Comment Added Successfully')
                })
            })

            describe('Comment On Post With Friends Visibility',()=>{

                test('Validate comment on my post with friends visibility',async()=>{
                    const {response} = await TestContext.flows.feedFlow.addCommentToMyPosts('friends visibility')
                    await ResponseValidator.validateStatus(response,200)
                    await ResponseValidator.validateErrorMessage(response, 'Comment Added Successfully')
                })
                test('Validate comment on my friends post with friend visibility',async()=>{
                    const {response} = await TestContext.flows.feedFlow.addCommentToMyFriendsPost('friends visibility')
                    await ResponseValidator.validateStatus(response,200)
                    await ResponseValidator.validateErrorMessage(response, 'Comment Added Successfully')
                })
                test('Validate comment on my friends friend post with hidden visibility',async()=>{
                    const {response} = await TestContext.flows.feedFlow.addCommentToMyFriendsPost('friends visibility')
                    await ResponseValidator.validateStatus(response,200)
                    await ResponseValidator.validateErrorMessage(response, 'Comment Added Successfully')
                })
                test('Validate comment on my non friend post with hidden visibility',async()=>{
                    const {response} = await TestContext.flows.feedFlow.addCommentToOtherNonFriendsPost('friends visibility')
                    await ResponseValidator.validateStatus(response,200)
                    await ResponseValidator.validateErrorMessage(response, 'Comment Added Successfully')
                })
            })

            describe('React To Friends Of Friend Visibility Post',()=>{

                test('Validate comment on my friends of friends visibility post',async()=>{
                    const {response} = await TestContext.flows.feedFlow.addCommentToMyPosts('fof visibility')
                    await ResponseValidator.validateStatus(response,200)
                    await ResponseValidator.validateErrorMessage(response, 'Comment Added Successfully')
                })
                test('Validate comment on my friends with friends of friend visibility',async()=>{
                    const {response} = await TestContext.flows.feedFlow.addCommentToMyFriendsPost('fof visibility')
                    await ResponseValidator.validateStatus(response,200)
                    await ResponseValidator.validateErrorMessage(response, 'Comment Added Successfully')
                })
                test('Validate comment on my friends friend post with friends of friend visibility',async()=>{
                    const {response} = await TestContext.flows.feedFlow.addCommentToMyFriendsPost('fof visibility')
                    await ResponseValidator.validateStatus(response,200)
                    await ResponseValidator.validateErrorMessage(response, 'Comment Added Successfully')
                })
                test('Validate comment on my non friend post with friend of friends visibility',async()=>{
                    const {response} = await TestContext.flows.feedFlow.addCommentToOtherNonFriendsPost('fof visibility')
                    await ResponseValidator.validateStatus(response,200)
                    await ResponseValidator.validateErrorMessage(response, 'Comment Added Successfully')
                })
            })

            describe('Comment On Deleted Post',()=>{

                test('Validate comment on my deleted post',async()=>{
                    const {response} = await TestContext.flows.feedFlow.addCommentToMyPosts('deleted')
                    await ResponseValidator.validateStatus(response,200)
                    await ResponseValidator.validateErrorMessage(response, 'Comment Added Successfully')
                })
                test('Validate comment on my friends deleted post',async()=>{
                    const {response} = await TestContext.flows.feedFlow.addCommentToMyFriendsPost('deleted')
                    await ResponseValidator.validateStatus(response,200)
                    await ResponseValidator.validateErrorMessage(response, 'Comment Added Successfully')
                })
                test('Validate comment on my friends friend deleted post',async()=>{
                    const {response} = await TestContext.flows.feedFlow.addCommentToMyFriendsPost('deleted')
                    await ResponseValidator.validateStatus(response,200)
                    await ResponseValidator.validateErrorMessage(response, 'Comment Added Successfully')
                })
                test('Validate comment my non friend deleted post',async()=>{
                    const {response} = await TestContext.flows.feedFlow.addCommentToOtherNonFriendsPost('deleted')
                    await ResponseValidator.validateStatus(response,200)
                    await ResponseValidator.validateErrorMessage(response, 'Comment Added Successfully')
                })
            })
    })



    describe('Reply To My Comment On Post',()=>{

    
            describe('Reply To My Comment On Publicly Visible Post',()=>{

                test('Validate reply to my comment on my public visibility post',async()=>{
                    const {response} = await TestContext.flows.feedFlow.replyMyCommentToMyPosts('public')
                    await ResponseValidator.validateStatus(response,200)
                    await ResponseValidator.validateErrorMessage(response, 'Comment Added Successfully')
                })
                test('Validate reply to my comment on my friends public visibility post',async()=>{
                    const {response} = await TestContext.flows.feedFlow.replyMyCommentOnMyFriendsPost('public')
                    await ResponseValidator.validateStatus(response,200)
                    await ResponseValidator.validateErrorMessage(response, 'Comment Added Successfully')
                })
                test('Validate reply to my comment on my friends friend public visibility post',async()=>{
                    const {response} = await TestContext.flows.feedFlow.replyMyCommentOnMyFriendsOfFriendsPost('public')
                    await ResponseValidator.validateStatus(response,200)
                    await ResponseValidator.validateErrorMessage(response, 'Comment Added Successfully')
                })
                test('Validate reply to my comment on my non friend public visibility post',async()=>{
                    const {response} = await TestContext.flows.feedFlow.replyMyCommentOfMyNonFriendsPost('public')
                    await ResponseValidator.validateStatus(response,200)
                    await ResponseValidator.validateErrorMessage(response, 'Comment Added Successfully')
                })

            })

            describe('Reply To My Comment On Post With Hidden Visibility',()=>{

                test('Validate reply to my comment on my hidden visibility post',async()=>{
                    const {response} = await TestContext.flows.feedFlow.replyMyCommentToMyPosts('hidden')
                    await ResponseValidator.validateStatus(response,200)
                    await ResponseValidator.validateErrorMessage(response, 'Comment Added Successfully')
                })
                test('Validate reply to my comment on my friends hidden visibility post',async()=>{
                    const {response} = await TestContext.flows.feedFlow.replyMyCommentOnMyFriendsPost('hidden')
                    await ResponseValidator.validateStatus(response,200)
                    await ResponseValidator.validateErrorMessage(response, 'Comment Added Successfully')
                })
                test('Validate reply to my comment on my friends friend hidden visibility post',async()=>{
                    const {response} = await TestContext.flows.feedFlow.replyMyCommentOnMyFriendsOfFriendsPost('hidden')
                    await ResponseValidator.validateStatus(response,200)
                    await ResponseValidator.validateErrorMessage(response, 'Comment Added Successfully')
                })
                test('Validate reply to my comment on my non friend hidden visibility post',async()=>{
                    const {response} = await TestContext.flows.feedFlow.replyMyCommentOfMyNonFriendsPost('hidden')
                    await ResponseValidator.validateStatus(response,200)
                    await ResponseValidator.validateErrorMessage(response, 'Comment Added Successfully')
                })
            })

            describe('Reply To My Comment On Post With Friends Visibility',()=>{

                test('Validate reply to my comment on my post with friends visibility',async()=>{
                    const {response} = await TestContext.flows.feedFlow.replyMyCommentToMyPosts('friends visibility')
                    await ResponseValidator.validateStatus(response,200)
                    await ResponseValidator.validateErrorMessage(response, 'Comment Added Successfully')
                })
                test('Validate reply to my comment on my friends post with friend visibility',async()=>{
                    const {response} = await TestContext.flows.feedFlow.replyMyCommentOnMyFriendsPost('friends visibility')
                    await ResponseValidator.validateStatus(response,200)
                    await ResponseValidator.validateErrorMessage(response, 'Comment Added Successfully')
                })
                test('Validate reply to my comment on my friends friend post with hidden visibility',async()=>{
                    const {response} = await TestContext.flows.feedFlow.replyMyCommentOnMyFriendsOfFriendsPost('friends visibility')
                    await ResponseValidator.validateStatus(response,200)
                    await ResponseValidator.validateErrorMessage(response, 'Comment Added Successfully')
                })
                test('Validate reply to my comment on my non friend post with hidden visibility',async()=>{
                    const {response} = await TestContext.flows.feedFlow.replyMyCommentOfMyNonFriendsPost('friends visibility')
                    await ResponseValidator.validateStatus(response,200)
                    await ResponseValidator.validateErrorMessage(response, 'Comment Added Successfully')
                })
            })

            describe('Reply To My Comment On Post With Friends Of Friend Visibility',()=>{

                test('Validate reply to my comment on my friends of friends visibility post',async()=>{
                    const {response} = await TestContext.flows.feedFlow.replyMyCommentToMyPosts('fof visibility')
                    await ResponseValidator.validateStatus(response,200)
                    await ResponseValidator.validateErrorMessage(response, 'Comment Added Successfully')
                })
                test('Validate reply to my comment on my friends with friends of friend visibility',async()=>{
                    const {response} = await TestContext.flows.feedFlow.replyMyCommentOnMyFriendsPost('fof visibility')
                    await ResponseValidator.validateStatus(response,200)
                    await ResponseValidator.validateErrorMessage(response, 'Comment Added Successfully')
                })
                test('Validate reply to my comment on my friends friend post with friends of friend visibility',async()=>{
                    const {response} = await TestContext.flows.feedFlow.replyMyCommentOnMyFriendsOfFriendsPost('fof visibility')
                    await ResponseValidator.validateStatus(response,200)
                    await ResponseValidator.validateErrorMessage(response, 'Comment Added Successfully')
                })
                test('Validate reply to my comment on my non friend post with friend of friends visibility',async()=>{
                    const {response} = await TestContext.flows.feedFlow.replyMyCommentOfMyNonFriendsPost('fof visibility')
                    await ResponseValidator.validateStatus(response,200)
                    await ResponseValidator.validateErrorMessage(response, 'Comment Added Successfully')
                })
            })

            describe('Reply To My Comment On Deleted Post',()=>{

                test('Validate reply to my comment on my deleted post',async()=>{
                    const {response} = await TestContext.flows.feedFlow.replyMyCommentToMyPosts('deleted')
                    await ResponseValidator.validateStatus(response,200)
                    await ResponseValidator.validateErrorMessage(response, 'Comment Added Successfully')
                })
                test('Validate reply to my comment on my friends deleted post',async()=>{
                    const {response} = await TestContext.flows.feedFlow.replyMyCommentOnMyFriendsPost('deleted')
                    await ResponseValidator.validateStatus(response,200)
                    await ResponseValidator.validateErrorMessage(response, 'Comment Added Successfully')
                })
                test('Validate reply to my comment on my friends friend deleted post',async()=>{
                    const {response} = await TestContext.flows.feedFlow.replyMyCommentOnMyFriendsOfFriendsPost('deleted')
                    await ResponseValidator.validateStatus(response,200)
                    await ResponseValidator.validateErrorMessage(response, 'Comment Added Successfully')
                })
                test('Validate reply to my comment my non friend deleted post',async()=>{
                    const {response} = await TestContext.flows.feedFlow.replyMyCommentOfMyNonFriendsPost('deleted')
                    await ResponseValidator.validateStatus(response,200)
                    await ResponseValidator.validateErrorMessage(response, 'Comment Added Successfully')
                })
            })
    })



    describe('Reply To Others Comment On Post',()=>{

            describe('Reply To Others Comment On Publicly Visible Post',()=>{

                test('Validate reply to others comment on my public visibility post',async()=>{
                    const {response} = await TestContext.flows.feedFlow.replyOthersCommentToMyPosts('public')
                    await ResponseValidator.validateStatus(response,200)
                    await ResponseValidator.validateErrorMessage(response, 'Comment Added Successfully')
                })
                test('Validate reply to others comment on my friends public visibility post',async()=>{
                    const {response} = await TestContext.flows.feedFlow.replyOthersCommentOnMyFriendsPost('public')
                    await ResponseValidator.validateStatus(response,200)
                    await ResponseValidator.validateErrorMessage(response, 'Comment Added Successfully')
                })
                test('Validate reply to others comment on my friends friend public visibility post',async()=>{
                    const {response} = await TestContext.flows.feedFlow.replyOthersCommentOnMyFriendsOfFriendsPost('public')
                    await ResponseValidator.validateStatus(response,200)
                    await ResponseValidator.validateErrorMessage(response, 'Comment Added Successfully')
                })
                test('Validate reply to others comment on my non friend public visibility post',async()=>{
                    const {response} = await TestContext.flows.feedFlow.replyOthersCommentOnMyNonFriendsPost('public')
                    await ResponseValidator.validateStatus(response,200)
                    await ResponseValidator.validateErrorMessage(response, 'Comment Added Successfully')
                })

            })

            describe('Reply To Others Comment On Post With Hidden Visibility',()=>{

                test('Validate reply to others comment on my hidden visibility post',async()=>{
                    const {response} = await TestContext.flows.feedFlow.replyOthersCommentToMyPosts('hidden')
                    await ResponseValidator.validateStatus(response,200)
                    await ResponseValidator.validateErrorMessage(response, 'Comment Added Successfully')
                })
                test('Validate reply to others comment on my friends hidden visibility post',async()=>{
                    const {response} = await TestContext.flows.feedFlow.replyOthersCommentOnMyFriendsPost('hidden')
                    await ResponseValidator.validateStatus(response,200)
                    await ResponseValidator.validateErrorMessage(response, 'Comment Added Successfully')
                })
                test('Validate reply to others comment on my friends friend hidden visibility post',async()=>{
                    const {response} = await TestContext.flows.feedFlow.replyOthersCommentOnMyFriendsOfFriendsPost('hidden')
                    await ResponseValidator.validateStatus(response,200)
                    await ResponseValidator.validateErrorMessage(response, 'Comment Added Successfully')
                })
                test('Validate reply to others comment on my non friend hidden visibility post',async()=>{
                    const {response} = await TestContext.flows.feedFlow.replyOthersCommentOnMyNonFriendsPost('hidden')
                    await ResponseValidator.validateStatus(response,200)
                    await ResponseValidator.validateErrorMessage(response, 'Comment Added Successfully')
                })
            })

            describe('Reply To Others Comment On Post With Friends Visibility',()=>{

                test('Validate reply to others comment on my post with friends visibility',async()=>{
                    const {response} = await TestContext.flows.feedFlow.replyOthersCommentToMyPosts('friends visibility')
                    await ResponseValidator.validateStatus(response,200)
                    await ResponseValidator.validateErrorMessage(response, 'Comment Added Successfully')
                })
                test('Validate reply to others comment on my friends post with friend visibility',async()=>{
                    const {response} = await TestContext.flows.feedFlow.replyOthersCommentOnMyFriendsPost('friends visibility')
                    await ResponseValidator.validateStatus(response,200)
                    await ResponseValidator.validateErrorMessage(response, 'Comment Added Successfully')
                })
                test('Validate reply to others comment on my friends friend post with hidden visibility',async()=>{
                    const {response} = await TestContext.flows.feedFlow.replyOthersCommentOnMyFriendsOfFriendsPost('friends visibility')
                    await ResponseValidator.validateStatus(response,200)
                    await ResponseValidator.validateErrorMessage(response, 'Comment Added Successfully')
                })
                test('Validate reply to others comment on my non friend post with hidden visibility',async()=>{
                    const {response} = await TestContext.flows.feedFlow.replyOthersCommentOnMyNonFriendsPost('friends visibility')
                    await ResponseValidator.validateStatus(response,200)
                    await ResponseValidator.validateErrorMessage(response, 'Comment Added Successfully')
                })
            })

            describe('Reply To Others Comment On Post With Friends Of Friend Visibility',()=>{

                test('Validate reply to others comment on my friends of friends visibility post',async()=>{
                    const {response} = await TestContext.flows.feedFlow.replyOthersCommentToMyPosts('fof visibility')
                    await ResponseValidator.validateStatus(response,200)
                    await ResponseValidator.validateErrorMessage(response, 'Comment Added Successfully')
                })
                test('Validate reply to others comment on my friends with friends of friend visibility',async()=>{
                    const {response} = await TestContext.flows.feedFlow.replyOthersCommentOnMyFriendsPost('fof visibility')
                    await ResponseValidator.validateStatus(response,200)
                    await ResponseValidator.validateErrorMessage(response, 'Comment Added Successfully')
                })
                test('Validate reply to others comment on my friends friend post with friends of friend visibility',async()=>{
                    const {response} = await TestContext.flows.feedFlow.replyOthersCommentOnMyFriendsOfFriendsPost('fof visibility')
                    await ResponseValidator.validateStatus(response,200)
                    await ResponseValidator.validateErrorMessage(response, 'Comment Added Successfully')
                })
                test('Validate reply to others comment on my non friend post with friend of friends visibility',async()=>{
                    const {response} = await TestContext.flows.feedFlow.replyOthersCommentOnMyNonFriendsPost('fof visibility')
                    await ResponseValidator.validateStatus(response,200)
                    await ResponseValidator.validateErrorMessage(response, 'Comment Added Successfully')
                })
            })

            describe('Reply To Others Comment On Deleted Post',()=>{

                test('Validate reply to others comment on my deleted post',async()=>{
                    const {response} = await TestContext.flows.feedFlow.replyOthersCommentToMyPosts('deleted')
                    await ResponseValidator.validateStatus(response,200)
                    await ResponseValidator.validateErrorMessage(response, 'Comment Added Successfully')
                })
                test('Validate reply to others comment on my friends deleted post',async()=>{
                    const {response} = await TestContext.flows.feedFlow.replyOthersCommentOnMyFriendsPost('deleted')
                    await ResponseValidator.validateStatus(response,200)
                    await ResponseValidator.validateErrorMessage(response, 'Comment Added Successfully')
                })
                test('Validate reply to others comment on my friends friend deleted post',async()=>{
                    const {response} = await TestContext.flows.feedFlow.replyOthersCommentOnMyFriendsOfFriendsPost('deleted')
                    await ResponseValidator.validateStatus(response,200)
                    await ResponseValidator.validateErrorMessage(response, 'Comment Added Successfully')
                })
                test('Validate reply to others comment my non friend deleted post',async()=>{
                    const {response} = await TestContext.flows.feedFlow.replyOthersCommentOnMyNonFriendsPost('deleted')
                    await ResponseValidator.validateStatus(response,200)
                    await ResponseValidator.validateErrorMessage(response, 'Comment Added Successfully')
                })
            })
    })


    describe('Update My Comment On Post',()=>{


            describe('Update My Comment On Publicly Visible Post',()=>{

                test('Validate update my comment on my public visibility post',async()=>{
                    const {response} = await TestContext.flows.feedFlow.updateMyCommentOnMyPosts('public')
                    await ResponseValidator.validateStatus(response,200)
                    await ResponseValidator.validateErrorMessage(response, 'Comment Added Successfully')
                })
                test('Validate update my comment on my friends public visibility post',async()=>{
                    const {response} = await TestContext.flows.feedFlow.updateMyCommentOnMyFriendsPost('public')
                    await ResponseValidator.validateStatus(response,200)
                    await ResponseValidator.validateErrorMessage(response, 'Comment Added Successfully')
                })
                test('Validate update my comment on my friends friend public visibility post',async()=>{
                    const {response} = await TestContext.flows.feedFlow.updateMyCommentOnMyFriendsOfFriendsPost('public')
                    await ResponseValidator.validateStatus(response,200)
                    await ResponseValidator.validateErrorMessage(response, 'Comment Added Successfully')
                })
                test('Validate update my comment on my non friend public visibility post',async()=>{
                    const {response} = await TestContext.flows.feedFlow.updateMyCommentOnMyNonFriendsPost('public')
                    await ResponseValidator.validateStatus(response,200)
                    await ResponseValidator.validateErrorMessage(response, 'Comment Added Successfully')
                })

            })

            describe('Update My Comment On Post With Hidden Visibility',()=>{

                test('Validate update my comment on my hidden visibility post',async()=>{
                    const {response} = await TestContext.flows.feedFlow.updateMyCommentOnMyPosts('hidden')
                    await ResponseValidator.validateStatus(response,200)
                    await ResponseValidator.validateErrorMessage(response, 'Comment Added Successfully')
                })
                test('Validate update my comment on my friends hidden visibility post',async()=>{
                    const {response} = await TestContext.flows.feedFlow.updateMyCommentOnMyFriendsPost('hidden')
                    await ResponseValidator.validateStatus(response,200)
                    await ResponseValidator.validateErrorMessage(response, 'Comment Added Successfully')
                })
                test('Validate update my comment on my friends friend hidden visibility post',async()=>{
                    const {response} = await TestContext.flows.feedFlow.updateMyCommentOnMyFriendsOfFriendsPost('hidden')
                    await ResponseValidator.validateStatus(response,200)
                    await ResponseValidator.validateErrorMessage(response, 'Comment Added Successfully')
                })
                test('Validate update my comment on my non friend hidden visibility post',async()=>{
                    const {response} = await TestContext.flows.feedFlow.updateMyCommentOnMyNonFriendsPost('hidden')
                    await ResponseValidator.validateStatus(response,200)
                    await ResponseValidator.validateErrorMessage(response, 'Comment Added Successfully')
                })
            })

            describe('Update My Comment On Post With Friends Visibility',()=>{

                test('Validate update my comment on my post with friends visibility',async()=>{
                    const {response} = await TestContext.flows.feedFlow.updateMyCommentOnMyPosts('friends visibility')
                    await ResponseValidator.validateStatus(response,200)
                    await ResponseValidator.validateErrorMessage(response, 'Comment Added Successfully')
                })
                test('Validate update my comment on my friends post with friend visibility',async()=>{
                    const {response} = await TestContext.flows.feedFlow.updateMyCommentOnMyFriendsPost('friends visibility')
                    await ResponseValidator.validateStatus(response,200)
                    await ResponseValidator.validateErrorMessage(response, 'Comment Added Successfully')
                })
                test('Validate update my comment on my friends friend post with hidden visibility',async()=>{
                    const {response} = await TestContext.flows.feedFlow.updateMyCommentOnMyFriendsOfFriendsPost('friends visibility')
                    await ResponseValidator.validateStatus(response,200)
                    await ResponseValidator.validateErrorMessage(response, 'Comment Added Successfully')
                })
                test('Validate update my comment on my non friend post with hidden visibility',async()=>{
                    const {response} = await TestContext.flows.feedFlow.updateMyCommentOnMyNonFriendsPost('friends visibility')
                    await ResponseValidator.validateStatus(response,200)
                    await ResponseValidator.validateErrorMessage(response, 'Comment Added Successfully')
                })
            })

            describe('Update My Comment On Post With Friends Of Friend Visibility',()=>{

                test('Validate update my comment on my friends of friends visibility post',async()=>{
                    const {response} = await TestContext.flows.feedFlow.updateMyCommentOnMyPosts('fof visibility')
                    await ResponseValidator.validateStatus(response,200)
                    await ResponseValidator.validateErrorMessage(response, 'Comment Added Successfully')
                })
                test('Validate update my comment on my friends with friends of friend visibility',async()=>{
                    const {response} = await TestContext.flows.feedFlow.updateMyCommentOnMyFriendsPost('fof visibility')
                    await ResponseValidator.validateStatus(response,200)
                    await ResponseValidator.validateErrorMessage(response, 'Comment Added Successfully')
                })
                test('Validate update my comment on my friends friend post with friends of friend visibility',async()=>{
                    const {response} = await TestContext.flows.feedFlow.updateMyCommentOnMyFriendsOfFriendsPost('fof visibility')
                    await ResponseValidator.validateStatus(response,200)
                    await ResponseValidator.validateErrorMessage(response, 'Comment Added Successfully')
                })
                test('Validate update my comment on my non friend post with friend of friends visibility',async()=>{
                    const {response} = await TestContext.flows.feedFlow.updateMyCommentOnMyNonFriendsPost('fof visibility')
                    await ResponseValidator.validateStatus(response,200)
                    await ResponseValidator.validateErrorMessage(response, 'Comment Added Successfully')
                })
            })

            describe('Update My Comment On Deleted Post',()=>{

                test('Validate update my comment on my deleted post',async()=>{
                    const {response} = await TestContext.flows.feedFlow.updateMyCommentOnMyPosts('deleted')
                    await ResponseValidator.validateStatus(response,200)
                    await ResponseValidator.validateErrorMessage(response, 'Comment Added Successfully')
                })
                test('Validate update my comment on my friends deleted post',async()=>{
                    const {response} = await TestContext.flows.feedFlow.updateMyCommentOnMyFriendsPost('deleted')
                    await ResponseValidator.validateStatus(response,200)
                    await ResponseValidator.validateErrorMessage(response, 'Comment Added Successfully')
                })
                test('Validate update my comment on my friends friend deleted post',async()=>{
                    const {response} = await TestContext.flows.feedFlow.updateMyCommentOnMyFriendsOfFriendsPost('deleted')
                    await ResponseValidator.validateStatus(response,200)
                    await ResponseValidator.validateErrorMessage(response, 'Comment Added Successfully')
                })
                test('Validate update my comment my non friend deleted post',async()=>{
                    const {response} = await TestContext.flows.feedFlow.updateMyCommentOnMyNonFriendsPost('deleted')
                    await ResponseValidator.validateStatus(response,200)
                    await ResponseValidator.validateErrorMessage(response, 'Comment Added Successfully')
                })
            })
    })


    describe('Update Others Comment On Post',()=>{


            describe('Update Others Comment On Publicly Visible Post',()=>{

                test('Validate update others comment on my public visibility post',async()=>{
                    const {response} = await TestContext.flows.feedFlow.updateOthersCommentOnMyPosts('public')
                    await ResponseValidator.validateStatus(response,200)
                    await ResponseValidator.validateErrorMessage(response, 'Comment Added Successfully')
                })
                test('Validate update others comment on my friends public visibility post',async()=>{
                    const {response} = await TestContext.flows.feedFlow.updateOthersCommentOnMyFriendsPost('public')
                    await ResponseValidator.validateStatus(response,200)
                    await ResponseValidator.validateErrorMessage(response, 'Comment Added Successfully')
                })
                test('Validate update others comment on my friends friend public visibility post',async()=>{
                    const {response} = await TestContext.flows.feedFlow.updateOthersCommentOnMyFriendsOfFriendsPost('public')
                    await ResponseValidator.validateStatus(response,200)
                    await ResponseValidator.validateErrorMessage(response, 'Comment Added Successfully')
                })
                test('Validate update others comment on my non friend public visibility post',async()=>{
                    const {response} = await TestContext.flows.feedFlow.updateOthersCommentOnMyNonFriendsPost('public')
                    await ResponseValidator.validateStatus(response,200)
                    await ResponseValidator.validateErrorMessage(response, 'Comment Added Successfully')
                })

            })

            describe('Update Others Comment On Post With Hidden Visibility',()=>{

                test('Validate update others comment on my hidden visibility post',async()=>{
                    const {response} = await TestContext.flows.feedFlow.updateOthersCommentOnMyPosts('hidden')
                    await ResponseValidator.validateStatus(response,200)
                    await ResponseValidator.validateErrorMessage(response, 'Comment Added Successfully')
                })
                test('Validate update others comment on my friends hidden visibility post',async()=>{
                    const {response} = await TestContext.flows.feedFlow.updateOthersCommentOnMyFriendsPost('hidden')
                    await ResponseValidator.validateStatus(response,200)
                    await ResponseValidator.validateErrorMessage(response, 'Comment Added Successfully')
                })
                test('Validate update others comment on my friends friend hidden visibility post',async()=>{
                    const {response} = await TestContext.flows.feedFlow.updateOthersCommentOnMyFriendsOfFriendsPost('hidden')
                    await ResponseValidator.validateStatus(response,200)
                    await ResponseValidator.validateErrorMessage(response, 'Comment Added Successfully')
                })
                test('Validate update others comment on my non friend hidden visibility post',async()=>{
                    const {response} = await TestContext.flows.feedFlow.updateOthersCommentOnMyNonFriendsPost('hidden')
                    await ResponseValidator.validateStatus(response,200)
                    await ResponseValidator.validateErrorMessage(response, 'Comment Added Successfully')
                })
            })

            describe('Update Others Comment On Post With Friends Visibility',()=>{

                test('Validate update others comment on my post with friends visibility',async()=>{
                    const {response} = await TestContext.flows.feedFlow.updateOthersCommentOnMyPosts('friends visibility')
                    await ResponseValidator.validateStatus(response,200)
                    await ResponseValidator.validateErrorMessage(response, 'Comment Added Successfully')
                })
                test('Validate update others comment on my friends post with friend visibility',async()=>{
                    const {response} = await TestContext.flows.feedFlow.updateOthersCommentOnMyFriendsPost('friends visibility')
                    await ResponseValidator.validateStatus(response,200)
                    await ResponseValidator.validateErrorMessage(response, 'Comment Added Successfully')
                })
                test('Validate update others comment on my friends friend post with hidden visibility',async()=>{
                    const {response} = await TestContext.flows.feedFlow.updateOthersCommentOnMyFriendsOfFriendsPost('friends visibility')
                    await ResponseValidator.validateStatus(response,200)
                    await ResponseValidator.validateErrorMessage(response, 'Comment Added Successfully')
                })
                test('Validate update others comment on my non friend post with hidden visibility',async()=>{
                    const {response} = await TestContext.flows.feedFlow.updateOthersCommentOnMyNonFriendsPost('friends visibility')
                    await ResponseValidator.validateStatus(response,200)
                    await ResponseValidator.validateErrorMessage(response, 'Comment Added Successfully')
                })
            })

            describe('Update Others Comment On Post With Friends Of Friend Visibility',()=>{

                test('Validate update others comment on my friends of friends visibility post',async()=>{
                    const {response} = await TestContext.flows.feedFlow.updateOthersCommentOnMyPosts('fof visibility')
                    await ResponseValidator.validateStatus(response,200)
                    await ResponseValidator.validateErrorMessage(response, 'Comment Added Successfully')
                })
                test('Validate update others comment on my friends with friends of friend visibility',async()=>{
                    const {response} = await TestContext.flows.feedFlow.updateOthersCommentOnMyFriendsPost('fof visibility')
                    await ResponseValidator.validateStatus(response,200)
                    await ResponseValidator.validateErrorMessage(response, 'Comment Added Successfully')
                })
                test('Validate update others comment on my friends friend post with friends of friend visibility',async()=>{
                    const {response} = await TestContext.flows.feedFlow.updateOthersCommentOnMyFriendsOfFriendsPost('fof visibility')
                    await ResponseValidator.validateStatus(response,200)
                    await ResponseValidator.validateErrorMessage(response, 'Comment Added Successfully')
                })
                test('Validate update others comment on my non friend post with friend of friends visibility',async()=>{
                    const {response} = await TestContext.flows.feedFlow.updateOthersCommentOnMyNonFriendsPost('fof visibility')
                    await ResponseValidator.validateStatus(response,200)
                    await ResponseValidator.validateErrorMessage(response, 'Comment Added Successfully')
                })
            })

            describe('Update Others Comment On Deleted Post',()=>{

                test('Validate update others comment on my deleted post',async()=>{
                    const {response} = await TestContext.flows.feedFlow.updateOthersCommentOnMyPosts('deleted')
                    await ResponseValidator.validateStatus(response,200)
                    await ResponseValidator.validateErrorMessage(response, 'Comment Added Successfully')
                })
                test('Validate update others comment on my friends deleted post',async()=>{
                    const {response} = await TestContext.flows.feedFlow.updateOthersCommentOnMyFriendsPost('deleted')
                    await ResponseValidator.validateStatus(response,200)
                    await ResponseValidator.validateErrorMessage(response, 'Comment Added Successfully')
                })
                test('Validate update others comment on my friends friend deleted post',async()=>{
                    const {response} = await TestContext.flows.feedFlow.updateOthersCommentOnMyFriendsOfFriendsPost('deleted')
                    await ResponseValidator.validateStatus(response,200)
                    await ResponseValidator.validateErrorMessage(response, 'Comment Added Successfully')
                })
                test('Validate update others comment my non friend deleted post',async()=>{
                    const {response} = await TestContext.flows.feedFlow.updateOthersCommentOnMyNonFriendsPost('deleted')
                    await ResponseValidator.validateStatus(response,200)
                    await ResponseValidator.validateErrorMessage(response, 'Comment Added Successfully')
                })
            })
    })
})