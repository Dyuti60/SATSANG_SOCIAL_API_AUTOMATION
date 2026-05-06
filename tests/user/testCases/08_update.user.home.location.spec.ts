import ResponseValidator from "../../../src/api/response.validator"
import { TestContext } from "../../../src/context/test.context"
import { updateUserLocationPayloadTestCases1 } from "../../../src/testdata/validationPoints/user.validation.points"
import { updateUserLocationPayloadTestCases2 } from '../../../src/testdata/validationPoints/user.validation.points';

describe('Validate the User Location API',()=>{
    test(`Verify Update User Location - valid payload`,async()=>{
        const {regionPayload} = await TestContext.flows.userFlow.getRandomValidLocation()
        const {response} = await TestContext.services.userService.updateUserLocation(regionPayload)
        await ResponseValidator.validateStatus(response,200)
        await ResponseValidator.validateErrorMessage(response,'User home location added successfully')
    })
    
    updateUserLocationPayloadTestCases1.forEach((testCases)=>{
        test(`Verify Update User Location - When ${testCases.description}`,async()=>{
            const {response} = await TestContext.services.userService.updateUserLocation(testCases.overrides)
            await ResponseValidator.validateStatus(response,testCases.expectedStatus)
            await ResponseValidator.validateErrorMessage(response,testCases.expectedMessage)
        })
    })

    updateUserLocationPayloadTestCases2.forEach((testCases)=>{
        test(`Verify Update User Location - When ${testCases.description}`,async()=>{
            const {regionPayload} = await TestContext.flows.userFlow.getRandomValidLocation()
            const payload = {
                ...regionPayload,
                ...testCases.overrides
            }
            const {response} = await TestContext.services.userService.updateUserLocation(payload)
            await ResponseValidator.validateStatus(response,testCases.expectedStatus)
            await ResponseValidator.validateErrorMessage(response,testCases.expectedMessage)
        })
    })
})