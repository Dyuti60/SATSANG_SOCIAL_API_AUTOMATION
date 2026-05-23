import ResponseValidator from "src/api/response.validator"
import { TestContext } from "src/context/test.context"

describe('Validate GET /feed/post/reactions',()=>{


    test('Validate fetching reaction options',async()=>{
        const {response} = await TestContext.services.feedService.getPostReactionOptions()
        await ResponseValidator.validateStatus(response,200)
        await ResponseValidator.validateErrorMessage(response,'Successfully fetched post reaction options.')
    })
})