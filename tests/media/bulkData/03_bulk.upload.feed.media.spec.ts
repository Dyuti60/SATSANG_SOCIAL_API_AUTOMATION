import { TestContext } from "src/context/test.context";
import Log from "utils/logger";
import { getRandomJpegFile, getRandomMp4File } from "utils/mediaPicker";
import { FeedFlow } from '../../../src/workflow/feed.api.flow';
import { FeedFactory } from "testdata/factory/feed.factory";

describe('Bulk Data Creation For Feed',()=>{

    describe('Bulk Upload My Post',()=>{
        test('Bulk Upload - Image - In My Post',async()=>{
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
                await TestContext.flows.feedFlow.createPostWithMyNewPostMedia(files)
            }
        })

        test('Bulk Upload - Video - In My Post',async()=>{
            const TOTAL = 3;
            let count = 0
            while(count<TOTAL){
                Log.info("###################################################################################");
                Log.info(`Bulk Data Upload In Minio for Story - ${count + 1}/${TOTAL}`);
                Log.info("###################################################################################");
                let files=[]
                for(let i=1;i<=3;i++){
                    files.push(getRandomMp4File())
                }
                await TestContext.flows.feedFlow.createPostWithMyNewPostMedia(files)
            }
        })

        test('Bulk Upload - Multimedia - In My Post',async()=>{
            const TOTAL = 3;
            let count = 0
            while(count<TOTAL){
                Log.info("###################################################################################");
                Log.info(`Bulk Data Upload In Minio for Story - ${count + 1}/${TOTAL}`);
                Log.info("###################################################################################");
                let files=[]
                for(let i=1;i<=2;i++){
                    files.push(getRandomMp4File())
                    files.push(getRandomJpegFile())
                }
                await TestContext.flows.feedFlow.createPostWithMyNewPostMedia(files)
            }
        })

        test('Bulk Upload - Caption Only- In My Post',async()=>{
            const TOTAL = 3;
            let count = 0
            while(count<TOTAL){
                Log.info("###################################################################################");
                Log.info(`Bulk Data Upload In Minio for Story - ${count + 1}/${TOTAL}`);
                Log.info("###################################################################################");
                await TestContext.flows.feedFlow.createPostWithMyCaptionOnly()
            }
        })
    })

    describe('Bulk Upload - My Friends Post',()=>{

        describe('Bulk Upload - Image - My Friends Post',()=>{

                test('Bulk Upload - Image - In Friends Public Post',async()=>{
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
                    const {mediaIds} = await TestContext.flows.mediaFlow.verifyUploadStatus('post',files)
                    const payload = FeedFactory.buildPostPayload({
                        mediaIds:mediaIds,
                        visibility:204
                    })
                    await TestContext.services.feedService.createPost(payload)
                }
                })

                test('Bulk Upload - Image - In Friends Hidden Post',async()=>{
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
                    const {mediaIds} = await TestContext.flows.mediaFlow.verifyUploadStatus('post',files)
                    const payload = FeedFactory.buildPostPayload({
                        mediaIds:mediaIds,
                        visibility:201
                    })
                    await TestContext.services.feedService.createPost(payload)
                }
                })

                test('Bulk Upload - Image - In Friends Friends Only Visibility Post',async()=>{
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
                    const {mediaIds} = await TestContext.flows.mediaFlow.verifyUploadStatus('post',files)
                    const payload = FeedFactory.buildPostPayload({
                        mediaIds:mediaIds,
                        visibility:202
                    })
                    await TestContext.services.feedService.createPost(payload)
                }
                })

                test('Bulk Upload - Image - In Friends Friends of Friends Only Visibility Post',async()=>{
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
                    const {mediaIds} = await TestContext.flows.mediaFlow.verifyUploadStatus('post',files)
                    const payload = FeedFactory.buildPostPayload({
                        mediaIds:mediaIds,
                        visibility:203
                    })
                    await TestContext.services.feedService.createPost(payload)
                }
                })
        })


        describe('Bulk Upload - Video - In Friends Post',()=>{

                test('Bulk Upload - Video - In Friends Public Post',async()=>{
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
                        files.push(getRandomMp4File())
                    }
                    const {mediaIds} = await TestContext.flows.mediaFlow.verifyUploadStatus('post',files)
                    const payload = FeedFactory.buildPostPayload({
                        mediaIds:mediaIds,
                        visibility:204
                    })
                    await TestContext.services.feedService.createPost(payload)
                }
                })

                test('Bulk Upload - Video - In Friends Hidden Post',async()=>{
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
                        files.push(getRandomMp4File())
                    }
                    const {mediaIds} = await TestContext.flows.mediaFlow.verifyUploadStatus('post',files)
                    const payload = FeedFactory.buildPostPayload({
                        mediaIds:mediaIds,
                        visibility:201
                    })
                    await TestContext.services.feedService.createPost(payload)
                }
                })

                test('Bulk Upload - Video - In Friends Friends Only Visibility Post',async()=>{
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
                        files.push(getRandomMp4File())
                    }
                    const {mediaIds} = await TestContext.flows.mediaFlow.verifyUploadStatus('post',files)
                    const payload = FeedFactory.buildPostPayload({
                        mediaIds:mediaIds,
                        visibility:202
                    })
                    await TestContext.services.feedService.createPost(payload)
                }
                })

                test('Bulk Upload - Video - In Friends Friends of Friends Only Visibility Post',async()=>{
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
                        files.push(getRandomMp4File())
                    }
                    const {mediaIds} = await TestContext.flows.mediaFlow.verifyUploadStatus('post',files)
                    const payload = FeedFactory.buildPostPayload({
                        mediaIds:mediaIds,
                        visibility:203
                    })
                    await TestContext.services.feedService.createPost(payload)
                }
                })
        })

        describe('Bulk Upload - Multimedia - In Friends Post',()=>{
                test('Bulk Upload - MultiMedia - In Friends Public Post',async()=>{
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
                    for(let i=1;i<=2;i++){
                        files.push(getRandomJpegFile())
                        files.push(getRandomMp4File())
                    }
                    const {mediaIds} = await TestContext.flows.mediaFlow.verifyUploadStatus('post',files)
                    const payload = FeedFactory.buildPostPayload({
                        mediaIds:mediaIds,
                        visibility:204
                    })
                    await TestContext.services.feedService.createPost(payload)
                }
                })

                test('Bulk Upload - Multimedia - In Friends Hidden Post',async()=>{
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
                        files.push(getRandomMp4File())
                    }
                    const {mediaIds} = await TestContext.flows.mediaFlow.verifyUploadStatus('post',files)
                    const payload = FeedFactory.buildPostPayload({
                        mediaIds:mediaIds,
                        visibility:201
                    })
                    await TestContext.services.feedService.createPost(payload)
                }
                })

                test('Bulk Upload - Multimedia - In Friends Friends Only Visibility Post',async()=>{
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
                        files.push(getRandomMp4File())
                    }
                    const {mediaIds} = await TestContext.flows.mediaFlow.verifyUploadStatus('post',files)
                    const payload = FeedFactory.buildPostPayload({
                        mediaIds:mediaIds,
                        visibility:202
                    })
                    await TestContext.services.feedService.createPost(payload)
                }
                })

                test('Bulk Upload - Multimedia - In Friends Friends of Friends Only Visibility Post',async()=>{
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
                        files.push(getRandomMp4File())
                    }
                    const {mediaIds} = await TestContext.flows.mediaFlow.verifyUploadStatus('post',files)
                    const payload = FeedFactory.buildPostPayload({
                        mediaIds:mediaIds,
                        visibility:203
                    })
                    await TestContext.services.feedService.createPost(payload)
                }
                })
        })

        test('Bulk Upload - Caption Only - In Friends Post',async()=>{
                const TOTAL = 3;
                let count = 0
                while(count<TOTAL){
                    Log.info("###################################################################################");
                    Log.info(`Bulk Data Upload In Minio for Story - ${count + 1}/${TOTAL}`);
                    Log.info("###################################################################################");

                    const {friendId} = await TestContext.flows.userFlow.getRandomFriendOfParticularUser()
                    const {contact_number} = await TestContext.flows.userFlow.getParticularUserDetails(friendId)
                    await TestContext.flows.loginFlow.loginFlow(contact_number,friendId,'current user')
                    await TestContext.flows.feedFlow.createPostWithMyCaptionOnly()
                }
        })
    })

    describe('Bulk Upload - My Friends Friend Post',()=>{
        describe('Bulk Upload - Image - In Friends  Friend Post',()=>{

                test('Bulk Upload - Image - In Friends Friend Public Post',async()=>{
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
                    for(let i=1;i<=2;i++){
                        files.push(getRandomJpegFile())
                    }
                    const {mediaIds} = await TestContext.flows.mediaFlow.verifyUploadStatus('post',files)
                    const payload = FeedFactory.buildPostPayload({
                        mediaIds:mediaIds,
                        visibility:204
                    })
                    await TestContext.services.feedService.createPost(payload)
                }
                })

                test('Bulk Upload - Image - In Friends Friend Hidden Post',async()=>{
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
                    const {mediaIds} = await TestContext.flows.mediaFlow.verifyUploadStatus('post',files)
                    const payload = FeedFactory.buildPostPayload({
                        mediaIds:mediaIds,
                        visibility:201
                    })
                    await TestContext.services.feedService.createPost(payload)
                }
                })

                test('Bulk Upload - Image - In Friends Friend Friends Only Visibility Post',async()=>{
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
                    const {mediaIds} = await TestContext.flows.mediaFlow.verifyUploadStatus('post',files)
                    const payload = FeedFactory.buildPostPayload({
                        mediaIds:mediaIds,
                        visibility:202
                    })
                    await TestContext.services.feedService.createPost(payload)
                }
                })

                test('Bulk Upload - Image - In Friends Friend Friends of Friends Only Visibility Post',async()=>{
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
                    const {mediaIds} = await TestContext.flows.mediaFlow.verifyUploadStatus('post',files)
                    const payload = FeedFactory.buildPostPayload({
                        mediaIds:mediaIds,
                        visibility:203
                    })
                    await TestContext.services.feedService.createPost(payload)
                }
                })
        })

        describe('Bulk Upload - Video - In Friends Friend Post',()=>{
                test('Bulk Upload - Video - In Friends Friend Public Post',async()=>{
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
                    for(let i=1;i<=2;i++){
                        files.push(getRandomMp4File())
                    }
                    const {mediaIds} = await TestContext.flows.mediaFlow.verifyUploadStatus('post',files)
                    const payload = FeedFactory.buildPostPayload({
                        mediaIds:mediaIds,
                        visibility:204
                    })
                    await TestContext.services.feedService.createPost(payload)
                }
                })

                test('Bulk Upload - Video - In Friends Friend Hidden Post',async()=>{
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
                        files.push(getRandomMp4File())
                    }
                    const {mediaIds} = await TestContext.flows.mediaFlow.verifyUploadStatus('post',files)
                    const payload = FeedFactory.buildPostPayload({
                        mediaIds:mediaIds,
                        visibility:201
                    })
                    await TestContext.services.feedService.createPost(payload)
                }
                })

                test('Bulk Upload - Video - In Friends Friend Friends Only Visibility Post',async()=>{
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
                        files.push(getRandomMp4File())
                    }
                    const {mediaIds} = await TestContext.flows.mediaFlow.verifyUploadStatus('post',files)
                    const payload = FeedFactory.buildPostPayload({
                        mediaIds:mediaIds,
                        visibility:202
                    })
                    await TestContext.services.feedService.createPost(payload)
                }
                })

                test('Bulk Upload - Video - In Friends Friend Friends of Friends Only Visibility Post',async()=>{
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
                        files.push(getRandomMp4File())
                    }
                    const {mediaIds} = await TestContext.flows.mediaFlow.verifyUploadStatus('post',files)
                    const payload = FeedFactory.buildPostPayload({
                        mediaIds:mediaIds,
                        visibility:203
                    })
                    await TestContext.services.feedService.createPost(payload)
                }
                })
        })

        describe('Bulk Upload - Multimedia - In Friends Friend Post',()=>{
                test('Bulk Upload - MultiMedia - In Friends Friend Public Post',async()=>{
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
                    for(let i=1;i<=2;i++){
                        files.push(getRandomJpegFile())
                        files.push(getRandomMp4File())
                    }
                    const {mediaIds} = await TestContext.flows.mediaFlow.verifyUploadStatus('post',files)
                    const payload = FeedFactory.buildPostPayload({
                        mediaIds:mediaIds,
                        visibility:204
                    })
                    await TestContext.services.feedService.createPost(payload)
                }
                })

                test('Bulk Upload - Multimedia - In Friends Friend Hidden Post',async()=>{
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
                        files.push(getRandomMp4File())
                    }
                    const {mediaIds} = await TestContext.flows.mediaFlow.verifyUploadStatus('post',files)
                    const payload = FeedFactory.buildPostPayload({
                        mediaIds:mediaIds,
                        visibility:201
                    })
                    await TestContext.services.feedService.createPost(payload)
                }
                })

                test('Bulk Upload - Multimedia - In Friends Friend Friends Only Visibility Post',async()=>{
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
                        files.push(getRandomMp4File())
                    }
                    const {mediaIds} = await TestContext.flows.mediaFlow.verifyUploadStatus('post',files)
                    const payload = FeedFactory.buildPostPayload({
                        mediaIds:mediaIds,
                        visibility:202
                    })
                    await TestContext.services.feedService.createPost(payload)
                }
                })

                test('Bulk Upload - Multimedia - In Friends Friend Friends of Friends Only Visibility Post',async()=>{
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
                        files.push(getRandomMp4File())
                    }
                    const {mediaIds} = await TestContext.flows.mediaFlow.verifyUploadStatus('post',files)
                    const payload = FeedFactory.buildPostPayload({
                        mediaIds:mediaIds,
                        visibility:203
                    })
                    await TestContext.services.feedService.createPost(payload)
                }
                })
        })

        test('Bulk Upload - Caption Only- In Friends Friend Post',async()=>{
                const TOTAL = 3;
                let count = 0
                while(count<TOTAL){
                    Log.info("###################################################################################");
                    Log.info(`Bulk Data Upload In Minio for Story - ${count + 1}/${TOTAL}`);
                    Log.info("###################################################################################");

                    const {friendId} = await TestContext.flows.userFlow.getRandomFriendsOfFriendOfParticularUser()
                    const {contact_number} = await TestContext.flows.userFlow.getParticularUserDetails(friendId)
                    await TestContext.flows.loginFlow.loginFlow(contact_number,friendId,'current user')
                    await TestContext.flows.feedFlow.createPostWithMyCaptionOnly()
                }  
        })
    })

    describe('Bulk Upload - Non Friend Profile',()=>{

        describe('Bulk Upload - Image - In Non Friends Post',()=>{

                test('Bulk Upload - Image - In Non Friend Public Post',async()=>{
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
                    for(let i=1;i<=2;i++){
                        files.push(getRandomJpegFile())
                    }
                    const {mediaIds} = await TestContext.flows.mediaFlow.verifyUploadStatus('post',files)
                    const payload = FeedFactory.buildPostPayload({
                        mediaIds:mediaIds,
                        visibility:204
                    })
                    await TestContext.services.feedService.createPost(payload)
                }
                })

                test('Bulk Upload - Image - In Non Friend Hidden Post',async()=>{
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
                    const {mediaIds} = await TestContext.flows.mediaFlow.verifyUploadStatus('post',files)
                    const payload = FeedFactory.buildPostPayload({
                        mediaIds:mediaIds,
                        visibility:201
                    })
                    await TestContext.services.feedService.createPost(payload)
                }
                })

                test('Bulk Upload - Image - In Non Friend Friends Only Visibility Post',async()=>{
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
                    const {mediaIds} = await TestContext.flows.mediaFlow.verifyUploadStatus('post',files)
                    const payload = FeedFactory.buildPostPayload({
                        mediaIds:mediaIds,
                        visibility:202
                    })
                    await TestContext.services.feedService.createPost(payload)
                }
                })

                test('Bulk Upload - Image - In Non Friends Friends of Friends Only Visibility Post',async()=>{
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
                    const {mediaIds} = await TestContext.flows.mediaFlow.verifyUploadStatus('post',files)
                    const payload = FeedFactory.buildPostPayload({
                        mediaIds:mediaIds,
                        visibility:203
                    })
                    await TestContext.services.feedService.createPost(payload)
                }
                })
        })

        describe('Bulk Upload - Video - In Non Friends Post',()=>{
                test('Bulk Upload - Video - In Non Friend Public Post',async()=>{
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
                    for(let i=1;i<=2;i++){
                        files.push(getRandomMp4File())
                    }
                    const {mediaIds} = await TestContext.flows.mediaFlow.verifyUploadStatus('post',files)
                    const payload = FeedFactory.buildPostPayload({
                        mediaIds:mediaIds,
                        visibility:204
                    })
                    await TestContext.services.feedService.createPost(payload)
                }
                })

                test('Bulk Upload - Video - In Non Friend Hidden Post',async()=>{
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
                        files.push(getRandomMp4File())
                    }
                    const {mediaIds} = await TestContext.flows.mediaFlow.verifyUploadStatus('post',files)
                    const payload = FeedFactory.buildPostPayload({
                        mediaIds:mediaIds,
                        visibility:201
                    })
                    await TestContext.services.feedService.createPost(payload)
                }
                })

                test('Bulk Upload - Video - In Non Friend Friends Only Visibility Post',async()=>{
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
                        files.push(getRandomMp4File())
                    }
                    const {mediaIds} = await TestContext.flows.mediaFlow.verifyUploadStatus('post',files)
                    const payload = FeedFactory.buildPostPayload({
                        mediaIds:mediaIds,
                        visibility:202
                    })
                    await TestContext.services.feedService.createPost(payload)
                }
                })

                test('Bulk Upload - Video - In Non Friends Friends of Friends Only Visibility Post',async()=>{
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
                        files.push(getRandomMp4File())
                    }
                    const {mediaIds} = await TestContext.flows.mediaFlow.verifyUploadStatus('post',files)
                    const payload = FeedFactory.buildPostPayload({
                        mediaIds:mediaIds,
                        visibility:203
                    })
                    await TestContext.services.feedService.createPost(payload)
                }
                })

        })

        describe('Bulk Upload - Multimedia - In Non Friends Post',()=>{
                test('Bulk Upload - MultiMedia - In Non Friend Public Post',async()=>{
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
                    for(let i=1;i<=2;i++){
                        files.push(getRandomJpegFile())
                        files.push(getRandomMp4File())
                    }
                    const {mediaIds} = await TestContext.flows.mediaFlow.verifyUploadStatus('post',files)
                    const payload = FeedFactory.buildPostPayload({
                        mediaIds:mediaIds,
                        visibility:204
                    })
                    await TestContext.services.feedService.createPost(payload)
                }
                })

                test('Bulk Upload - Multimedia - In Non Friend Hidden Post',async()=>{
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
                        files.push(getRandomMp4File())
                    }
                    const {mediaIds} = await TestContext.flows.mediaFlow.verifyUploadStatus('post',files)
                    const payload = FeedFactory.buildPostPayload({
                        mediaIds:mediaIds,
                        visibility:201
                    })
                    await TestContext.services.feedService.createPost(payload)
                }
                })

                test('Bulk Upload - Multimedia - In Non Friend Friends Only Visibility Post',async()=>{
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
                        files.push(getRandomMp4File())
                    }
                    const {mediaIds} = await TestContext.flows.mediaFlow.verifyUploadStatus('post',files)
                    const payload = FeedFactory.buildPostPayload({
                        mediaIds:mediaIds,
                        visibility:202
                    })
                    await TestContext.services.feedService.createPost(payload)
                }
                })

                test('Bulk Upload - Multimedia - In Non Friends Friends of Friends Only Visibility Post',async()=>{
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
                        files.push(getRandomMp4File())
                    }
                    const {mediaIds} = await TestContext.flows.mediaFlow.verifyUploadStatus('post',files)
                    const payload = FeedFactory.buildPostPayload({
                        mediaIds:mediaIds,
                        visibility:203
                    })
                    await TestContext.services.feedService.createPost(payload)
                }
                })
        })

        test('Bulk Upload - Caption Only- In Non Friends Post',async()=>{
                const TOTAL = 3;
                let count = 0
                while(count<TOTAL){
                    Log.info("###################################################################################");
                    Log.info(`Bulk Data Upload In Minio for Story - ${count + 1}/${TOTAL}`);
                    Log.info("###################################################################################");

                    const {friendId} = await TestContext.flows.userFlow.getRandomNonFriendOfParticularUser()
                    const {contact_number} = await TestContext.flows.userFlow.getParticularUserDetails(friendId)
                    await TestContext.flows.loginFlow.loginFlow(contact_number,friendId,'current user')
                    await TestContext.flows.feedFlow.createPostWithMyCaptionOnly()
                }  
        })
    })
})