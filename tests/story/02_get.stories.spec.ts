import ResponseValidator from "../../src/api/response.validator"
import { TestContext } from "../../src/context/test.context"

describe('Validate GET /stories',()=>{

    test('Validate Fetching Stories - Valid query params',async()=>{
        const {response} = await TestContext.services.storyService.fetchStories({
            cursor:0,
            limit:1,
            refresh:true
        })
        await ResponseValidator.validateStatus(response,200)
        await ResponseValidator.validateErrorMessage(response,'Stories fetched successfully')
    })

    test('Validate Fetching Stories In Cursor 0 and limited to 0',async()=>{
        const {response} = await TestContext.services.storyService.fetchStories({
            cursor:0,
            limit:0
        })
        await ResponseValidator.validateStatus(response,200)
        await ResponseValidator.validateErrorMessage(response,'Stories fetched successfully')
    })

    test('Validate Fetching Stories In Cursor 1 and limited to 1',async()=>{
        const {response} = await TestContext.services.storyService.fetchStories({
            cursor:1,
            limit:1
        })
        await ResponseValidator.validateStatus(response,200)
        await ResponseValidator.validateErrorMessage(response,'Stories fetched successfully')
    })

    test('Validate Fetching Stories In Cursor 2 and limited to 0',async()=>{
        const {response} = await TestContext.services.storyService.fetchStories({
            cursor:2,
            limit:0
        })
        await ResponseValidator.validateStatus(response,200)
        await ResponseValidator.validateErrorMessage(response,'Stories fetched successfully')
    })

    test('Validate Fetching Stories In Cursor 2 and limited to 10',async()=>{
        const {response} = await TestContext.services.storyService.fetchStories({
            cursor:2,
            limit:10
        })
        await ResponseValidator.validateStatus(response,200)
        await ResponseValidator.validateErrorMessage(response,'Stories fetched successfully')
    })

    test('Validate Fetching Stories In Cursor 20 and limited to 10',async()=>{
        const {response} = await TestContext.services.storyService.fetchStories({
            cursor:20,
            limit:10
        })
        await ResponseValidator.validateStatus(response,200)
        await ResponseValidator.validateErrorMessage(response,'Stories fetched successfully')
    })

    test('Validate Fetching Stories In Cursor 20 and limited to 100',async()=>{
        const {response} = await TestContext.services.storyService.fetchStories({
            cursor:20,
            limit:100
        })
        await ResponseValidator.validateStatus(response,200)
        await ResponseValidator.validateErrorMessage(response,'Stories fetched successfully')
    })

    test('Validate Fetching Stories With No Query Param',async()=>{
        const {response} = await TestContext.services.storyService.fetchStories({})
        await ResponseValidator.validateStatus(response,200)
        await ResponseValidator.validateErrorMessage(response,'Stories fetched successfully')
    })
})