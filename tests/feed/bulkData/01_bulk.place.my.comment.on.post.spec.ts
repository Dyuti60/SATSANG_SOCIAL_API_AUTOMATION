import ResponseValidator from "api/response.validator";
import { TestContext } from "src/context/test.context";
import Log from "utils/logger";

describe('Bulk Comment Creation',()=>{

    describe('Add Comment To My Post',()=>{

        test('Add Comment To My - Public Post',async()=>{
            const TOTAL = 1;
            let count = 0
            while(count<TOTAL){
                Log.info("###################################################################################");
                Log.info(`Add Comment To My - Public Post - ${count + 1}/${TOTAL}`);
                Log.info("###################################################################################");

                const {response} = await TestContext.flows.feedFlow.addCommentToMyPosts('public')
                await ResponseValidator.validateStatus(response,201)
                count++
            }
        })
        test('Add Comment To My - Hidden Post',async()=>{
            const TOTAL = 1;
            let count = 0
            while(count<TOTAL){
                Log.info("###################################################################################");
                Log.info(`Add Comment To My - Hidden Post - ${count + 1}/${TOTAL}`);
                Log.info("###################################################################################");

                const {response} = await TestContext.flows.feedFlow.addCommentToMyPosts('hidden')
                await ResponseValidator.validateStatus(response,201)
                count++
            }
        })
        test('Add Comment To My - Deleted Post',async()=>{
            const TOTAL = 1;
            let count = 0
            while(count<TOTAL){
                Log.info("###################################################################################");
                Log.info(`Add Comment To My - Deleted Post - ${count + 1}/${TOTAL}`);
                Log.info("###################################################################################");

                const {response} = await TestContext.flows.feedFlow.addCommentToMyPosts('deleted')
                await ResponseValidator.validateStatus(response,201)
                count++
            }
        })
        test('Add Comment To My - Friends Visibility Post',async()=>{
            const TOTAL = 1;
            let count = 0
            while(count<TOTAL){
                Log.info("###################################################################################");
                Log.info(`Add Comment To My - Friends Visibility Post- ${count + 1}/${TOTAL}`);
                Log.info("###################################################################################");

                const {response} = await TestContext.flows.feedFlow.addCommentToMyPosts('friends visibility')
                await ResponseValidator.validateStatus(response,201)
                count++
            }
        })
        test('Add Comment To My - Friends of Friends Visibility Post',async()=>{
            const TOTAL = 1;
            let count = 0
            while(count<TOTAL){
                Log.info("###################################################################################");
                Log.info(`Add Comment To My - Friends of Friends Visibility Post - ${count + 1}/${TOTAL}`);
                Log.info("###################################################################################");

                const {response} = await TestContext.flows.feedFlow.addCommentToMyPosts('fof visibility')
                await ResponseValidator.validateStatus(response,201)
                count++
            }
        })
    })

    describe('Add Comment To My Friends Post',()=>{

        test('Add Comment To My Friends - Public Post',async()=>{
            const TOTAL = 1;
            let count = 0
            while(count<TOTAL){
                Log.info("###################################################################################");
                Log.info(`Add Comment To My Friends - Public Post - ${count + 1}/${TOTAL}`);
                Log.info("###################################################################################");

                const {response} = await TestContext.flows.feedFlow.addCommentToMyFriendsPost('public')
                await ResponseValidator.validateStatus(response,201)
                count++
            }
        })
        test('Add Comment To My Friends - Hidden Post',async()=>{
            const TOTAL = 1;
            let count = 0
            while(count<TOTAL){
                Log.info("###################################################################################");
                Log.info(`Add Comment To My Friends - Hidden Post - ${count + 1}/${TOTAL}`);
                Log.info("###################################################################################");

                const {response} = await TestContext.flows.feedFlow.addCommentToMyFriendsPost('hidden')
                await ResponseValidator.validateStatus(response,201)
                count++
            }
        })
        test('Add Comment To My Friends - Deleted Post',async()=>{
            const TOTAL = 1;
            let count = 0
            while(count<TOTAL){
                Log.info("###################################################################################");
                Log.info(`Add Comment To My Friends - Deleted Post- ${count + 1}/${TOTAL}`);
                Log.info("###################################################################################");

                const {response} = await TestContext.flows.feedFlow.addCommentToMyFriendsPost('deleted')
                await ResponseValidator.validateStatus(response,201)
                count++
            }
        })
        test('Add Comment To My Friends - Friends Visibility Post',async()=>{
            const TOTAL = 1;
            let count = 0
            while(count<TOTAL){
                Log.info("###################################################################################");
                Log.info(`Add Comment To My Friends - Friends Visibility Post - ${count + 1}/${TOTAL}`);
                Log.info("###################################################################################");

                const {response} = await TestContext.flows.feedFlow.addCommentToMyFriendsPost('friends visibility')
                await ResponseValidator.validateStatus(response,201)
                count++
            }
        })
        test('Add Comment To My Friends - Friends of Friends Visibility Post',async()=>{
            const TOTAL = 1;
            let count = 0
            while(count<TOTAL){
                Log.info("###################################################################################");
                Log.info(`Add Comment To My Friends - Friends of Friends Visibility Post - ${count + 1}/${TOTAL}`);
                Log.info("###################################################################################");

                const {response} = await TestContext.flows.feedFlow.addCommentToMyFriendsPost('fof visibility')
                await ResponseValidator.validateStatus(response,201)
                count++
            }
        })
    })

    describe('Add Comment To My Friends Friend Post',()=>{

        test('Add Comment To My Friends Friend - Public Post',async()=>{
            const TOTAL = 1;
            let count = 0
            while(count<TOTAL){
                Log.info("###################################################################################");
                Log.info(`Add Comment To My Friends Friend - Public Post - ${count + 1}/${TOTAL}`);
                Log.info("###################################################################################");

                const {response} = await TestContext.flows.feedFlow.addCommentToMyFriendsOfFriendsPost('public')
                await ResponseValidator.validateStatus(response,201)
                count++
            }
        })
        test('Add Comment To My Friends Friend - Hidden Post',async()=>{
            const TOTAL = 1;
            let count = 0
            while(count<TOTAL){
                Log.info("###################################################################################");
                Log.info(`Add Comment To My Friends Friend - Hidden Post - ${count + 1}/${TOTAL}`);
                Log.info("###################################################################################");

                const {response} = await TestContext.flows.feedFlow.addCommentToMyFriendsOfFriendsPost('hidden')
                await ResponseValidator.validateStatus(response,201)
                count++
            }
        })
        test('Add Comment To My Friends Friend - Deleted Post',async()=>{
            const TOTAL = 1;
            let count = 0
            while(count<TOTAL){
                Log.info("###################################################################################");
                Log.info(`Add Comment To My Friends Friend - Deleted Post - ${count + 1}/${TOTAL}`);
                Log.info("###################################################################################");

                const {response} = await TestContext.flows.feedFlow.addCommentToMyFriendsOfFriendsPost('deleted')
                await ResponseValidator.validateStatus(response,201)
                count++
            }
        })
        test('Add Comment To My Friends Friend - Friends Visibility Post',async()=>{
            const TOTAL = 1;
            let count = 0
            while(count<TOTAL){
                Log.info("###################################################################################");
                Log.info(`Add Comment To My Friends Friend - Friends Visibility Post - ${count + 1}/${TOTAL}`);
                Log.info("###################################################################################");

                const {response} = await TestContext.flows.feedFlow.addCommentToMyFriendsOfFriendsPost('friends visibility')
                await ResponseValidator.validateStatus(response,201)
                count++
            }
        })
        test('Add Comment To My Friends Friend - Friends of Friends Visibility Post',async()=>{
            const TOTAL = 1;
            let count = 0
            while(count<TOTAL){
                Log.info("###################################################################################");
                Log.info(`Add Comment To My Friends Friend - Friends of Friends Visibility Post - ${count + 1}/${TOTAL}`);
                Log.info("###################################################################################");

                const {response} = await TestContext.flows.feedFlow.addCommentToMyFriendsOfFriendsPost('fof visibility')
                await ResponseValidator.validateStatus(response,201)
                count++
            }
        })
    })

    describe('Add Comment To My Non Friends Post',()=>{

        test('Add Comment To My Non Friends - Public Post',async()=>{
            const TOTAL = 1;
            let count = 0
            while(count<TOTAL){
                Log.info("###################################################################################");
                Log.info(`Add Comment To My Non Friends - Public Post - ${count + 1}/${TOTAL}`);
                Log.info("###################################################################################");

                const {response} = await TestContext.flows.feedFlow.addCommentToOtherNonFriendsPost('public')
                await ResponseValidator.validateStatus(response,201)
                count++
            }
        })
        test('Add Comment To My Non Friends - Hidden Post',async()=>{
            const TOTAL = 1;
            let count = 0
            while(count<TOTAL){
                Log.info("###################################################################################");
                Log.info(`Add Comment To My Non Friends - Hidden Post - ${count + 1}/${TOTAL}`);
                Log.info("###################################################################################");

                const {response} = await TestContext.flows.feedFlow.addCommentToOtherNonFriendsPost('hidden')
                await ResponseValidator.validateStatus(response,201)
                count++
            }
        })
        test('Add Comment To My Non Friends - Deleted Post',async()=>{
            const TOTAL = 1;
            let count = 0
            while(count<TOTAL){
                Log.info("###################################################################################");
                Log.info(`Add Comment To My Non Friends - Deleted Post - ${count + 1}/${TOTAL}`);
                Log.info("###################################################################################");

                const {response} = await TestContext.flows.feedFlow.addCommentToOtherNonFriendsPost('deleted')
                await ResponseValidator.validateStatus(response,201)
                count++
            }
        })
        test('Add Comment To My Non Friends - Friends Visibility Post',async()=>{
            const TOTAL = 1;
            let count = 0
            while(count<TOTAL){
                Log.info("###################################################################################");
                Log.info(`Add Comment To My Non Friends - Friends Visibility Post - ${count + 1}/${TOTAL}`);
                Log.info("###################################################################################");

                const {response} = await TestContext.flows.feedFlow.addCommentToOtherNonFriendsPost('friends visibility')
                await ResponseValidator.validateStatus(response,201)
                count++
            }
        })
        test('Add Comment To My Non Friends - Friends of Friends Visibility Post',async()=>{
            const TOTAL = 1;
            let count = 0
            while(count<TOTAL){
                Log.info("###################################################################################");
                Log.info(`Add Comment To My Non Friends - Friends of Friends Visibility Post - ${count + 1}/${TOTAL}`);
                Log.info("###################################################################################");

                const {response} = await TestContext.flows.feedFlow.addCommentToOtherNonFriendsPost('fof visibility')
                await ResponseValidator.validateStatus(response,201)
                count++
            }
        })
    })
})