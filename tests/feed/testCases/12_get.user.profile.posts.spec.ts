import ResponseValidator from "src/api/response.validator"
import { TestContext } from "src/context/test.context"

describe('Validate GET /feed/post/profile?userId Endpoint',()=>{

    describe('Fetch My Posts In Profile',()=>{
            test('Validate Get my Posts',async()=>{
                const {response} = await TestContext.services.feedService.getPostsInProfile({
                    userId:TestContext.initialMemuuid
                })
                await ResponseValidator.validateStatus(response,200)
                await ResponseValidator.validateErrorMessage(response,'Successfully fetched posts.')
            })
    })

    describe('Fetch Other UserPosts In Profile',()=>{
            test('Validate Getting My Friends Profile Posts',async()=>{
                const {postId,userId} = await TestContext.services.feedRepo.getMyFriendsRandomPostWithFriendsVisibility(TestContext.initialMemuuid)
                const {response} = await TestContext.services.feedService.getPostsInProfile({
                    userId:userId
                })
                await ResponseValidator.validateStatus(response,200)
                await ResponseValidator.validateErrorMessage(response,'Successfully fetched posts.')
            })
            test('Validate Getting My Friends Friend Profile Posts',async()=>{
                const {postId,userId} = await TestContext.services.feedRepo.getMyFriendsOfFriendsRandomPostWithFriendsOfFriendVisibility(TestContext.initialMemuuid)
                const {response} = await TestContext.services.feedService.getPostsInProfile({
                    userId: userId
                })
                await ResponseValidator.validateStatus(response,200)
                await ResponseValidator.validateErrorMessage(response,'Successfully fetched posts.')
            })
            test('Validate Getting Non Friends Profile Posts',async()=>{
                const {postId,userId} = await TestContext.services.feedRepo.getMyNonFriendsRandomPostWithFriendsVisibility(TestContext.initialMemuuid)
                const {response} = await TestContext.services.feedService.getPostsInProfile({
                    userId: userId
                })
                await ResponseValidator.validateStatus(response,400)
                await ResponseValidator.validateErrorMessage(response,'Successfully fetched posts.')
            })
    })

})