import ResponseValidator from "api/response.validator"
import { TestContext } from "src/context/test.context"

describe('Validate GET /feed/post/comment?parentCommentId&postId Endpoint',()=>{


    test('Validate Comments Fetched On Post',async()=>{
        const {response} = await TestContext.services.feedService.getCommentOnPost({
            postId:'6a1c5baf-452b-4d98-b18d-82047ccc1b32'
        })
        await ResponseValidator.validateStatus(response,200)
        await ResponseValidator.validateErrorMessage(response,'Successfully fetched feed Posts.')
    })

    test('Validate Child Comments Fetched On Posts',async()=>{
        const {response} = await TestContext.services.feedService.getCommentOnPost({
            postId:'6a1c5baf-452b-4d98-b18d-82047ccc1b32',
            parentCommentId:'2e7d3030-4188-11f1-835d-f96d0d72cb11'
        })
        await ResponseValidator.validateStatus(response,200)
        await ResponseValidator.validateErrorMessage(response,'Successfully fetched feed Posts.')
    })
})