import ResponseValidator from "../../src/api/response.validator"
import { TestContext } from "../../src/context/test.context"

describe('Validate GET /feed/post/profile?userId Endpoint',()=>{

    describe('Fetch My Posts In Profile',()=>{
            test('Validate Get my Posts',async()=>{
                const {response} = await TestContext.services.feedService.getPostsInProfile()
                await ResponseValidator.validateStatus(response,201)
                await ResponseValidator.validateErrorMessage(response,'Successfully Bookmarked')
            })
    })

    describe('Fetch Other UserPosts In Profile',()=>{
            test('Validate Getting My Friends Profile Posts',async()=>{
                const {response} = await TestContext.services.feedService.getPostsInProfile()
                await ResponseValidator.validateStatus(response,201)
                await ResponseValidator.validateErrorMessage(response,'Successfully Bookmarked')
            })
            test('Validate Getting My Friends Friend Profile Posts',async()=>{
                const {response} = await TestContext.services.feedService.getPostsInProfile()
                await ResponseValidator.validateStatus(response,201)
                await ResponseValidator.validateErrorMessage(response,'Successfully Bookmarked')
            })
            test('Validate Getting Non Friends Profile Posts',async()=>{
                const {response} = await TestContext.services.feedService.getPostsInProfile()
                await ResponseValidator.validateStatus(response,201)
                await ResponseValidator.validateErrorMessage(response,'Successfully Bookmarked')
            })
    })

})