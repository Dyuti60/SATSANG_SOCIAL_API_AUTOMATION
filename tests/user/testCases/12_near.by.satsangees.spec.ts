import ResponseValidator from "src/api/response.validator"
import { TestContext } from "src/context/test.context"
import { UserFactory } from "src/testdata/factory/user.factory"

describe('Validate Near By Satsangee',()=>{
    test(`Verify Near By Satsangee API - Valid Payload`,async()=>{
        const locationPayload = await TestContext.flows.userFlow.getRandomEnteredLocation()
        const {response} = await TestContext.services.userService.nearBySatsangee(locationPayload.nearByPayload)
        await ResponseValidator.validateStatus(response,201)
        await ResponseValidator.validateErrorMessage(response,'Found Satsangees near you')
    })

    test(`Verify Near By Satsangee API - Random Valid Payload`,async()=>{
        const nearByPayload = {
            ...UserFactory.nearBySatsangeePayload(),
        }
        const {response} = await TestContext.services.userService.nearBySatsangee(nearByPayload)
        await ResponseValidator.validateStatus(response,201)
        await ResponseValidator.validateErrorMessage(response,'Found Satsangees near you')
    })

    test(`Verify Near By Satsangee API - Blank Valid Payload`,async()=>{
        const nearByPayload = {
            ...UserFactory.nearBySatsangeePayload(),
        }
        const {response} = await TestContext.services.userService.nearBySatsangee()
        await ResponseValidator.validateStatus(response,201)
        await ResponseValidator.validateErrorMessage(response,'Found Satsangees near you')
    })
})