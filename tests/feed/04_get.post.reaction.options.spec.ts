import ResponseValidator from "src/api/response.validator"
import { TestContext } from "src/context/test.context"

describe('Validate GET /feed/post/reactions',()=>{


    test('Validate fetching reaction options',async()=>{
        const {response} = await TestContext.services.feedService.getPostReactionOptions()
        await ResponseValidator.validateStatus(response,201)
        await ResponseValidator.validateErrorMessage(response,'Reaction Options Fetched Successfully')
    })
})