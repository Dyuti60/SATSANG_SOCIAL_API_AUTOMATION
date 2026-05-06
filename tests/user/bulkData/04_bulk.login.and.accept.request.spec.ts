import { getMemDetailsFromJwt } from "../../../src/helper/auth/jwt.decode";
import { ENV } from "../../../src/helper/env/env.config";
import Log from "../../../src/utils/logger";
import ResponseValidator from "../../../src/api/response.validator";
import { TestContext } from "../../../src/context/test.context";
import { wait } from "../../../src/utils/wait";

jest.setTimeout(300000)
describe(`Bulk POST /user/friendRequest/accept api endpoint`,()=>{
    test('Validate valid login and accepting received friend requests', async()=>{
        const TOTAL = 10;
        let count = 0

        // const {accessToken} = await TestContext.flows.loginFlow.loginFlow(ENV.LOGIN_CONTACT_NUMBER);
        // const {memuuid} = getMemDetailsFromJwt(accessToken)
        const memuuid = TestContext.initialMemuuid

        while(count<TOTAL){
            Log.info("###################################################################################");
            Log.info(`Friend Request Accept Iteration - ${count + 1}/${TOTAL}`);
            Log.info("###################################################################################");
            console.log(`memuuid: ${memuuid}`)
            const {friendId, friendRequestId} = await TestContext.flows.userFlow.randomFriendIdForBulkLoginInPendingRequest(memuuid)
            const {response} =await TestContext.services.userService.acceptFriendRequest({
                friendRequestId
            })
            ResponseValidator.validateSuccess(response,{
                httpStatus:201,
                statusCode:200,
                message: 'Friend request accepted successfully'
            })
            await wait(500)
            count++;
        }

    })
})