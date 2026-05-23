import { TestContext } from "src/context/test.context";
import Log from "src/utils/logger";
import { getRandomJpegFile, getRandomMp4File } from "src/utils/mediaPicker";
import { FeedFlow } from "src/workflow/feed.api.flow";
import { FeedFactory } from "src/testdata/factory/feed.factory";
import ResponseValidator from "src/api/response.validator";

describe('Bulk Data Creation For Feed',()=>{

    describe('[no-test-login] Bulk Upload My Post',()=>{
        test('Bulk Upload - Image - In My Post',async()=>{
            const TOTAL = 1;
            let count = 0
            while(count<TOTAL){
                Log.info("###################################################################################");
                Log.info(`Bulk Upload Image - My Post - ${count + 1}/${TOTAL}`);
                Log.info("###################################################################################");
                let files=[]
                for(let i=1;i<=3;i++){
                    files.push(getRandomJpegFile())
                }
                const {response} = await TestContext.flows.feedFlow.createPostWithMyNewPostMedia(files)
                await ResponseValidator.validateStatus(response,201)
                count++
            }
        })

        test('Bulk Upload - Video - In My Post',async()=>{
            const TOTAL = 1;
            let count = 0
            while(count<TOTAL){
                Log.info("###################################################################################");
                Log.info(`Bulk Upload Video - My Post  - ${count + 1}/${TOTAL}`);
                Log.info("###################################################################################");
                let files=[]
                for(let i=1;i<=3;i++){
                    files.push(getRandomMp4File())
                }
                const {response} = await TestContext.flows.feedFlow.createPostWithMyNewPostMedia(files)
                await ResponseValidator.validateStatus(response,201)
                count++
            }
        })

        test('Bulk Upload - Multimedia - In My Post',async()=>{
            const TOTAL = 1;
            let count = 0
            while(count<TOTAL){
                Log.info("###################################################################################");
                Log.info(`Bulk Upload Multimedia - My Post  - ${count + 1}/${TOTAL}`);
                Log.info("###################################################################################");
                let files=[]
                for(let i=1;i<=2;i++){
                    files.push(getRandomMp4File())
                    files.push(getRandomJpegFile())
                }
                const {response} = await TestContext.flows.feedFlow.createPostWithMyNewPostMedia(files)
                await ResponseValidator.validateStatus(response,201)
                count++
            }
        })

        test('Bulk Upload - Caption Only- In My Post',async()=>{
            const TOTAL = 1;
            let count = 0
            while(count<TOTAL){
                Log.info("###################################################################################");
                Log.info(`Bulk Upload Texual Content - My Post  - ${count + 1}/${TOTAL}`);
                Log.info("###################################################################################");
                const {response} = await TestContext.flows.feedFlow.createPostWithMyCaptionOnly()
                await ResponseValidator.validateStatus(response,201)
                count++
            }
        })
    })

    describe('[no-test-login] Bulk Upload - My Friends Post',()=>{

        describe('Bulk Upload - Image - My Friends Post',()=>{

                test('Bulk Upload - Image - In Friends Public Post',async()=>{
                const TOTAL = 1;
                let count = 0
                while(count<TOTAL){
                    Log.info("###################################################################################");
                    Log.info(`Bulk Upload Image - My Friends Public Post  - ${count + 1}/${TOTAL}`);
                    Log.info("###################################################################################");

                    const {friendId} = await TestContext.flows.userFlow.getRandomFriendOfParticularUser()
                    const {contact_number} = await TestContext.flows.userFlow.getParticularUserDetails(friendId)
                    TestContext.activeUser='current'
                    await TestContext.flows.loginFlow.loginFlow(contact_number,friendId,'current user')
                    let files=[]
                    for(let i=1;i<=3;i++){
                        files.push(getRandomJpegFile())
                    }
                    const {mediaIds} = await TestContext.flows.mediaFlow.verifyUploadStatus('post',files)
                    const payload = FeedFactory.buildPostPayload({
                        mediaIds:mediaIds,
                        visibility:204
                    })
                const {response} = await TestContext.services.feedService.createPost(payload)
                await ResponseValidator.validateStatus(response,201)
                    count++
                }
                })

                test('Bulk Upload - Image - In Friends Hidden Post',async()=>{
                const TOTAL = 1;
                let count = 0
                while(count<TOTAL){
                    Log.info("###################################################################################");
                    Log.info(`Bulk Upload Image - My Friends Hidden Post  - ${count + 1}/${TOTAL}`);
                    Log.info("###################################################################################");

                    const {friendId} = await TestContext.flows.userFlow.getRandomFriendOfParticularUser()
                    const {contact_number} = await TestContext.flows.userFlow.getParticularUserDetails(friendId)
                    TestContext.activeUser='current'
                    await TestContext.flows.loginFlow.loginFlow(contact_number,friendId,'current user')
                    let files=[]
                    for(let i=1;i<=3;i++){
                        files.push(getRandomJpegFile())
                    }
                    const {mediaIds} = await TestContext.flows.mediaFlow.verifyUploadStatus('post',files)
                    const payload = FeedFactory.buildPostPayload({
                        mediaIds:mediaIds,
                        visibility:201
                    })
                const {response} = await TestContext.services.feedService.createPost(payload)
                await ResponseValidator.validateStatus(response,201)
                    count++
                }
                })

                test('Bulk Upload - Image - In Friends Friends Only Visibility Post',async()=>{
                const TOTAL = 1;
                let count = 0
                while(count<TOTAL){
                    Log.info("###################################################################################");
                    Log.info(`Bulk Upload Image - My Friends Friends Only Visible Post - ${count + 1}/${TOTAL}`);
                    Log.info("###################################################################################");

                    const {friendId} = await TestContext.flows.userFlow.getRandomFriendOfParticularUser()
                    const {contact_number} = await TestContext.flows.userFlow.getParticularUserDetails(friendId)
                    TestContext.activeUser='current'
                    await TestContext.flows.loginFlow.loginFlow(contact_number,friendId,'current user')
                    let files=[]
                    for(let i=1;i<=3;i++){
                        files.push(getRandomJpegFile())
                    }
                    const {mediaIds} = await TestContext.flows.mediaFlow.verifyUploadStatus('post',files)
                    const payload = FeedFactory.buildPostPayload({
                        mediaIds:mediaIds,
                        visibility:202
                    })
                const {response} = await TestContext.services.feedService.createPost(payload)
                await ResponseValidator.validateStatus(response,201)
                    count++
                }
                })

                test('Bulk Upload - Image - In Friends Friends of Friends Only Visibility Post',async()=>{
                const TOTAL = 1;
                let count = 0
                while(count<TOTAL){
                    Log.info("###################################################################################");
                    Log.info(`Bulk Upload Image - My Friends Friends Of Friend Visible Post  - ${count + 1}/${TOTAL}`);
                    Log.info("###################################################################################");

                    const {friendId} = await TestContext.flows.userFlow.getRandomFriendOfParticularUser()
                    const {contact_number} = await TestContext.flows.userFlow.getParticularUserDetails(friendId)
                    TestContext.activeUser='current'
                    await TestContext.flows.loginFlow.loginFlow(contact_number,friendId,'current user')
                    let files=[]
                    for(let i=1;i<=3;i++){
                        files.push(getRandomJpegFile())
                    }
                    const {mediaIds} = await TestContext.flows.mediaFlow.verifyUploadStatus('post',files)
                    const payload = FeedFactory.buildPostPayload({
                        mediaIds:mediaIds,
                        visibility:203
                    })
                const {response} = await TestContext.services.feedService.createPost(payload)
                await ResponseValidator.validateStatus(response,201)
                    count++
                }
                })
        })


        describe('[no-test-login] Bulk Upload - Video - In Friends Post',()=>{

                test('Bulk Upload - Video - In Friends Public Post',async()=>{
                const TOTAL = 1;
                let count = 0
                while(count<TOTAL){
                    Log.info("###################################################################################");
                    Log.info(`Bulk Upload Video - My Friends Public Post  - ${count + 1}/${TOTAL}`);
                    Log.info("###################################################################################");

                    const {friendId} = await TestContext.flows.userFlow.getRandomFriendOfParticularUser()
                    const {contact_number} = await TestContext.flows.userFlow.getParticularUserDetails(friendId)
                    TestContext.activeUser='current'
                    await TestContext.flows.loginFlow.loginFlow(contact_number,friendId,'current user')
                    let files=[]
                    for(let i=1;i<=3;i++){
                        files.push(getRandomMp4File())
                    }
                    const {mediaIds} = await TestContext.flows.mediaFlow.verifyUploadStatus('post',files)
                    const payload = FeedFactory.buildPostPayload({
                        mediaIds:mediaIds,
                        visibility:204
                    })
                    const {response} = await TestContext.services.feedService.createPost(payload)
                    await ResponseValidator.validateStatus(response,201)
                    count++
                }
                })

                test('Bulk Upload - Video - In Friends Hidden Post',async()=>{
                const TOTAL = 1;
                let count = 0
                while(count<TOTAL){
                    Log.info("###################################################################################");
                    Log.info(`Bulk Upload Video - My Friends Hidden Post  - ${count + 1}/${TOTAL}`);
                    Log.info("###################################################################################");

                    const {friendId} = await TestContext.flows.userFlow.getRandomFriendOfParticularUser()
                    const {contact_number} = await TestContext.flows.userFlow.getParticularUserDetails(friendId)
                    TestContext.activeUser='current'
                    await TestContext.flows.loginFlow.loginFlow(contact_number,friendId,'current user')
                    let files=[]
                    for(let i=1;i<=3;i++){
                        files.push(getRandomMp4File())
                    }
                    const {mediaIds} = await TestContext.flows.mediaFlow.verifyUploadStatus('post',files)
                    const payload = FeedFactory.buildPostPayload({
                        mediaIds:mediaIds,
                        visibility:201
                    })
                    const {response} = await TestContext.services.feedService.createPost(payload)
                    await ResponseValidator.validateStatus(response,201)
                    count++
                }
                })

                test('Bulk Upload - Video - In Friends Friends Only Visibility Post',async()=>{
                const TOTAL = 1;
                let count = 0
                while(count<TOTAL){
                    Log.info("###################################################################################");
                    Log.info(`Bulk Upload Video - My Friends Friends Visible Post  - ${count + 1}/${TOTAL}`);
                    Log.info("###################################################################################");

                    const {friendId} = await TestContext.flows.userFlow.getRandomFriendOfParticularUser()
                    const {contact_number} = await TestContext.flows.userFlow.getParticularUserDetails(friendId)
                    TestContext.activeUser='current'
                    await TestContext.flows.loginFlow.loginFlow(contact_number,friendId,'current user')
                    let files=[]
                    for(let i=1;i<=3;i++){
                        files.push(getRandomMp4File())
                    }
                    const {mediaIds} = await TestContext.flows.mediaFlow.verifyUploadStatus('post',files)
                    const payload = FeedFactory.buildPostPayload({
                        mediaIds:mediaIds,
                        visibility:202
                    })
                    const {response} = await TestContext.services.feedService.createPost(payload)
                    await ResponseValidator.validateStatus(response,201)
                    count++
                }
                })

                test('Bulk Upload - Video - In Friends Friends of Friends Only Visibility Post',async()=>{
                const TOTAL = 1;
                let count = 0
                while(count<TOTAL){
                    Log.info("###################################################################################");
                    Log.info(`Bulk Upload Video - My Friends Friends Of Friend Post  - ${count + 1}/${TOTAL}`);
                    Log.info("###################################################################################");

                    const {friendId} = await TestContext.flows.userFlow.getRandomFriendOfParticularUser()
                    const {contact_number} = await TestContext.flows.userFlow.getParticularUserDetails(friendId)
                    TestContext.activeUser='current'
                    await TestContext.flows.loginFlow.loginFlow(contact_number,friendId,'current user')
                    let files=[]
                    for(let i=1;i<=3;i++){
                        files.push(getRandomMp4File())
                    }
                    const {mediaIds} = await TestContext.flows.mediaFlow.verifyUploadStatus('post',files)
                    const payload = FeedFactory.buildPostPayload({
                        mediaIds:mediaIds,
                        visibility:203
                    })
                    const {response} = await TestContext.services.feedService.createPost(payload)
                    await ResponseValidator.validateStatus(response,201)
                    count++
                }
                })
        })

        describe('[no-test-login] Bulk Upload - Multimedia - In Friends Post',()=>{
                test('Bulk Upload - MultiMedia - In Friends Public Post',async()=>{
                const TOTAL = 1;
                let count = 0
                while(count<TOTAL){
                    Log.info("###################################################################################");
                    Log.info(`Bulk Upload Multimedia - My Friends Public Post  - ${count + 1}/${TOTAL}`);
                    Log.info("###################################################################################");

                    const {friendId} = await TestContext.flows.userFlow.getRandomFriendOfParticularUser()
                    const {contact_number} = await TestContext.flows.userFlow.getParticularUserDetails(friendId)
                    TestContext.activeUser='current'
                    await TestContext.flows.loginFlow.loginFlow(contact_number,friendId,'current user')
                    let files=[]
                    for(let i=1;i<=2;i++){
                        files.push(getRandomJpegFile())
                        files.push(getRandomMp4File())
                    }
                    const {mediaIds} = await TestContext.flows.mediaFlow.verifyUploadStatus('post',files)
                    const payload = FeedFactory.buildPostPayload({
                        mediaIds:mediaIds,
                        visibility:204
                    })
                    const {response} = await TestContext.services.feedService.createPost(payload)
                    await ResponseValidator.validateStatus(response,201)
                    count++
                }
                })

                test('Bulk Upload - Multimedia - In Friends Hidden Post',async()=>{
                const TOTAL = 1;
                let count = 0
                while(count<TOTAL){
                    Log.info("###################################################################################");
                    Log.info(`Bulk Upload Multimedia - My Friends Hidden Post  - ${count + 1}/${TOTAL}`);
                    Log.info("###################################################################################");

                    const {friendId} = await TestContext.flows.userFlow.getRandomFriendOfParticularUser()
                    const {contact_number} = await TestContext.flows.userFlow.getParticularUserDetails(friendId)
                    TestContext.activeUser='current'
                    await TestContext.flows.loginFlow.loginFlow(contact_number,friendId,'current user')
                    let files=[]
                    for(let i=1;i<=2;i++){
                        files.push(getRandomJpegFile())
                        files.push(getRandomMp4File())
                    }
                    const {mediaIds} = await TestContext.flows.mediaFlow.verifyUploadStatus('post',files)
                    const payload = FeedFactory.buildPostPayload({
                        mediaIds:mediaIds,
                        visibility:201
                    })
                    const {response} = await TestContext.services.feedService.createPost(payload)
                    await ResponseValidator.validateStatus(response,201)
                    count++
                }
                })

                test('Bulk Upload - Multimedia - In Friends Friends Only Visibility Post',async()=>{
                const TOTAL = 1;
                let count = 0
                while(count<TOTAL){
                    Log.info("###################################################################################");
                    Log.info(`Bulk Upload Multimedia - My Friends Friends Visible Post   - ${count + 1}/${TOTAL}`);
                    Log.info("###################################################################################");

                    const {friendId} = await TestContext.flows.userFlow.getRandomFriendOfParticularUser()
                    const {contact_number} = await TestContext.flows.userFlow.getParticularUserDetails(friendId)
                    TestContext.activeUser='current'
                    await TestContext.flows.loginFlow.loginFlow(contact_number,friendId,'current user')
                    let files=[]
                    for(let i=1;i<=2;i++){
                        files.push(getRandomJpegFile())
                        files.push(getRandomMp4File())
                    }
                    const {mediaIds} = await TestContext.flows.mediaFlow.verifyUploadStatus('post',files)
                    const payload = FeedFactory.buildPostPayload({
                        mediaIds:mediaIds,
                        visibility:202
                    })
                    const {response} = await TestContext.services.feedService.createPost(payload)
                    await ResponseValidator.validateStatus(response,201)
                    count++
                }
                })

                test('Bulk Upload - Multimedia - In Friends Friends of Friends Only Visibility Post',async()=>{
                const TOTAL = 1;
                let count = 0
                while(count<TOTAL){
                    Log.info("###################################################################################");
                    Log.info(`Bulk Upload Multimedia - My Friends Friends Of Friend Post   - ${count + 1}/${TOTAL}`);
                    Log.info("###################################################################################");

                    const {friendId} = await TestContext.flows.userFlow.getRandomFriendOfParticularUser()
                    const {contact_number} = await TestContext.flows.userFlow.getParticularUserDetails(friendId)
                    TestContext.activeUser='current'
                    await TestContext.flows.loginFlow.loginFlow(contact_number,friendId,'current user')
                    let files=[]
                    for(let i=1;i<=2;i++){
                        files.push(getRandomJpegFile())
                        files.push(getRandomMp4File())
                    }
                    const {mediaIds} = await TestContext.flows.mediaFlow.verifyUploadStatus('post',files)
                    const payload = FeedFactory.buildPostPayload({
                        mediaIds:mediaIds,
                        visibility:203
                    })
                    const {response} = await TestContext.services.feedService.createPost(payload)
                    await ResponseValidator.validateStatus(response,201)
                    count++
                }
                })
        })

        test('[no-test-login] Bulk Upload - Caption Only - In Friends Post',async()=>{
                const TOTAL = 1;
                let count = 0
                while(count<TOTAL){
                    Log.info("###################################################################################");
                    Log.info(`Bulk Upload Textual Content - My Friends Post - ${count + 1}/${TOTAL}`);
                    Log.info("###################################################################################");

                    const {friendId} = await TestContext.flows.userFlow.getRandomFriendOfParticularUser()
                    const {contact_number} = await TestContext.flows.userFlow.getParticularUserDetails(friendId)
                    TestContext.activeUser='current'
                    await TestContext.flows.loginFlow.loginFlow(contact_number,friendId,'current user')
                    const {response} = await TestContext.flows.feedFlow.createPostWithMyCaptionOnly()
                    await ResponseValidator.validateStatus(response,201)
                    count++
                }
        })
    })

    describe('[no-test-login] Bulk Upload - My Friends Friend Post',()=>{
        describe('Bulk Upload - Image - In Friends  Friend Post',()=>{

                test('Bulk Upload - Image - In Friends Friend Public Post',async()=>{
                const TOTAL = 1;
                let count = 0
                while(count<TOTAL){
                    Log.info("###################################################################################");
                    Log.info(`Bulk Upload Image - My Friends Friend Public Post - ${count + 1}/${TOTAL}`);
                    Log.info("###################################################################################");

                    const {friendId} = await TestContext.flows.userFlow.getRandomFriendsOfFriendOfParticularUser()
                    const {contact_number} = await TestContext.flows.userFlow.getParticularUserDetails(friendId)
                    TestContext.activeUser='current'
                    await TestContext.flows.loginFlow.loginFlow(contact_number,friendId,'current user')
                    let files=[]
                    for(let i=1;i<=2;i++){
                        files.push(getRandomJpegFile())
                    }
                    const {mediaIds} = await TestContext.flows.mediaFlow.verifyUploadStatus('post',files)
                    const payload = FeedFactory.buildPostPayload({
                        mediaIds:mediaIds,
                        visibility:204
                    })
                    const {response} = await TestContext.services.feedService.createPost(payload)
                    await ResponseValidator.validateStatus(response,201)
                    count++
                }
                })

                test('Bulk Upload - Image - In Friends Friend Hidden Post',async()=>{
                const TOTAL = 1;
                let count = 0
                while(count<TOTAL){
                    Log.info("###################################################################################");
                    Log.info(`Bulk Upload Image - My Friends Friend Hidden Post  - ${count + 1}/${TOTAL}`);
                    Log.info("###################################################################################");

                    const {friendId} = await TestContext.flows.userFlow.getRandomFriendsOfFriendOfParticularUser()
                    const {contact_number} = await TestContext.flows.userFlow.getParticularUserDetails(friendId)
                    TestContext.activeUser='current'
                    await TestContext.flows.loginFlow.loginFlow(contact_number,friendId,'current user')
                    let files=[]
                    for(let i=1;i<=2;i++){
                        files.push(getRandomJpegFile())
                    }
                    const {mediaIds} = await TestContext.flows.mediaFlow.verifyUploadStatus('post',files)
                    const payload = FeedFactory.buildPostPayload({
                        mediaIds:mediaIds,
                        visibility:201
                    })
                    const {response} = await TestContext.services.feedService.createPost(payload)
                    await ResponseValidator.validateStatus(response,201)
                    count++
                }
                })

                test('Bulk Upload - Image - In Friends Friend Friends Only Visibility Post',async()=>{
                const TOTAL = 1;
                let count = 0
                while(count<TOTAL){
                    Log.info("###################################################################################");
                    Log.info(`Bulk Upload Image - My Friends Friend - Friend Visible Post - ${count + 1}/${TOTAL}`);
                    Log.info("###################################################################################");

                    const {friendId} = await TestContext.flows.userFlow.getRandomFriendsOfFriendOfParticularUser()
                    const {contact_number} = await TestContext.flows.userFlow.getParticularUserDetails(friendId)
                    TestContext.activeUser='current'
                    await TestContext.flows.loginFlow.loginFlow(contact_number,friendId,'current user')
                    let files=[]
                    for(let i=1;i<=2;i++){
                        files.push(getRandomJpegFile())
                    }
                    const {mediaIds} = await TestContext.flows.mediaFlow.verifyUploadStatus('post',files)
                    const payload = FeedFactory.buildPostPayload({
                        mediaIds:mediaIds,
                        visibility:202
                    })
                    const {response} = await TestContext.services.feedService.createPost(payload)
                    await ResponseValidator.validateStatus(response,201)
                    count++
                }
                })

                test('Bulk Upload - Image - In Friends Friend Friends of Friends Only Visibility Post',async()=>{
                const TOTAL = 1;
                let count = 0
                while(count<TOTAL){
                    Log.info("###################################################################################");
                    Log.info(`Bulk Upload Image - My Friends Friend - Friend Of Friend Visible Post  - ${count + 1}/${TOTAL}`);
                    Log.info("###################################################################################");

                    const {friendId} = await TestContext.flows.userFlow.getRandomFriendsOfFriendOfParticularUser()
                    const {contact_number} = await TestContext.flows.userFlow.getParticularUserDetails(friendId)
                    TestContext.activeUser='current'
                    await TestContext.flows.loginFlow.loginFlow(contact_number,friendId,'current user')
                    let files=[]
                    for(let i=1;i<=2;i++){
                        files.push(getRandomJpegFile())
                    }
                    const {mediaIds} = await TestContext.flows.mediaFlow.verifyUploadStatus('post',files)
                    const payload = FeedFactory.buildPostPayload({
                        mediaIds:mediaIds,
                        visibility:203
                    })
                    const {response} = await TestContext.services.feedService.createPost(payload)
                    await ResponseValidator.validateStatus(response,201)
                    count++
                }
                })
        })

        describe('[no-test-login] Bulk Upload - Video - In Friends Friend Post',()=>{
                test('Bulk Upload - Video - In Friends Friend Public Post',async()=>{
                const TOTAL = 1;
                let count = 0
                while(count<TOTAL){
                    Log.info("###################################################################################");
                    Log.info(`Bulk Upload Video - My Friends Friend Public Post  - ${count + 1}/${TOTAL}`);
                    Log.info("###################################################################################");

                    const {friendId} = await TestContext.flows.userFlow.getRandomFriendsOfFriendOfParticularUser()
                    const {contact_number} = await TestContext.flows.userFlow.getParticularUserDetails(friendId)
                    TestContext.activeUser='current'
                    await TestContext.flows.loginFlow.loginFlow(contact_number,friendId,'current user')
                    let files=[]
                    for(let i=1;i<=2;i++){
                        files.push(getRandomMp4File())
                    }
                    const {mediaIds} = await TestContext.flows.mediaFlow.verifyUploadStatus('post',files)
                    const payload = FeedFactory.buildPostPayload({
                        mediaIds:mediaIds,
                        visibility:204
                    })
                    const {response} = await TestContext.services.feedService.createPost(payload)
                    await ResponseValidator.validateStatus(response,201)
                    count++
                }
                })

                test('Bulk Upload - Video - In Friends Friend Hidden Post',async()=>{
                const TOTAL = 1;
                let count = 0
                while(count<TOTAL){
                    Log.info("###################################################################################");
                    Log.info(`Bulk Upload Video - My Friends Friend Hidden Post- ${count + 1}/${TOTAL}`);
                    Log.info("###################################################################################");

                    const {friendId} = await TestContext.flows.userFlow.getRandomFriendsOfFriendOfParticularUser()
                    const {contact_number} = await TestContext.flows.userFlow.getParticularUserDetails(friendId)
                    TestContext.activeUser='current'
                    await TestContext.flows.loginFlow.loginFlow(contact_number,friendId,'current user')
                    let files=[]
                    for(let i=1;i<=3;i++){
                        files.push(getRandomMp4File())
                    }
                    const {mediaIds} = await TestContext.flows.mediaFlow.verifyUploadStatus('post',files)
                    const payload = FeedFactory.buildPostPayload({
                        mediaIds:mediaIds,
                        visibility:201
                    })
                    const {response} = await TestContext.services.feedService.createPost(payload)
                    await ResponseValidator.validateStatus(response,201)
                    count++
                }
                })

                test('Bulk Upload - Video - In Friends Friend Friends Only Visibility Post',async()=>{
                const TOTAL = 1;
                let count = 0
                while(count<TOTAL){
                    Log.info("###################################################################################");
                    Log.info(`Bulk Upload Video - My Friends Friend - Friend Visible Post - ${count + 1}/${TOTAL}`);
                    Log.info("###################################################################################");

                    const {friendId} = await TestContext.flows.userFlow.getRandomFriendsOfFriendOfParticularUser()
                    const {contact_number} = await TestContext.flows.userFlow.getParticularUserDetails(friendId)
                    TestContext.activeUser='current'
                    await TestContext.flows.loginFlow.loginFlow(contact_number,friendId,'current user')
                    let files=[]
                    for(let i=1;i<=3;i++){
                        files.push(getRandomMp4File())
                    }
                    const {mediaIds} = await TestContext.flows.mediaFlow.verifyUploadStatus('post',files)
                    const payload = FeedFactory.buildPostPayload({
                        mediaIds:mediaIds,
                        visibility:202
                    })
                    const {response} = await TestContext.services.feedService.createPost(payload)
                    await ResponseValidator.validateStatus(response,201)
                    count++
                }
                })

                test('Bulk Upload - Video - In Friends Friend Friends of Friends Only Visibility Post',async()=>{
                const TOTAL = 1;
                let count = 0
                while(count<TOTAL){
                    Log.info("###################################################################################");
                    Log.info(`Bulk Upload Video - My Friends Friend - Friends Of Friend Visible Post- ${count + 1}/${TOTAL}`);
                    Log.info("###################################################################################");

                    const {friendId} = await TestContext.flows.userFlow.getRandomFriendsOfFriendOfParticularUser()
                    const {contact_number} = await TestContext.flows.userFlow.getParticularUserDetails(friendId)
                    TestContext.activeUser='current'
                    await TestContext.flows.loginFlow.loginFlow(contact_number,friendId,'current user')
                    let files=[]
                    for(let i=1;i<=3;i++){
                        files.push(getRandomMp4File())
                    }
                    const {mediaIds} = await TestContext.flows.mediaFlow.verifyUploadStatus('post',files)
                    const payload = FeedFactory.buildPostPayload({
                        mediaIds:mediaIds,
                        visibility:203
                    })
                    const {response} = await TestContext.services.feedService.createPost(payload)
                    await ResponseValidator.validateStatus(response,201)
                    count++
                }
                })
        })

        describe('[no-test-login] Bulk Upload - Multimedia - In Friends Friend Post',()=>{
                test('Bulk Upload - MultiMedia - In Friends Friend Public Post',async()=>{
                const TOTAL = 1;
                let count = 0
                while(count<TOTAL){
                    Log.info("###################################################################################");
                    Log.info(`Bulk Upload Multimedia - My Friends Friend - Public Post- ${count + 1}/${TOTAL}`);
                    Log.info("###################################################################################");

                    const {friendId} = await TestContext.flows.userFlow.getRandomFriendsOfFriendOfParticularUser()
                    const {contact_number} = await TestContext.flows.userFlow.getParticularUserDetails(friendId)
                    TestContext.activeUser='current'
                    await TestContext.flows.loginFlow.loginFlow(contact_number,friendId,'current user')
                    let files=[]
                    for(let i=1;i<=2;i++){
                        files.push(getRandomJpegFile())
                        files.push(getRandomMp4File())
                    }
                    const {mediaIds} = await TestContext.flows.mediaFlow.verifyUploadStatus('post',files)
                    const payload = FeedFactory.buildPostPayload({
                        mediaIds:mediaIds,
                        visibility:204
                    })
                    const {response} = await TestContext.services.feedService.createPost(payload)
                    await ResponseValidator.validateStatus(response,201)
                    count++
                }
                })

                test('Bulk Upload - Multimedia - In Friends Friend Hidden Post',async()=>{
                const TOTAL = 1;
                let count = 0
                while(count<TOTAL){
                    Log.info("###################################################################################");
                    Log.info(`Bulk Upload Multimedia - My Friends Friend - Hidden Visible Post - ${count + 1}/${TOTAL}`);
                    Log.info("###################################################################################");

                    const {friendId} = await TestContext.flows.userFlow.getRandomFriendsOfFriendOfParticularUser()
                    const {contact_number} = await TestContext.flows.userFlow.getParticularUserDetails(friendId)
                    TestContext.activeUser='current'
                    await TestContext.flows.loginFlow.loginFlow(contact_number,friendId,'current user')
                    let files=[]
                    for(let i=1;i<=2;i++){
                        files.push(getRandomJpegFile())
                        files.push(getRandomMp4File())
                    }
                    const {mediaIds} = await TestContext.flows.mediaFlow.verifyUploadStatus('post',files)
                    const payload = FeedFactory.buildPostPayload({
                        mediaIds:mediaIds,
                        visibility:201
                    })
                    const {response} = await TestContext.services.feedService.createPost(payload)
                    await ResponseValidator.validateStatus(response,201)
                    count++
                }
                })

                test('Bulk Upload - Multimedia - In Friends Friend Friends Only Visibility Post',async()=>{
                const TOTAL = 1;
                let count = 0
                while(count<TOTAL){
                    Log.info("###################################################################################");
                    Log.info(`Bulk Multimedia Video - My Friends Friend - Friend Visible Post - ${count + 1}/${TOTAL}`);
                    Log.info("###################################################################################");

                    const {friendId} = await TestContext.flows.userFlow.getRandomFriendsOfFriendOfParticularUser()
                    const {contact_number} = await TestContext.flows.userFlow.getParticularUserDetails(friendId)
                    TestContext.activeUser='current'
                    await TestContext.flows.loginFlow.loginFlow(contact_number,friendId,'current user')
                    let files=[]
                    for(let i=1;i<=2;i++){
                        files.push(getRandomJpegFile())
                        files.push(getRandomMp4File())
                    }
                    const {mediaIds} = await TestContext.flows.mediaFlow.verifyUploadStatus('post',files)
                    const payload = FeedFactory.buildPostPayload({
                        mediaIds:mediaIds,
                        visibility:202
                    })
                    const {response} = await TestContext.services.feedService.createPost(payload)
                    await ResponseValidator.validateStatus(response,201)
                    count++
                }
                })

                test('Bulk Upload - Multimedia - In Friends Friend Friends of Friends Only Visibility Post',async()=>{
                const TOTAL = 1;
                let count = 0
                while(count<TOTAL){
                    Log.info("###################################################################################");
                    Log.info(`Bulk Upload Multimedia - My Friends Friend - Friends Of Friend Visible Post - ${count + 1}/${TOTAL}`);
                    Log.info("###################################################################################");

                    const {friendId} = await TestContext.flows.userFlow.getRandomFriendsOfFriendOfParticularUser()
                    const {contact_number} = await TestContext.flows.userFlow.getParticularUserDetails(friendId)
                    TestContext.activeUser='current'
                    await TestContext.flows.loginFlow.loginFlow(contact_number,friendId,'current user')
                    let files=[]
                    for(let i=1;i<=2;i++){
                        files.push(getRandomJpegFile())
                        files.push(getRandomMp4File())
                    }
                    const {mediaIds} = await TestContext.flows.mediaFlow.verifyUploadStatus('post',files)
                    const payload = FeedFactory.buildPostPayload({
                        mediaIds:mediaIds,
                        visibility:203
                    })
                    const {response} = await TestContext.services.feedService.createPost(payload)
                    await ResponseValidator.validateStatus(response,201)
                    count++
                }
                })
        })

        test('[no-test-login] Bulk Upload - Caption Only- In Friends Friend Post',async()=>{
                const TOTAL = 1;
                let count = 0
                while(count<TOTAL){
                    Log.info("###################################################################################");
                    Log.info(`Bulk Upload Textual Content - Friends Friend Post - ${count + 1}/${TOTAL}`);
                    Log.info("###################################################################################");

                    const {friendId} = await TestContext.flows.userFlow.getRandomFriendsOfFriendOfParticularUser()
                    const {contact_number} = await TestContext.flows.userFlow.getParticularUserDetails(friendId)
                    TestContext.activeUser='current'
                    await TestContext.flows.loginFlow.loginFlow(contact_number,friendId,'current user')
                    const {response} = await TestContext.flows.feedFlow.createPostWithMyCaptionOnly()
                    await ResponseValidator.validateStatus(response,201)
                    count++
                }  
        })
    })

    describe('[no-test-login] Bulk Upload - Non Friend Profile',()=>{

        describe('Bulk Upload - Image - In Non Friends Post',()=>{

                test('Bulk Upload - Image - In Non Friend Public Post',async()=>{
                const TOTAL = 1;
                let count = 0
                while(count<TOTAL){
                    Log.info("###################################################################################");
                    Log.info(`Bulk Image Upload - My Non Friend - Public Post- ${count + 1}/${TOTAL}`);
                    Log.info("###################################################################################");

                    const {friendId} = await TestContext.flows.userFlow.getRandomNonFriendOfParticularUser()
                    const {contact_number} = await TestContext.flows.userFlow.getParticularUserDetails(friendId)
                    TestContext.activeUser='current'
                    await TestContext.flows.loginFlow.loginFlow(contact_number,friendId,'current user')
                    let files=[]
                    for(let i=1;i<=2;i++){
                        files.push(getRandomJpegFile())
                    }
                    const {mediaIds} = await TestContext.flows.mediaFlow.verifyUploadStatus('post',files)
                    const payload = FeedFactory.buildPostPayload({
                        mediaIds:mediaIds,
                        visibility:204
                    })
                    const {response} = await TestContext.services.feedService.createPost(payload)
                    await ResponseValidator.validateStatus(response,201)
                    count++
                }
                })

                test('Bulk Upload - Image - In Non Friend Hidden Post',async()=>{
                const TOTAL = 1;
                let count = 0
                while(count<TOTAL){
                    Log.info("###################################################################################");
                    Log.info(`Bulk Image Upload - My Non Friend - Hidden Post - ${count + 1}/${TOTAL}`);
                    Log.info("###################################################################################");

                    const {friendId} = await TestContext.flows.userFlow.getRandomNonFriendOfParticularUser()
                    const {contact_number} = await TestContext.flows.userFlow.getParticularUserDetails(friendId)
                    TestContext.activeUser='current'
                    await TestContext.flows.loginFlow.loginFlow(contact_number,friendId,'current user')
                    let files=[]
                    for(let i=1;i<=3;i++){
                        files.push(getRandomJpegFile())
                    }
                    const {mediaIds} = await TestContext.flows.mediaFlow.verifyUploadStatus('post',files)
                    const payload = FeedFactory.buildPostPayload({
                        mediaIds:mediaIds,
                        visibility:201
                    })
                    const {response} = await TestContext.services.feedService.createPost(payload)
                    await ResponseValidator.validateStatus(response,201)
                    count++
                }
                })

                test('Bulk Upload - Image - In Non Friend Friends Only Visibility Post',async()=>{
                const TOTAL = 1;
                let count = 0
                while(count<TOTAL){
                    Log.info("###################################################################################");
                    Log.info(`Bulk Image Upload - My Non Friend - Friends Only Visible Post - ${count + 1}/${TOTAL}`);
                    Log.info("###################################################################################");

                    const {friendId} = await TestContext.flows.userFlow.getRandomNonFriendOfParticularUser()
                    const {contact_number} = await TestContext.flows.userFlow.getParticularUserDetails(friendId)
                    TestContext.activeUser='current'
                    await TestContext.flows.loginFlow.loginFlow(contact_number,friendId,'current user')
                    let files=[]
                    for(let i=1;i<=3;i++){
                        files.push(getRandomJpegFile())
                    }
                    const {mediaIds} = await TestContext.flows.mediaFlow.verifyUploadStatus('post',files)
                    const payload = FeedFactory.buildPostPayload({
                        mediaIds:mediaIds,
                        visibility:202
                    })
                    const {response} = await TestContext.services.feedService.createPost(payload)
                    await ResponseValidator.validateStatus(response,201)
                    count++
                }
                })

                test('Bulk Upload - Image - In Non Friends Friends of Friends Only Visibility Post',async()=>{
                const TOTAL = 1;
                let count = 0
                while(count<TOTAL){
                    Log.info("###################################################################################");
                    Log.info(`Bulk Image Upload - My Non Friend - Friends Of Friends Visible Post - ${count + 1}/${TOTAL}`);
                    Log.info("###################################################################################");

                    const {friendId} = await TestContext.flows.userFlow.getRandomNonFriendOfParticularUser()
                    const {contact_number} = await TestContext.flows.userFlow.getParticularUserDetails(friendId)
                    TestContext.activeUser='current'
                    await TestContext.flows.loginFlow.loginFlow(contact_number,friendId,'current user')
                    let files=[]
                    for(let i=1;i<=3;i++){
                        files.push(getRandomJpegFile())
                    }
                    const {mediaIds} = await TestContext.flows.mediaFlow.verifyUploadStatus('post',files)
                    const payload = FeedFactory.buildPostPayload({
                        mediaIds:mediaIds,
                        visibility:203
                    })
                    const {response} = await TestContext.services.feedService.createPost(payload)
                    await ResponseValidator.validateStatus(response,201)
                    count++
                }
                })
        })

        describe('[no-test-login] Bulk Upload - Video - In Non Friends Post',()=>{
                test('Bulk Upload - Video - In Non Friend Public Post',async()=>{
                const TOTAL = 1;
                let count = 0
                while(count<TOTAL){
                    Log.info("###################################################################################");
                    Log.info(`Bulk Video Upload - My Non Friend - Public Post - ${count + 1}/${TOTAL}`);
                    Log.info("###################################################################################");

                    const {friendId} = await TestContext.flows.userFlow.getRandomNonFriendOfParticularUser()
                    const {contact_number} = await TestContext.flows.userFlow.getParticularUserDetails(friendId)
                    TestContext.activeUser='current'
                    await TestContext.flows.loginFlow.loginFlow(contact_number,friendId,'current user')
                    let files=[]
                    for(let i=1;i<=2;i++){
                        files.push(getRandomMp4File())
                    }
                    const {mediaIds} = await TestContext.flows.mediaFlow.verifyUploadStatus('post',files)
                    const payload = FeedFactory.buildPostPayload({
                        mediaIds:mediaIds,
                        visibility:204
                    })
                    const {response} = await TestContext.services.feedService.createPost(payload)
                    await ResponseValidator.validateStatus(response,201)
                    count++
                }
                })

                test('Bulk Upload - Video - In Non Friend Hidden Post',async()=>{
                const TOTAL = 1;
                let count = 0
                while(count<TOTAL){
                    Log.info("###################################################################################");
                    Log.info(`Bulk Video Upload - My Non Friend - Hidden Post  - ${count + 1}/${TOTAL}`);
                    Log.info("###################################################################################");

                    const {friendId} = await TestContext.flows.userFlow.getRandomNonFriendOfParticularUser()
                    const {contact_number} = await TestContext.flows.userFlow.getParticularUserDetails(friendId)
                    TestContext.activeUser='current'
                    await TestContext.flows.loginFlow.loginFlow(contact_number,friendId,'current user')
                    let files=[]
                    for(let i=1;i<=3;i++){
                        files.push(getRandomMp4File())
                    }
                    const {mediaIds} = await TestContext.flows.mediaFlow.verifyUploadStatus('post',files)
                    const payload = FeedFactory.buildPostPayload({
                        mediaIds:mediaIds,
                        visibility:201
                    })
                    const {response} = await TestContext.services.feedService.createPost(payload)
                    await ResponseValidator.validateStatus(response,201)
                    count++
                }
                })

                test('Bulk Upload - Video - In Non Friend Friends Only Visibility Post',async()=>{
                const TOTAL = 1;
                let count = 0
                while(count<TOTAL){
                    Log.info("###################################################################################");
                    Log.info(`Bulk Video Upload - My Non Friend - Friends Only Visible Post  - ${count + 1}/${TOTAL}`);
                    Log.info("###################################################################################");

                    const {friendId} = await TestContext.flows.userFlow.getRandomNonFriendOfParticularUser()
                    const {contact_number} = await TestContext.flows.userFlow.getParticularUserDetails(friendId)
                    TestContext.activeUser='current'
                    await TestContext.flows.loginFlow.loginFlow(contact_number,friendId,'current user')
                    let files=[]
                    for(let i=1;i<=3;i++){
                        files.push(getRandomMp4File())
                    }
                    const {mediaIds} = await TestContext.flows.mediaFlow.verifyUploadStatus('post',files)
                    const payload = FeedFactory.buildPostPayload({
                        mediaIds:mediaIds,
                        visibility:202
                    })
                    const {response} = await TestContext.services.feedService.createPost(payload)
                    await ResponseValidator.validateStatus(response,201)
                    count++
                }
                })

                test('Bulk Upload - Video - In Non Friends Friends of Friends Only Visibility Post',async()=>{
                const TOTAL = 1;
                let count = 0
                while(count<TOTAL){
                    Log.info("###################################################################################");
                    Log.info(`Bulk Video Upload - My Non Friend - Friends Of Friend Visible Post  - ${count + 1}/${TOTAL}`);
                    Log.info("###################################################################################");

                    const {friendId} = await TestContext.flows.userFlow.getRandomNonFriendOfParticularUser()
                    const {contact_number} = await TestContext.flows.userFlow.getParticularUserDetails(friendId)
                    TestContext.activeUser='current'
                    await TestContext.flows.loginFlow.loginFlow(contact_number,friendId,'current user')
                    let files=[]
                    for(let i=1;i<=3;i++){
                        files.push(getRandomMp4File())
                    }
                    const {mediaIds} = await TestContext.flows.mediaFlow.verifyUploadStatus('post',files)
                    const payload = FeedFactory.buildPostPayload({
                        mediaIds:mediaIds,
                        visibility:203
                    })
                    const {response} = await TestContext.services.feedService.createPost(payload)
                    await ResponseValidator.validateStatus(response,201)
                    count++
                }
                })

        })

        describe('[no-test-login] Bulk Upload - Multimedia - In Non Friends Post',()=>{
                test('Bulk Upload - MultiMedia - In Non Friend Public Post',async()=>{
                const TOTAL = 1;
                let count = 0
                while(count<TOTAL){
                    Log.info("###################################################################################");
                    Log.info(`Bulk Multimedia Upload - My Non Friend - Public Post  - ${count + 1}/${TOTAL}`);
                    Log.info("###################################################################################");

                    const {friendId} = await TestContext.flows.userFlow.getRandomNonFriendOfParticularUser()
                    const {contact_number} = await TestContext.flows.userFlow.getParticularUserDetails(friendId)
                    TestContext.activeUser='current'
                    await TestContext.flows.loginFlow.loginFlow(contact_number,friendId,'current user')
                    let files=[]
                    for(let i=1;i<=2;i++){
                        files.push(getRandomJpegFile())
                        files.push(getRandomMp4File())
                    }
                    const {mediaIds} = await TestContext.flows.mediaFlow.verifyUploadStatus('post',files)
                    const payload = FeedFactory.buildPostPayload({
                        mediaIds:mediaIds,
                        visibility:204
                    })
                    const {response} = await TestContext.services.feedService.createPost(payload)
                    await ResponseValidator.validateStatus(response,201)
                    count++
                }
                })

                test('Bulk Upload - Multimedia - In Non Friend Hidden Post',async()=>{
                const TOTAL = 1;
                let count = 0
                while(count<TOTAL){
                    Log.info("###################################################################################");
                    Log.info(`Bulk Video Upload - My Non Friend - Hidden Post  - ${count + 1}/${TOTAL}`);
                    Log.info("###################################################################################");

                    const {friendId} = await TestContext.flows.userFlow.getRandomNonFriendOfParticularUser()
                    const {contact_number} = await TestContext.flows.userFlow.getParticularUserDetails(friendId)
                    TestContext.activeUser='current'
                    await TestContext.flows.loginFlow.loginFlow(contact_number,friendId,'current user')
                    let files=[]
                    for(let i=1;i<=2;i++){
                        files.push(getRandomJpegFile())
                        files.push(getRandomMp4File())
                    }
                    const {mediaIds} = await TestContext.flows.mediaFlow.verifyUploadStatus('post',files)
                    const payload = FeedFactory.buildPostPayload({
                        mediaIds:mediaIds,
                        visibility:201
                    })
                    const {response} = await TestContext.services.feedService.createPost(payload)
                    await ResponseValidator.validateStatus(response,201)
                    count++
                }
                })

                test('Bulk Upload - Multimedia - In Non Friend Friends Only Visibility Post',async()=>{
                const TOTAL = 1;
                let count = 0
                while(count<TOTAL){
                    Log.info("###################################################################################");
                    Log.info(`Bulk Video Upload - My Non Friend - Friends Only Visible Post  - ${count + 1}/${TOTAL}`);
                    Log.info("###################################################################################");

                    const {friendId} = await TestContext.flows.userFlow.getRandomNonFriendOfParticularUser()
                    const {contact_number} = await TestContext.flows.userFlow.getParticularUserDetails(friendId)
                    TestContext.activeUser='current'
                    await TestContext.flows.loginFlow.loginFlow(contact_number,friendId,'current user')
                    let files=[]
                    for(let i=1;i<=2;i++){
                        files.push(getRandomJpegFile())
                        files.push(getRandomMp4File())
                    }
                    const {mediaIds} = await TestContext.flows.mediaFlow.verifyUploadStatus('post',files)
                    const payload = FeedFactory.buildPostPayload({
                        mediaIds:mediaIds,
                        visibility:202
                    })
                    const {response} = await TestContext.services.feedService.createPost(payload)
                    await ResponseValidator.validateStatus(response,201)
                    count++
                }
                })

                test('Bulk Upload - Multimedia - In Non Friends Friends of Friends Only Visibility Post',async()=>{
                const TOTAL = 1;
                let count = 0
                while(count<TOTAL){
                    Log.info("###################################################################################");
                    Log.info(`Bulk Video Upload - My Non Friend - Friends Of Friend Visible Post  - ${count + 1}/${TOTAL}`);
                    Log.info("###################################################################################");

                    const {friendId} = await TestContext.flows.userFlow.getRandomNonFriendOfParticularUser()
                    const {contact_number} = await TestContext.flows.userFlow.getParticularUserDetails(friendId)
                    TestContext.activeUser='current'
                    await TestContext.flows.loginFlow.loginFlow(contact_number,friendId,'current user')
                    let files=[]
                    for(let i=1;i<=2;i++){
                        files.push(getRandomJpegFile())
                        files.push(getRandomMp4File())
                    }
                    const {mediaIds} = await TestContext.flows.mediaFlow.verifyUploadStatus('post',files)
                    const payload = FeedFactory.buildPostPayload({
                        mediaIds:mediaIds,
                        visibility:203
                    })
                    const {response} = await TestContext.services.feedService.createPost(payload)
                    await ResponseValidator.validateStatus(response,201)
                    count++
                }
                })
        })

        test('[no-test-login] Bulk Upload - Caption Only- In Non Friends Post',async()=>{
                const TOTAL = 1;
                let count = 0
                while(count<TOTAL){
                    Log.info("###################################################################################");
                    Log.info(`Bulk Upload Text Content - Non Friends Post- ${count + 1}/${TOTAL}`);
                    Log.info("###################################################################################");

                    const {friendId} = await TestContext.flows.userFlow.getRandomNonFriendOfParticularUser()
                    const {contact_number} = await TestContext.flows.userFlow.getParticularUserDetails(friendId)
                    TestContext.activeUser='current'
                    await TestContext.flows.loginFlow.loginFlow(contact_number,friendId,'current user')
                    const {response} = await TestContext.flows.feedFlow.createPostWithMyCaptionOnly()
                    await ResponseValidator.validateStatus(response, 201)
                    count++
                }  
        })
    })
})