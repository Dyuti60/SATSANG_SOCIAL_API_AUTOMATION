import Log from "../../../src/utils/logger"
import { TestContext } from "../../../src/context/test.context"
import { wait } from "../../../src/utils/wait"

jest.setTimeout(300000)
describe(`Test - UserApp - Bulk - POST /auth/register api endpoint `,()=>{
    test('[no-test-login] Valid Bulk Registration',async()=>{
        const Total = 2
        let count = 0
        TestContext.activeUser='current'
        while(count<Total){
            Log.info("###################################################################################");
            Log.info(`Bulk Registration Iteration - ${count + 1}/${Total}`);
            Log.info("###################################################################################");
            
            await TestContext.flows.registrationFlow.registerUserFlow()
            await wait(500)
            count++;
        }  
    })
})