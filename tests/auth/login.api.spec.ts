import ResponseValidator from "../../src/api/response.validator"
import { TestContext } from "../../src/context/test.context"

describe('🔐 Login API Tests', () => {
    test('Verify Complete Login Flow [no-login]',async ()=>{
        const contactNumber = '7636037003'
        const {response} = await TestContext.flows.loginFlow.loginFlow(contactNumber)
        ResponseValidator.status(201,response.status)
    })
})
