import { TestContext } from "../../../src/context/test.context";
import Log from "../../../src/utils/logger";
import { getRandomJpegFile } from "../../../src/utils/mediaPicker";

describe('Bulk Data Creation For Single Story',()=>{

    test('Bulk Upload - My Story',async()=>{
        const TOTAL = 3;
        let count = 0
        while(count<TOTAL){
            Log.info("###################################################################################");
            Log.info(`Bulk Data Upload In Minio for Story - ${count + 1}/${TOTAL}`);
            Log.info("###################################################################################");
            const files = [getRandomJpegFile()]
            await TestContext.flows.storyFlow.createStoryWithMyNewStoryMedia(files)
        }
    })

    test('Bulk Upload - My Friends Story',async()=>{
        const TOTAL = 3;
        let count = 0
        while(count<TOTAL){
            Log.info("###################################################################################");
            Log.info(`Bulk Data Upload In Minio for Story - ${count + 1}/${TOTAL}`);
            Log.info("###################################################################################");

            const {friendId} = await TestContext.flows.userFlow.getRandomFriendOfParticularUser()
            const {contact_number} = await TestContext.flows.userFlow.getParticularUserDetails(friendId)
            await TestContext.flows.loginFlow.loginFlow(contact_number,friendId,'current user')
            const files = [getRandomJpegFile()]
            await TestContext.flows.storyFlow.createStoryWithMyNewStoryMedia(files)
        }
    })

    test('Bulk Upload - My Friends Friend Story',async()=>{
        const TOTAL = 3;
        let count = 0
        while(count<TOTAL){
            Log.info("###################################################################################");
            Log.info(`Bulk Data Upload In Minio for Story - ${count + 1}/${TOTAL}`);
            Log.info("###################################################################################");

            const {friendId} = await TestContext.flows.userFlow.getRandomFriendsOfFriendOfParticularUser()
            const {contact_number} = await TestContext.flows.userFlow.getParticularUserDetails(friendId)
            await TestContext.flows.loginFlow.loginFlow(contact_number,friendId,'current user')
            const files = [getRandomJpegFile()]
            await TestContext.flows.storyFlow.createStoryWithMyNewStoryMedia(files)
        }
    })

    test('Bulk Upload - Non Friend Profile',async()=>{
        const TOTAL = 3;
        let count = 0
        while(count<TOTAL){
            Log.info("###################################################################################");
            Log.info(`Bulk Data Upload In Minio for Story - ${count + 1}/${TOTAL}`);
            Log.info("###################################################################################");

            const {friendId} = await TestContext.flows.userFlow.getRandomNonFriendOfParticularUser()
            const {contact_number} = await TestContext.flows.userFlow.getParticularUserDetails(friendId)
            await TestContext.flows.loginFlow.loginFlow(contact_number,friendId,'current user')
            const files = [getRandomJpegFile()]
            await TestContext.flows.storyFlow.createStoryWithMyNewStoryMedia(files)
        }
    })

describe('Bulk Data Creation For Multiple Stories',()=>{
    test('Bulk Upload - My Story',async()=>{
        const TOTAL = 3;
        let count = 0
        while(count<TOTAL){
            Log.info("###################################################################################");
            Log.info(`Bulk Data Upload In Minio for Story - ${count + 1}/${TOTAL}`);
            Log.info("###################################################################################");
            let files=[]
            for(let i=1;i<=3;i++){
                files.push(getRandomJpegFile())
            }
            await TestContext.flows.storyFlow.createBulkStoryWithNewMedia(files)
        }
    })

    test('Bulk Upload - My Friends Story',async()=>{
        const TOTAL = 3;
        let count = 0
        while(count<TOTAL){
            Log.info("###################################################################################");
            Log.info(`Bulk Data Upload In Minio for Story - ${count + 1}/${TOTAL}`);
            Log.info("###################################################################################");

            const {friendId} = await TestContext.flows.userFlow.getRandomFriendOfParticularUser()
            const {contact_number} = await TestContext.flows.userFlow.getParticularUserDetails(friendId)
            await TestContext.flows.loginFlow.loginFlow(contact_number,friendId,'current user')
            let files=[]
            for(let i=1;i<=3;i++){
                files.push(getRandomJpegFile())
            }
            await TestContext.flows.storyFlow.createBulkStoryWithNewMedia(files)
        }
    })

    test('Bulk Upload - My Friends Friend Story',async()=>{
        const TOTAL = 3;
        let count = 0
        while(count<TOTAL){
            Log.info("###################################################################################");
            Log.info(`Bulk Data Upload In Minio for Story - ${count + 1}/${TOTAL}`);
            Log.info("###################################################################################");

            const {friendId} = await TestContext.flows.userFlow.getRandomFriendsOfFriendOfParticularUser()
            const {contact_number} = await TestContext.flows.userFlow.getParticularUserDetails(friendId)
            await TestContext.flows.loginFlow.loginFlow(contact_number,friendId,'current user')
            let files=[]
            for(let i=1;i<=3;i++){
                files.push(getRandomJpegFile())
            }
            await TestContext.flows.storyFlow.createBulkStoryWithNewMedia(files)
        }
    })

    test('Bulk Upload - Non Friend Profile',async()=>{
        const TOTAL = 3;
        let count = 0
        while(count<TOTAL){
            Log.info("###################################################################################");
            Log.info(`Bulk Data Upload In Minio for Story - ${count + 1}/${TOTAL}`);
            Log.info("###################################################################################");

            const {friendId} = await TestContext.flows.userFlow.getRandomNonFriendOfParticularUser()
            const {contact_number} = await TestContext.flows.userFlow.getParticularUserDetails(friendId)
            await TestContext.flows.loginFlow.loginFlow(contact_number,friendId,'current user')
            let files=[]
            for(let i=1;i<=3;i++){
                files.push(getRandomJpegFile())
            }
            await TestContext.flows.storyFlow.createBulkStoryWithNewMedia(files)
        }
    })
})

})