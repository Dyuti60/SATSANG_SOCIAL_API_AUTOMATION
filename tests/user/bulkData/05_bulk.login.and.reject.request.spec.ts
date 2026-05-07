import Log from "../../../src/utils/logger";
import ResponseValidator from "../../../src/api/response.validator";
import { TestContext } from "../../../src/context/test.context";
import { wait } from "../../../src/utils/wait";
import { getMemDetailsFromJwt } from "../../../src/helper/auth/jwt.decode";
import { ENV } from "../../../src/helper/env/env.config";

jest.setTimeout(300000)
describe(`Bulk POST /user/friendRequest/reject api endpoint`,()=>{
    test('Validate valid login and reject received friend requests', async()=>{
        const TOTAL = 5;
        let count = 0
        // const {accessToken} = await TestContext.flows.loginFlow.loginFlow(ENV.LOGIN_CONTACT_NUMBER);
        // const {memuuid} = getMemDetailsFromJwt(accessToken)
        const memuuid = TestContext.initialMemuuid

        while(count<TOTAL){
            Log.info("###################################################################################");
            Log.info(`Friend Request Reject Iteration - ${count + 1}/${TOTAL}`);
            Log.info("###################################################################################");

            const {friendId, friendRequestId} = await TestContext.flows.userFlow.randomFriendIdForBulkLoginInPendingRequest(memuuid)
            const {response} =await TestContext.services.userService.rejectFriendRequest({
                friendRequestId
            })
            ResponseValidator.validateSuccess(response,{
                httpStatus:201,
                statusCode:200,
                message: 'Friend request rejected successfully'
            })
            await wait(500)
            count++;
        }

    })
})