import { TestContext } from "src/context/test.context"
import { FeedServices } from "src/services/feed.services";
import ResponseValidator from "api/response.validator";

describe('Validate GET /feed/locations Endpoint',()=>{

    test('Validate Getting Logged In Users Feed Location',async()=>{
        const {response} = await TestContext.services.feedService.getUsersLocationList()
        await ResponseValidator.validateStatus(response,200)
        await ResponseValidator.validateErrorMessage(response, "Successfully fetched locations.")
    })
})