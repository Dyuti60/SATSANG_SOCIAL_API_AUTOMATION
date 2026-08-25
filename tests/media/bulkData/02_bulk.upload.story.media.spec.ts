import ResponseValidator from "src/api/response.validator";
import { TestContext } from "src/context/test.context";
import Log from "src/utils/logger";
import { getRandomJpegFile } from "src/utils/mediaPicker";

describe('[no-test-login] Bulk Data Creation For Single Story',()=>{

    test('Bulk Upload - My Story',async()=>{
        const TOTAL = 30;
        let count = 0
        while(count<TOTAL){
            Log.info("###################################################################################");
            Log.info(`Bulk Story Upload - My Story - ${count + 1}/${TOTAL}`);
            Log.info("###################################################################################");
            const files = [getRandomJpegFile()]
            const {response} = await TestContext.flows.storyFlow.createStoryWithMyNewStoryMedia(files)
            await ResponseValidator.validateStatus(response,201)
            count++
        }
    })

    test('Bulk Upload - My Friends Story',async()=>{
        const TOTAL = 50;
        let count = 0
        while(count<TOTAL){
            Log.info("###################################################################################");
            Log.info(`Bulk Story Upload - My Friends Story - ${count + 1}/${TOTAL}`);
            Log.info("###################################################################################");

            const {friendId} = await TestContext.flows.userFlow.getRandomFriendOfParticularUser()
            const {contact_number} = await TestContext.flows.userFlow.getParticularUserDetails(friendId)
            TestContext.activeUser='current'
            await TestContext.flows.loginFlow.loginFlow(contact_number,friendId,'current user')
            const files = [getRandomJpegFile()]
            const {response} = await TestContext.flows.storyFlow.createStoryWithMyNewStoryMedia(files)
            await ResponseValidator.validateStatus(response,201)
            count++
        }
    })

    test('Bulk Upload - My Friends Friend Story',async()=>{
        const TOTAL = 3;
        let count = 0
        while(count<TOTAL){
            Log.info("###################################################################################");
            Log.info(`Bulk Story Upload - My Friends Friend Story - ${count + 1}/${TOTAL}`);
            Log.info("###################################################################################");

            const {friendId} = await TestContext.flows.userFlow.getRandomFriendsOfFriendOfParticularUser()
            const {contact_number} = await TestContext.flows.userFlow.getParticularUserDetails(friendId)
            TestContext.activeUser='current'
            await TestContext.flows.loginFlow.loginFlow(contact_number,friendId,'current user')
            const files = [getRandomJpegFile()]
            const {response} = await TestContext.flows.storyFlow.createStoryWithMyNewStoryMedia(files)
            await ResponseValidator.validateStatus(response,201)
            count++
        }
    })

    test('Bulk Upload - Non Friend Profile',async()=>{
        const TOTAL = 1;
        let count = 0
        while(count<TOTAL){
            Log.info("###################################################################################");
            Log.info(`Bulk Story Upload - My Non Friends Story - ${count + 1}/${TOTAL}`);
            Log.info("###################################################################################");

            const {friendId} = await TestContext.flows.userFlow.getRandomNonFriendOfParticularUser()
            const {contact_number} = await TestContext.flows.userFlow.getParticularUserDetails(friendId)
            TestContext.activeUser='current'
            await TestContext.flows.loginFlow.loginFlow(contact_number,friendId,'current user')
            const files = [getRandomJpegFile()]
            const {response} = await TestContext.flows.storyFlow.createStoryWithMyNewStoryMedia(files)
            await ResponseValidator.validateStatus(response,201)
            count++
        }
    })
})

