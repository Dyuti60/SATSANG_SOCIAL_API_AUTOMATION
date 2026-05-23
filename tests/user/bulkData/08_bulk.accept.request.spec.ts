import Log from "src/utils/logger";
import ResponseValidator from "src/api/response.validator";
import { TestContext } from "src/context/test.context";
import { wait } from "src/utils/wait";

jest.setTimeout(300000)
describe(`Bulk POST /user/friendRequest/accept api endpoint`,()=>{
    test('Validate valid friend requests accept bulk by logged in user', async()=>{
        const TOTAL = 40;
        let count = 0

        while(count<TOTAL){
            Log.info("###################################################################################");
            Log.info(`Friend Request Accept Iteration - ${count + 1}/${TOTAL}`);
            Log.info("###################################################################################");

            const {friendRequestId} = await TestContext.flows.userFlow.randomFriendIdForAcceptingRequestOfParticularUser()
            const {response} = await TestContext.services.userService.acceptFriendRequest({friendRequestId})
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