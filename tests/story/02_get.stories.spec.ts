import ResponseValidator from "../../src/api/response.validator"
import { TestContext } from "../../src/context/test.context"

describe('Validate GET /stories',()=>{

    test('Validate Fetching Stories In Page 1 and limited to 1',async()=>{
        const {response} = await TestContext.services.storyService.fetchStories({
            pageNo:1,
            limit:1
        })
        await ResponseValidator.validateStatus(response,201)
        await ResponseValidator.validateErrorMessage(response,'Stories Successfully Fetched')
    })

    test('Validate Fetching Stories In Page 0 and limited to 0',async()=>{
        const {response} = await TestContext.services.storyService.fetchStories({
            pageNo:0,
            limit:0
        })
        await ResponseValidator.validateStatus(response,201)
        await ResponseValidator.validateErrorMessage(response,'Stories Successfully Fetched')
    })

    test('Validate Fetching Stories In Page 10 and limited to 0',async()=>{
        const {response} = await TestContext.services.storyService.fetchStories({
            pageNo:10,
            limit:0
        })
        await ResponseValidator.validateStatus(response,201)
        await ResponseValidator.validateErrorMessage(response,'Stories Successfully Fetched')
    })

    test('Validate Fetching Stories In Page 2 and limited to 100',async()=>{
        const {response} = await TestContext.services.storyService.fetchStories({
            pageNo:2,
            limit:100
        })
        await ResponseValidator.validateStatus(response,201)
        await ResponseValidator.validateErrorMessage(response,'Stories Successfully Fetched')
    })

    test('Validate Fetching Stories With No Query Param',async()=>{
        const {response} = await TestContext.services.storyService.fetchStories({})
        await ResponseValidator.validateStatus(response,201)
        await ResponseValidator.validateErrorMessage(response,'Stories Successfully Fetched')
    })
})