describe('[no-test-login] Bulk Data Creation For Multiple Stories',()=>{
    test('Bulk Upload - My Story',async()=>{
        const TOTAL = 20;
        let count = 0
        while(count<TOTAL){
            Log.info("###################################################################################");
            Log.info(`Bulk Multi-Story Upload - My Story - ${count + 1}/${TOTAL}`);
            Log.info("###################################################################################");
            let files=[]
            for(let i=1;i<=3;i++){
                files.push(getRandomJpegFile())
            }
            const {response} = await TestContext.flows.storyFlow.createBulkStoryWithNewMedia(files)
            await ResponseValidator.validateStatus(response,201)
            count++
        }
    })

    test('Bulk Upload - My Friends Story',async()=>{
        const TOTAL = 20;
        let count = 0
        while(count<TOTAL){
            Log.info("###################################################################################");
            Log.info(`Bulk Multi-Story Upload - My Friends Story - ${count + 1}/${TOTAL}`);
            Log.info("###################################################################################");

            const {friendId} = await TestContext.flows.userFlow.getRandomFriendOfParticularUser()
            const {contact_number} = await TestContext.flows.userFlow.getParticularUserDetails(friendId)
            TestContext.activeUser='current'
            await TestContext.flows.loginFlow.loginFlow(contact_number,friendId,'current user')
            let files=[]
            for(let i=1;i<=3;i++){
                files.push(getRandomJpegFile())
            }
            const {response} = await TestContext.flows.storyFlow.createBulkStoryWithNewMedia(files)
            await ResponseValidator.validateStatus(response,201)
            count++
        }
    })

    test('Bulk Upload - My Friends Friend Story',async()=>{
        const TOTAL = 1;
        let count = 0
        while(count<TOTAL){
            Log.info("###################################################################################");
            Log.info(`Bulk Multi-Story Upload - My Friends Friend Story- ${count + 1}/${TOTAL}`);
            Log.info("###################################################################################");

            const {friendId} = await TestContext.flows.userFlow.getRandomFriendsOfFriendOfParticularUser()
            const {contact_number} = await TestContext.flows.userFlow.getParticularUserDetails(friendId)
            TestContext.activeUser='current'
            await TestContext.flows.loginFlow.loginFlow(contact_number,friendId,'current user')
            let files=[]
            for(let i=1;i<=3;i++){
                files.push(getRandomJpegFile())
            }
            const {response} = await TestContext.flows.storyFlow.createBulkStoryWithNewMedia(files)
            await ResponseValidator.validateStatus(response,201)
            count++
        }
    })

    test('Bulk Upload - Non Friend Profile',async()=>{
        const TOTAL = 1;
        let count = 0
        while(count<TOTAL){
            Log.info("###################################################################################");
            Log.info(`Bulk Multi-Story Upload - My Non Friends Story - ${count + 1}/${TOTAL}`);
            Log.info("###################################################################################");

            const {friendId} = await TestContext.flows.userFlow.getRandomNonFriendOfParticularUser()
            const {contact_number} = await TestContext.flows.userFlow.getParticularUserDetails(friendId)
            TestContext.activeUser='current'
            await TestContext.flows.loginFlow.loginFlow(contact_number,friendId,'current user')
            let files=[]
            for(let i=1;i<=3;i++){
                files.push(getRandomJpegFile())
            }
            const {response} = await TestContext.flows.storyFlow.createBulkStoryWithNewMedia(files)
            await ResponseValidator.validateStatus(response,201)
            count++
        }
    })
})

