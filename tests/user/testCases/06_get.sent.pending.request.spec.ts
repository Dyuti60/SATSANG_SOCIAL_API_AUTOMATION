import ResponseValidator from "src/api/response.validator"
import { TestContext } from "src/context/test.context"

describe('Validate Get Pending Requests Sent API',()=>{
    
    test(`Verify Get Pending Requests Sent API`,async()=>{
        const {response} = await TestContext.services.userService.allPendingRequests()
        await ResponseValidator.validateSuccess(response,{
        httpStatus: 200,
        statusCode: 200,
        message: "Fetched all pending requests"
        })
    })
})