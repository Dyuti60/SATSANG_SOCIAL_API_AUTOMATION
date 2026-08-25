import { TestContext } from "src/context/test.context"

describe('Integration Testing',()=>{

    test('SIT - Update Home Location',async()=>{
        const {regionPayload} = await TestContext.flows.userFlow.getRandomValidLocation()
        const {response} = await TestContext.services.userService.updateUserLocation(regionPayload)

        // User Location Added in Location Table
    })
})