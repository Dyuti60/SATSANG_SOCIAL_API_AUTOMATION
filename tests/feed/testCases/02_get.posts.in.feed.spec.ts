import ResponseValidator from "src/api/response.validator"
import { TestContext } from "src/context/test.context"

describe('Validate GET /feed/post',()=>{

    test('Validate fetching user posts in feed',async()=>{
        const {response} = await TestContext.services.feedService.getPostInFeed()
        await ResponseValidator.validateStatus(response,200)
        await ResponseValidator.validateErrorMessage(response,'Successfully fetched posts.')
    })
})