describe('Bulk Delete',()=>{
    test('Bulk Delete - My Present Story',async()=>{
        const TOTAL = 1;
        let count = 0
        while(count<TOTAL){
            Log.info("###################################################################################");
            Log.info(`Bulk Delete - My Present Story - ${count + 1}/${TOTAL}`);
            Log.info("###################################################################################");

            const {response} = await TestContext.flows.storyFlow.deleteMyPresentStory()
            await ResponseValidator.validateStatus(response,200)
            count++
        }
    })

    // test('Bulk Delete - My Expired Story',async()=>{
    //     const TOTAL = 1;
    //     let count = 0
    //     while(count<TOTAL){
    //         Log.info("###################################################################################");
    //         Log.info(`Bulk Delete - My Present Story - ${count + 1}/${TOTAL}`);
    //         Log.info("###################################################################################");

    //         const {response} = await TestContext.flows.storyFlow.deleteMyExpiredStory()
    //         await ResponseValidator.validateStatus(response,200)
    //         count++
    //     }
    // })



    test('Bulk Delete - My Friends Present Story',async()=>{
        const TOTAL = 1;
        let count = 0
        while(count<TOTAL){
            Log.info("###################################################################################");
            Log.info(`Bulk Delete - My Friends Story - ${count + 1}/${TOTAL}`);
            Log.info("###################################################################################");

            const {storyId,createdBy} = await TestContext.services.storyRepo.myFriendsPresentStoryMediaId(TestContext.initialMemuuid)
            const {contact_number} = await TestContext.flows.userFlow.getParticularUserDetails(createdBy)
            TestContext.activeUser='current'
            await TestContext.flows.loginFlow.loginFlow(contact_number,createdBy,'current user')
            const {response} = await TestContext.services.storyService.deleteStory({
                storyId: storyId
            })
            await ResponseValidator.validateStatus(response,200)
            count++
        }
    })

    // test('Bulk Delete - My Friends Expired Story',async()=>{
    //     const TOTAL = 1;
    //     let count = 0
    //     while(count<TOTAL){
    //         Log.info("###################################################################################");
    //         Log.info(`Bulk Delete - My Friends Story - ${count + 1}/${TOTAL}`);
    //         Log.info("###################################################################################");

    //         const {storyId,createdBy} = await TestContext.services.storyRepo.myFriendsExpiredStoryMediaId(TestContext.initialMemuuid)
    //         const {contact_number} = await TestContext.flows.userFlow.getParticularUserDetails(createdBy)
    //         TestContext.activeUser='current'
    //         await TestContext.flows.loginFlow.loginFlow(contact_number,createdBy,'current user')
    //         const {response} = await TestContext.services.storyService.deleteStory({
    //             storyId: storyId
    //         })
    //         await ResponseValidator.validateStatus(response,200)
    //         count++
    //     }
    // })



    test('Bulk Delete - My Friends Friend Present Story',async()=>{
        const TOTAL = 1;
        let count = 0
        while(count<TOTAL){
            Log.info("###################################################################################");
            Log.info(`Bulk Delete - My Friends Story - ${count + 1}/${TOTAL}`);
            Log.info("###################################################################################");

            const {storyId,createdBy} = await TestContext.services.storyRepo.myFriendOfFriendPresentStoryMediaId(TestContext.initialMemuuid)
            const {contact_number} = await TestContext.flows.userFlow.getParticularUserDetails(createdBy)
            TestContext.activeUser='current'
            await TestContext.flows.loginFlow.loginFlow(contact_number,createdBy,'current user')
            const {response} = await TestContext.services.storyService.deleteStory({
                storyId: storyId
            })
            await ResponseValidator.validateStatus(response,200)
            count++
        }
    })

    // test('Bulk Delete - My Friends Friend Expired Story',async()=>{
    //     const TOTAL = 1;
    //     let count = 0
    //     while(count<TOTAL){
    //         Log.info("###################################################################################");
    //         Log.info(`Bulk Delete - My Friends Story - ${count + 1}/${TOTAL}`);
    //         Log.info("###################################################################################");

    //         const {storyId,createdBy} = await TestContext.services.storyRepo.myFriendsOfFriendExpiredStoryMediaId(TestContext.initialMemuuid)
    //         const {contact_number} = await TestContext.flows.userFlow.getParticularUserDetails(createdBy)
    //         TestContext.activeUser='current'
    //         await TestContext.flows.loginFlow.loginFlow(contact_number,createdBy,'current user')
    //         const {response} = await TestContext.services.storyService.deleteStory({
    //             storyId: storyId
    //         })
    //         await ResponseValidator.validateStatus(response,200)
    //         count++
    //     }
    // })




    test('Bulk Delete - My Non Friends Present Story',async()=>{
        const TOTAL = 1;
        let count = 0
        while(count<TOTAL){
            Log.info("###################################################################################");
            Log.info(`Bulk Delete - My Friends Story - ${count + 1}/${TOTAL}`);
            Log.info("###################################################################################");

            const {storyId,createdBy} = await TestContext.services.storyRepo.nonFriendsPresentStoryId(TestContext.initialMemuuid)
            const {contact_number} = await TestContext.flows.userFlow.getParticularUserDetails(createdBy)
            TestContext.activeUser='current'
            await TestContext.flows.loginFlow.loginFlow(contact_number,createdBy,'current user')
            const {response} = await TestContext.services.storyService.deleteStory({
                storyId: storyId
            })
            await ResponseValidator.validateStatus(response,200)
            count++
        }
    })

    // test('Bulk Delete - My Non Friends Expired Story',async()=>{
    //     const TOTAL = 1;
    //     let count = 0
    //     while(count<TOTAL){
    //         Log.info("###################################################################################");
    //         Log.info(`Bulk Delete - My Friends Story - ${count + 1}/${TOTAL}`);
    //         Log.info("###################################################################################");

    //         const {storyId,createdBy} = await TestContext.services.storyRepo.nonFriendsExpiredStoryId(TestContext.initialMemuuid)
    //         const {contact_number} = await TestContext.flows.userFlow.getParticularUserDetails(createdBy)
    //         TestContext.activeUser='current'
    //         await TestContext.flows.loginFlow.loginFlow(contact_number,createdBy,'current user')
    //         const {response} = await TestContext.services.storyService.deleteStory({
    //             storyId: storyId
    //         })
    //         await ResponseValidator.validateStatus(response,200)
    //         count++
    //     }
    // })

})
