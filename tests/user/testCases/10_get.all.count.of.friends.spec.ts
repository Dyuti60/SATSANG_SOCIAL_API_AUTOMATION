import ResponseValidator from "../../../src/api/response.validator"
import { TestContext } from "../../../src/context/test.context"

describe('Validate Get Friends Count API',()=>{
    
    test(`Friends Count Validation`,async()=>{
        const {response} = await TestContext.services.userService.getFriendsCount()
        await ResponseValidator.validateSuccess(response,{
        httpStatus: 200,
        statusCode: 200,
        message: "Fetched the friends count"
        })
    })
})