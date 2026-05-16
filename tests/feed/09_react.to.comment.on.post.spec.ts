import ResponseValidator from "api/response.validator"
import { TestContext } from "src/context/test.context"

describe('Validate POST /feed/post/comment/react',()=>{


    describe('React To My Comment On Post',()=>{

    
            describe('React To My Comment On Publicly Visible Post',()=>{

                test('Validate react to my comment on my public visibility post',async()=>{
                    const {response} = await TestContext.flows.feedFlow.reactToMyCommentOnMyPosts('public')
                    await ResponseValidator.validateStatus(response,200)
                    await ResponseValidator.validateErrorMessage(response,'Reaction Saved')
                })
                test('Validate react to my comment on my friends public visibility post',async()=>{
                    const {response} = await TestContext.flows.feedFlow.reactToMyCommentOnMyFriendsPost('public')
                    await ResponseValidator.validateStatus(response,200)
                    await ResponseValidator.validateErrorMessage(response,'Reaction Saved')
                })
                test('Validate react to my comment on my friends friend public visibility post',async()=>{
                    const {response} = await TestContext.flows.feedFlow.reactToMyCommentOnMyFriendsOfFriendsPost('public')
                    await ResponseValidator.validateStatus(response,200)
                    await ResponseValidator.validateErrorMessage(response,'Reaction Saved')
                })
                test('Validate react to my comment on my non friend public visibility post',async()=>{
                    const {response} = await TestContext.flows.feedFlow.reactToMyCommentOnMyNonFriendsPost('public')
                    await ResponseValidator.validateStatus(response,200)
                    await ResponseValidator.validateErrorMessage(response,'Reaction Saved')
                })

            })

            describe('React To My Comment On Post With Hidden Visibility',()=>{

                test('Validate react to my comment on my hidden visibility post',async()=>{
                    const {response} = await TestContext.flows.feedFlow.reactToMyCommentOnMyPosts('hidden')
                    await ResponseValidator.validateStatus(response,200)
                    await ResponseValidator.validateErrorMessage(response,'Reaction Saved')
                })
                test('Validate react to my comment on my friends hidden visibility post',async()=>{
                    const {response} = await TestContext.flows.feedFlow.reactToMyCommentOnMyFriendsPost('hidden')
                    await ResponseValidator.validateStatus(response,200)
                    await ResponseValidator.validateErrorMessage(response,'Reaction Saved')
                })
                test('Validate react to my comment on my friends friend hidden visibility post',async()=>{
                    const {response} = await TestContext.flows.feedFlow.reactToMyCommentOnMyFriendsOfFriendsPost('hidden')
                    await ResponseValidator.validateStatus(response,200)
                    await ResponseValidator.validateErrorMessage(response,'Reaction Saved')
                })
                test('Validate react to my comment on my non friend hidden visibility post',async()=>{
                    const {response} = await TestContext.flows.feedFlow.reactToMyCommentOnMyNonFriendsPost('hidden')
                    await ResponseValidator.validateStatus(response,200)
                    await ResponseValidator.validateErrorMessage(response,'Reaction Saved')
                })
            })

            describe('React To My Comment On Post With Friends Visibility',()=>{

                test('Validate react to my comment on my post with friends visibility',async()=>{
                    const {response} = await TestContext.flows.feedFlow.reactToMyCommentOnMyPosts('friends visibility')
                    await ResponseValidator.validateStatus(response,200)
                    await ResponseValidator.validateErrorMessage(response,'Reaction Saved')
                })
                test('Validate react to my comment on my friends post with friend visibility',async()=>{
                    const {response} = await TestContext.flows.feedFlow.reactToMyCommentOnMyFriendsPost('friends visibility')
                    await ResponseValidator.validateStatus(response,200)
                    await ResponseValidator.validateErrorMessage(response,'Reaction Saved')
                })
                test('Validate react to my comment on my friends friend post with hidden visibility',async()=>{
                    const {response} = await TestContext.flows.feedFlow.reactToMyCommentOnMyFriendsOfFriendsPost('friends visibility')
                    await ResponseValidator.validateStatus(response,200)
                    await ResponseValidator.validateErrorMessage(response,'Reaction Saved')
                })
                test('Validate react to my comment on my non friend post with hidden visibility',async()=>{
                    const {response} = await TestContext.flows.feedFlow.reactToMyCommentOnMyNonFriendsPost('friends visibility')
                    await ResponseValidator.validateStatus(response,200)
                    await ResponseValidator.validateErrorMessage(response,'Reaction Saved')
                })
            })

            describe('React To My Comment On Post With Friends Of Friend Visibility',()=>{

                test('Validate react to my comment on my friends of friends visibility post',async()=>{
                    const {response} = await TestContext.flows.feedFlow.reactToMyCommentOnMyPosts('fof visibility')
                    await ResponseValidator.validateStatus(response,200)
                    await ResponseValidator.validateErrorMessage(response,'Reaction Saved')
                })
                test('Validate react to my comment on my friends with friends of friend visibility',async()=>{
                    const {response} = await TestContext.flows.feedFlow.reactToMyCommentOnMyFriendsPost('fof visibility')
                    await ResponseValidator.validateStatus(response,200)
                    await ResponseValidator.validateErrorMessage(response,'Reaction Saved')
                })
                test('Validate react to my comment on my friends friend post with friends of friend visibility',async()=>{
                    const {response} = await TestContext.flows.feedFlow.reactToMyCommentOnMyFriendsOfFriendsPost('fof visibility')
                    await ResponseValidator.validateStatus(response,200)
                    await ResponseValidator.validateErrorMessage(response,'Reaction Saved')
                })
                test('Validate react to my comment on my non friend post with friend of friends visibility',async()=>{
                    const {response} = await TestContext.flows.feedFlow.reactToMyCommentOnMyNonFriendsPost('fof visibility')
                    await ResponseValidator.validateStatus(response,200)
                    await ResponseValidator.validateErrorMessage(response,'Reaction Saved')
                })
            })

            describe('React To My Comment On Deleted Post',()=>{

                test('Validate react to my comment on my deleted post',async()=>{
                    const {response} = await TestContext.flows.feedFlow.reactToMyCommentOnMyPosts('deleted')
                    await ResponseValidator.validateStatus(response,200)
                    await ResponseValidator.validateErrorMessage(response,'Reaction Saved')
                })
                test('Validate react to my comment on my friends deleted post',async()=>{
                    const {response} = await TestContext.flows.feedFlow.reactToMyCommentOnMyFriendsPost('deleted')
                    await ResponseValidator.validateStatus(response,200)
                    await ResponseValidator.validateErrorMessage(response,'Reaction Saved')
                })
                test('Validate react to my comment on my friends friend deleted post',async()=>{
                    const {response} = await TestContext.flows.feedFlow.reactToMyCommentOnMyFriendsOfFriendsPost('deleted')
                    await ResponseValidator.validateStatus(response,200)
                    await ResponseValidator.validateErrorMessage(response,'Reaction Saved')
                })
                test('Validate react to my comment my non friend deleted post',async()=>{
                    const {response} = await TestContext.flows.feedFlow.reactToMyCommentOnMyNonFriendsPost('deleted')
                    await ResponseValidator.validateStatus(response,200)
                    await ResponseValidator.validateErrorMessage(response,'Reaction Saved')
                })
            })
    })



    describe('React To Others Comment On Post',()=>{

            describe('React To Others Comment On Publicly Visible Post',()=>{

                test('Validate react to others comment on my public visibility post',async()=>{
                    const {response} = await TestContext.flows.feedFlow.reactToOthersCommentOnMyPublicPosts('public')
                    await ResponseValidator.validateStatus(response,200)
                    await ResponseValidator.validateErrorMessage(response,'Reaction Saved')
                })
                test('Validate react to others comment on my friends public visibility post',async()=>{
                    const {response} = await TestContext.flows.feedFlow.reactToOthersCommentOnMyFriendsPost('public')
                    await ResponseValidator.validateStatus(response,200)
                    await ResponseValidator.validateErrorMessage(response,'Reaction Saved')
                })
                test('Validate react to others comment on my friends friend public visibility post',async()=>{
                    const {response} = await TestContext.flows.feedFlow.reactToOthersCommentOnMyFriendsOfFriendsPublicPost('public')
                    await ResponseValidator.validateStatus(response,200)
                    await ResponseValidator.validateErrorMessage(response,'Reaction Saved')
                })
                test('Validate react to others comment on my non friend public visibility post',async()=>{
                    const {response} = await TestContext.flows.feedFlow.reactToOthersCommentOnMyNonFriendsPost('public')
                    await ResponseValidator.validateStatus(response,200)
                    await ResponseValidator.validateErrorMessage(response,'Reaction Saved')
                })

            })

            describe('React To Others Comment On Post With Hidden Visibility',()=>{

                test('Validate react to others comment on my hidden visibility post',async()=>{
                    const {response} = await TestContext.flows.feedFlow.reactToOthersCommentOnMyPublicPosts('hidden')
                    await ResponseValidator.validateStatus(response,200)
                    await ResponseValidator.validateErrorMessage(response,'Reaction Saved')
                })
                test('Validate react to others comment on my friends hidden visibility post',async()=>{
                    const {response} = await TestContext.flows.feedFlow.reactToOthersCommentOnMyFriendsPost('hidden')
                    await ResponseValidator.validateStatus(response,200)
                    await ResponseValidator.validateErrorMessage(response,'Reaction Saved')
                })
                test('Validate react to others comment on my friends friend hidden visibility post',async()=>{
                    const {response} = await TestContext.flows.feedFlow.reactToOthersCommentOnMyFriendsOfFriendsPublicPost('hidden')
                    await ResponseValidator.validateStatus(response,200)
                    await ResponseValidator.validateErrorMessage(response,'Reaction Saved')
                })
                test('Validate react to others comment on my non friend hidden visibility post',async()=>{
                    const {response} = await TestContext.flows.feedFlow.reactToOthersCommentOnMyNonFriendsPost('hidden')
                    await ResponseValidator.validateStatus(response,200)
                    await ResponseValidator.validateErrorMessage(response,'Reaction Saved')
                })
            })

            describe('React To Others Comment On Post With Friends Visibility',()=>{

                test('Validate react to others comment on my post with friends visibility',async()=>{
                    const {response} = await TestContext.flows.feedFlow.reactToOthersCommentOnMyPublicPosts('friends visibility')
                    await ResponseValidator.validateStatus(response,200)
                    await ResponseValidator.validateErrorMessage(response,'Reaction Saved')
                })
                test('Validate react to others comment on my friends post with friend visibility',async()=>{
                    const {response} = await TestContext.flows.feedFlow.reactToOthersCommentOnMyFriendsPost('friends visibility')
                    await ResponseValidator.validateStatus(response,200)
                    await ResponseValidator.validateErrorMessage(response,'Reaction Saved')
                })
                test('Validate react to others comment on my friends friend post with hidden visibility',async()=>{
                    const {response} = await TestContext.flows.feedFlow.reactToOthersCommentOnMyFriendsOfFriendsPublicPost('friends visibility')
                    await ResponseValidator.validateStatus(response,200)
                    await ResponseValidator.validateErrorMessage(response,'Reaction Saved')
                })
                test('Validate react to others comment on my non friend post with hidden visibility',async()=>{
                    const {response} = await TestContext.flows.feedFlow.reactToOthersCommentOnMyNonFriendsPost('friends visibility')
                    await ResponseValidator.validateStatus(response,200)
                    await ResponseValidator.validateErrorMessage(response,'Reaction Saved')
                })
            })

            describe('React To Others Comment On Post With Friends Of Friend Visibility',()=>{

                test('Validate react to others comment on my friends of friends visibility post',async()=>{
                    const {response} = await TestContext.flows.feedFlow.reactToOthersCommentOnMyPublicPosts('fof visibility')
                    await ResponseValidator.validateStatus(response,200)
                    await ResponseValidator.validateErrorMessage(response,'Reaction Saved')
                })
                test('Validate react to others comment on my friends with friends of friend visibility',async()=>{
                    const {response} = await TestContext.flows.feedFlow.reactToOthersCommentOnMyFriendsPost('fof visibility')
                    await ResponseValidator.validateStatus(response,200)
                    await ResponseValidator.validateErrorMessage(response,'Reaction Saved')
                })
                test('Validate react to others comment on my friends friend post with friends of friend visibility',async()=>{
                    const {response} = await TestContext.flows.feedFlow.reactToOthersCommentOnMyFriendsOfFriendsPublicPost('fof visibility')
                    await ResponseValidator.validateStatus(response,200)
                    await ResponseValidator.validateErrorMessage(response,'Reaction Saved')
                })
                test('Validate react to others comment on my non friend post with friend of friends visibility',async()=>{
                    const {response} = await TestContext.flows.feedFlow.reactToOthersCommentOnMyNonFriendsPost('fof visibility')
                    await ResponseValidator.validateStatus(response,200)
                    await ResponseValidator.validateErrorMessage(response,'Reaction Saved')
                })
            })

            describe('React To Others Comment On Deleted Post',()=>{

                test('Validate react to others comment on my deleted post',async()=>{
                    const {response} = await TestContext.flows.feedFlow.reactToOthersCommentOnMyPublicPosts('deleted')
                    await ResponseValidator.validateStatus(response,200)
                    await ResponseValidator.validateErrorMessage(response,'Reaction Saved')
                })
                test('Validate react to others comment on my friends deleted post',async()=>{
                    const {response} = await TestContext.flows.feedFlow.reactToOthersCommentOnMyFriendsPost('deleted')
                    await ResponseValidator.validateStatus(response,200)
                    await ResponseValidator.validateErrorMessage(response,'Reaction Saved')
                })
                test('Validate react to others comment on my friends friend deleted post',async()=>{
                    const {response} = await TestContext.flows.feedFlow.reactToOthersCommentOnMyFriendsOfFriendsPublicPost('deleted')
                    await ResponseValidator.validateStatus(response,200)
                    await ResponseValidator.validateErrorMessage(response,'Reaction Saved')
                })
                test('Validate react to others comment my non friend deleted post',async()=>{
                    const {response} = await TestContext.flows.feedFlow.reactToOthersCommentOnMyNonFriendsPost('deleted')
                    await ResponseValidator.validateStatus(response,200)
                    await ResponseValidator.validateErrorMessage(response,'Reaction Saved')
                })
            })
    })
})