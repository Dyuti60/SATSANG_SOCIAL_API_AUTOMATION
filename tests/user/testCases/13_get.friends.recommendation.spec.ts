import ResponseValidator from "src/api/response.validator"
import { TestContext } from "src/context/test.context"

describe('Validate FriendRecommendation API',()=>{

    test('Verify Friend Recommendation API',async()=>{
        const {response} = await TestContext.services.userService.friendRecommendation()
        await ResponseValidator.validateSuccess(response,{
            httpStatus:200,
            statusCode:200,
            message:'Users found successfully'
        })
    })

})