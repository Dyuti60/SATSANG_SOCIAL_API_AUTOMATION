import ResponseValidator from "src/api/response.validator"
import { TestContext } from "src/context/test.context"

describe('Validate GET /feed/post/visibility',()=>{


    test('Validate fetching post visibility options',async()=>{
        const {response} = await TestContext.services.feedService.getPostVisibilityOptions()
        await ResponseValidator.validateStatus(response,201)
        await ResponseValidator.validateErrorMessage(response,'Visibility Options Fetched Successfully')
    })
})