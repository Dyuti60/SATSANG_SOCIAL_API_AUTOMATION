import { TestContext } from "src/context/test.context";
import Log from "src/utils/logger";
import { getRandomJpegFile } from "src/utils/mediaPicker";

describe('[no-test-login] Bulk Data Creation For Profile',()=>{

    test('Bulk Profile Upload - My Profile',async()=>{
        const files = [getRandomJpegFile()]
        await TestContext.flows.mediaFlow.verifyUploadStatus('profile',files)
    })

    test('Bulk Upload - My Friends Profile',async()=>{
        const TOTAL = 2;
        let count = 0
        while(count<TOTAL){
            Log.info("###################################################################################");
            Log.info(`Bulk Profile Upload - Friends Profile - ${count + 1}/${TOTAL}`);
            Log.info("###################################################################################");

            const {friendId} = await TestContext.flows.userFlow.getRandomFriendOfParticularUser()
            const {contact_number} = await TestContext.flows.userFlow.getParticularUserDetails(friendId)
            TestContext.activeUser='current'
            await TestContext.flows.loginFlow.loginFlow(contact_number,friendId,'current user')
            const files = [getRandomJpegFile()]
            await TestContext.flows.mediaFlow.verifyUploadStatus('profile',files)
            count++
        }
    })

    test('Bulk Upload - My Friends Friend Profile',async()=>{
        const TOTAL = 2;
        let count = 0
        while(count<TOTAL){
            Log.info("###################################################################################");
            Log.info(`Bulk Profile Upload - Friends Friend Profile - ${count + 1}/${TOTAL}`);
            Log.info("###################################################################################");

            const {friendId} = await TestContext.flows.userFlow.getRandomFriendsOfFriendOfParticularUser()
            const {contact_number} = await TestContext.flows.userFlow.getParticularUserDetails(friendId)
            TestContext.activeUser='current'
            await TestContext.flows.loginFlow.loginFlow(contact_number,friendId,'current user')
            const files = [getRandomJpegFile()]
            await TestContext.flows.mediaFlow.verifyUploadStatus('profile',files)
            count++
        }
    })

    test('Bulk Profile Upload - Non Friend Profile',async()=>{
        const TOTAL = 2;
        let count = 0
        while(count<TOTAL){
            Log.info("###################################################################################");
            Log.info(`Bulk Profile Upload - Non Friends Profile - ${count + 1}/${TOTAL}`);
            Log.info("###################################################################################");

            const {friendId} = await TestContext.flows.userFlow.getRandomNonFriendOfParticularUser()
            const {contact_number} = await TestContext.flows.userFlow.getParticularUserDetails(friendId)
            TestContext.activeUser='current'
            await TestContext.flows.loginFlow.loginFlow(contact_number,friendId,'current user')
            const files = [getRandomJpegFile()]
            await TestContext.flows.mediaFlow.verifyUploadStatus('profile',files)
            count++
        }
    })

})