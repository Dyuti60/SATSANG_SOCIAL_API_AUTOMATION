import ResponseValidator from "api/response.validator"
import { TestContext } from "src/context/test.context"

describe('Validate GET /feed/post/bookmark?pageNo Endpoint',()=>{

    test('Validate Get Bookmarked Posts in Page 1',async()=>{
        const {response} = await TestContext.services.feedService.getBookmarkedPosts({
            pageNo:1
        })
        await ResponseValidator.validateStatus(response,200)
        await ResponseValidator.validateErrorMessage(response,'Successfully fetched Post-Bookmarks')
    })

    test('Validate Get Bookmarked Posts in Page 0',async()=>{
        const {response} = await TestContext.services.feedService.getBookmarkedPosts({
            pageNo:0
        })
        await ResponseValidator.validateStatus(response,200)
        await ResponseValidator.validateErrorMessage(response,'Successfully fetched Post-Bookmarks')
    })

    test('Validate Get Bookmarked Posts in Page 100',async()=>{
        const {response} = await TestContext.services.feedService.getBookmarkedPosts({
            pageNo:100
        })
        await ResponseValidator.validateStatus(response,200)
        await ResponseValidator.validateErrorMessage(response,'Successfully fetched Post-Bookmarks')
    })

    test('Validate Get Bookmarked Posts - no page payload',async()=>{
        const {response} = await TestContext.services.feedService.getBookmarkedPosts({})
        await ResponseValidator.validateStatus(response,200)
        await ResponseValidator.validateErrorMessage(response,'Successfully fetched Post-Bookmarks')
    })
})