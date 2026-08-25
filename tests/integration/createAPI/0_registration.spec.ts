import { TestContext } from "src/context/test.context"

describe('Integration Testing',()=>{

    test('SIT - Registration Flow',async()=>{
        TestContext.activeUser='current'
        const response = await TestContext.flows.registrationFlow.registerUserFlow()

        // Validate user creation in user profile table
    })
})