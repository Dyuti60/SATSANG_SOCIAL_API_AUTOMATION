import Log from "src/utils/logger";
import ResponseValidator from "src/api/response.validator";
import { TestContext } from "src/context/test.context";
import { wait } from "src/utils/wait";
import { getMemDetailsFromJwt } from "src/helper/auth/jwt.decode";
import { ENV } from "src/helper/env/env.config";

jest.setTimeout(300000)
describe(`Bulk POST /user/friendRequest/send api endpoint`,()=>{
    test('Validate valid login and send friend requests', async()=>{
        const TOTAL = 50;
        let count = 0

        // const {accessToken} = await TestContext.flows.loginFlow.loginFlow(ENV.LOGIN_CONTACT_NUMBER);
        // const {memuuid} = getMemDetailsFromJwt(accessToken)
        const memuuid = TestContext.initialMemuuid

        while(count<TOTAL){
            Log.info("###################################################################################");
            Log.info(`Friend Request Send Iteration - ${count + 1}/${TOTAL}`);
            Log.info("###################################################################################");

            await TestContext.flows.userFlow.randomFriendIdForBulkLoginAndSendRequestToParticularUser(memuuid)
            const {response} =await TestContext.services.userService.sendFriendRequest({
                friendId: memuuid
            })
            ResponseValidator.validateSuccess(response,{
                httpStatus:201,
                statusCode:200,
                message: 'Friend request sent successfully'
            })
            await wait(500)
            count++;
        }

    })
})