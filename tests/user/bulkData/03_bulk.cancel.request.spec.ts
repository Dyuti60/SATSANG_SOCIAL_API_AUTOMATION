import Log from "../../../src/utils/logger";
import ResponseValidator from "../../../src/api/response.validator";
import { TestContext } from "../../../src/context/test.context";
import { wait } from "../../../src/utils/wait";

jest.setTimeout(300000)
describe(`Bulk POST /user/friendRequest/cancel api endpoint`,()=>{
    test('Validate valid friend requests cancel by by logged in user in bulk', async()=>{
        const TOTAL = 5;
        let count = 0
        
        while(count<TOTAL){
            Log.info("###################################################################################");
            Log.info(`Friend Request Cancelled Iteration - ${count + 1}/${TOTAL}`);
            Log.info("###################################################################################");

            const {response} = await TestContext.flows.userFlow.validCancelFriendRequest('friendId')
            ResponseValidator.validateSuccess(response,{
                httpStatus:201,
                statusCode:200,
                message: 'Friend request canceled successfully'
            })
            await wait(500)
            count++;
        }

    })
})