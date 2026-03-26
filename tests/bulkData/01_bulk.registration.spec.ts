import { TestContext } from "../../src/context/test.context"

describe(`Bulk Registration`,()=>{
    test('[no-login] Valid Bulk Registration',async()=>{
        let count = 100
        while(count){
            await TestContext.flows.registrationFlow.registerUserFlow()
            count--
        }
        
    })
})