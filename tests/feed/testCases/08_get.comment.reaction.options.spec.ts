import ResponseValidator from "api/response.validator"
import { TestContext } from "src/context/test.context"

describe('Validate GET /feed/post/comment/reactions Endpoint',()=>{


    test('Validate User Comment Reactions', async()=>{
        const {response} = await TestContext.services.feedService.getCommentReactionOptions()
        await ResponseValidator.validateStatus(response,200)
        await ResponseValidator.validateErrorMessage(response,'Successfully fetched post visibility options.')
    })
})