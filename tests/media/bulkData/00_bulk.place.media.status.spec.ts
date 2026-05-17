import { TestContext } from "../../../src/context/test.context"
import Log from "../../../src/utils/logger"
import { getRandomJpegFile } from "../../../src/utils/mediaPicker"

describe('Bulk Data Creation In Minio Only',()=>{

    describe('[no-test-login] Upload My Media',()=>{
        test('Bulk Data Upload In Minio for Profile',async()=>{
            const TOTAL = 1;
            let count = 0
            while(count<TOTAL){
                Log.info("###################################################################################");
                Log.info(`Bulk Data Upload In Minio for Profile - ${count + 1}/${TOTAL}`);
                Log.info("###################################################################################");

                const files = [getRandomJpegFile()]
                await TestContext.flows.mediaFlow.uploadToMinIO('profile',files)
                count++
            }
        })


        test('Bulk Data Upload In Minio for Story',async()=>{
            const TOTAL = 1;
            let count = 0
            while(count<TOTAL){
                Log.info("###################################################################################");
                Log.info(`Bulk Data Upload In Minio for Story - ${count + 1}/${TOTAL}`);
                Log.info("###################################################################################");

                const files = [getRandomJpegFile()]
                await TestContext.flows.mediaFlow.uploadToMinIO('story',files)
                count++
            }
        })

        
        test('Bulk Data Upload In Minio for Feed',async()=>{
            const TOTAL = 1;
            let count = 0
            while(count<TOTAL){
                Log.info("###################################################################################");
                Log.info(`Bulk Data Upload In Minio for Feed - ${count + 1}/${TOTAL}`);
                Log.info("###################################################################################");

                const files = [getRandomJpegFile()]
                await TestContext.flows.mediaFlow.uploadToMinIO('post',files)
                count++
            }
        })
    })


    describe('[no-test-login] Upload My Friends Media',()=>{
        test('Bulk Data Upload In Minio for Profile',async()=>{
            const TOTAL = 1;
            let count = 0
            while(count<TOTAL){
                Log.info("###################################################################################");
                Log.info(`Bulk Data Upload In Minio for Profile - ${count + 1}/${TOTAL}`);
                Log.info("###################################################################################");

                const {friendId} = await TestContext.flows.userFlow.getRandomFriendOfParticularUser()
                const {contact_number} = await TestContext.flows.userFlow.getParticularUserDetails(friendId)
                TestContext.activeUser='current'
                await TestContext.flows.loginFlow.loginFlow(contact_number,friendId,'current user')
                const files = [getRandomJpegFile()]
                await TestContext.flows.mediaFlow.uploadToMinIO('profile',files)
                count++

            }
        })


        test('Bulk Data Upload In Minio for Story',async()=>{
            const TOTAL = 1;
            let count = 0
            while(count<TOTAL){
                Log.info("###################################################################################");
                Log.info(`Bulk Data Upload In Minio for Story - ${count + 1}/${TOTAL}`);
                Log.info("###################################################################################");

                const {friendId} = await TestContext.flows.userFlow.getRandomFriendOfParticularUser()
                const {contact_number} = await TestContext.flows.userFlow.getParticularUserDetails(friendId)
                TestContext.activeUser='current'
                await TestContext.flows.loginFlow.loginFlow(contact_number,friendId,'current user')
                const files = [getRandomJpegFile()]
                await TestContext.flows.mediaFlow.uploadToMinIO('story',files)
                count++
            }
        })

        
        test('Bulk Data Upload In Minio for Feed',async()=>{
            const TOTAL = 1;
            let count = 0
            while(count<TOTAL){
                Log.info("###################################################################################");
                Log.info(`Bulk Data Upload In Minio for Story - ${count + 1}/${TOTAL}`);
                Log.info("###################################################################################");

                const {friendId} = await TestContext.flows.userFlow.getRandomFriendOfParticularUser()
                const {contact_number} = await TestContext.flows.userFlow.getParticularUserDetails(friendId)
                TestContext.activeUser='current'
                await TestContext.flows.loginFlow.loginFlow(contact_number,friendId,'current user')
                const files = [getRandomJpegFile()]
                await TestContext.flows.mediaFlow.uploadToMinIO('post',files)
                count++    
            }
        })
    })



    describe('[no-test-login] Upload My Friends Friend Media',()=>{
        test('Bulk Data Upload In Minio for Profile',async()=>{
            const TOTAL = 1;
            let count = 0
            while(count<TOTAL){
                Log.info("###################################################################################");
                Log.info(`Bulk Data Upload In Minio for Story - ${count + 1}/${TOTAL}`);
                Log.info("###################################################################################");

                const {friendId} = await TestContext.flows.userFlow.getRandomFriendsOfFriendOfParticularUser()
                const {contact_number} = await TestContext.flows.userFlow.getParticularUserDetails(friendId)
                TestContext.activeUser='current'
                await TestContext.flows.loginFlow.loginFlow(contact_number,friendId,'current user')
                const files = [getRandomJpegFile()]
                await TestContext.flows.mediaFlow.uploadToMinIO('profile',files)
                count++
            }
        })


        test('Bulk Data Upload In Minio for Story',async()=>{
            const TOTAL = 1;
            let count = 0
            while(count<TOTAL){
                Log.info("###################################################################################");
                Log.info(`Bulk Data Upload In Minio for Story - ${count + 1}/${TOTAL}`);
                Log.info("###################################################################################");

                const {friendId} = await TestContext.flows.userFlow.getRandomFriendsOfFriendOfParticularUser()
                const {contact_number} = await TestContext.flows.userFlow.getParticularUserDetails(friendId)
                TestContext.activeUser='current'
                await TestContext.flows.loginFlow.loginFlow(contact_number,friendId,'current user')
                const files = [getRandomJpegFile()]
                await TestContext.flows.mediaFlow.uploadToMinIO('story',files)
                count++
            }
        })

        
        test('Bulk Data Upload In Minio for Feed',async()=>{
            const TOTAL = 1;
            let count = 0
            while(count<TOTAL){
                Log.info("###################################################################################");
                Log.info(`Bulk Data Upload In Minio for Story - ${count + 1}/${TOTAL}`);
                Log.info("###################################################################################");

                const {friendId} = await TestContext.flows.userFlow.getRandomFriendsOfFriendOfParticularUser()
                const {contact_number} = await TestContext.flows.userFlow.getParticularUserDetails(friendId)
                TestContext.activeUser='current'
                await TestContext.flows.loginFlow.loginFlow(contact_number,friendId,'current user')
                const files = [getRandomJpegFile()]
                await TestContext.flows.mediaFlow.uploadToMinIO('post',files)
                count++
            }
        })
    })


    describe('[no-test-login] Upload My Non Friend Media',()=>{
        test('Bulk Data Upload In Minio for Profile',async()=>{
            const TOTAL = 1;
            let count = 0
            while(count<TOTAL){
                Log.info("###################################################################################");
                Log.info(`Bulk Data Upload In Minio for Story - ${count + 1}/${TOTAL}`);
                Log.info("###################################################################################");

                const {friendId} = await TestContext.flows.userFlow.getRandomNonFriendOfParticularUser()
                const {contact_number} = await TestContext.flows.userFlow.getParticularUserDetails(friendId)
                TestContext.activeUser='current'
                await TestContext.flows.loginFlow.loginFlow(contact_number,friendId,'current user')
                const files = [getRandomJpegFile()]
                await TestContext.flows.mediaFlow.uploadToMinIO('profile',files)
                count++
            }
        })


        test('Bulk Data Upload In Minio for Story',async()=>{
            const TOTAL = 1;
            let count = 0
            while(count<TOTAL){
                Log.info("###################################################################################");
                Log.info(`Bulk Data Upload In Minio for Story - ${count + 1}/${TOTAL}`);
                Log.info("###################################################################################");

                const {friendId} = await TestContext.flows.userFlow.getRandomNonFriendOfParticularUser()
                const {contact_number} = await TestContext.flows.userFlow.getParticularUserDetails(friendId)
                TestContext.activeUser='current'
                await TestContext.flows.loginFlow.loginFlow(contact_number,friendId,'current user')
                const files = [getRandomJpegFile()]
                await TestContext.flows.mediaFlow.uploadToMinIO('story',files)
                count++
            }
        })

        
        test('Bulk Data Upload In Minio for Feed',async()=>{
            const TOTAL = 1;
            let count = 0
            while(count<TOTAL){
                Log.info("###################################################################################");
                Log.info(`Bulk Data Upload In Minio for Story - ${count + 1}/${TOTAL}`);
                Log.info("###################################################################################");

                const {friendId} = await TestContext.flows.userFlow.getRandomNonFriendOfParticularUser()
                const {contact_number} = await TestContext.flows.userFlow.getParticularUserDetails(friendId)
                TestContext.activeUser='current'
                await TestContext.flows.loginFlow.loginFlow(contact_number,friendId,'current user')
                const files = [getRandomJpegFile()]
                await TestContext.flows.mediaFlow.uploadToMinIO('post',files)
                count++
            }
        })
    })

})