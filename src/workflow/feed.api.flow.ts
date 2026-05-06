import { ServiceContainer } from "../../src/services/service.container";
import { LoginFlow } from './login.api.flow';
import { TestContext } from "../../src/context/test.context";
import { MediaFlow } from "./media.api.flow";
import { FeedFactory } from "../testdata/factory/feed.factory";
import { getMemDetailsFromJwt } from "../helper/auth/jwt.decode";

export class FeedFlow{
    constructor(
        private service: ServiceContainer,
        private loginFlow: LoginFlow,
        private mediaFlow: MediaFlow
    ){}

    async loginUserFlow(contactNumber:string){
        TestContext.activeUser='current'
        await this.loginFlow.loginFlow(contactNumber)
    }

    async postMediaUpload(files:string[]){
        const {response, mediaIds} = await this.mediaFlow.verifyUploadStatus('post',files)
        return {
            mediaIds
        }
    }

//////////////////////////////////////// MY MEDIA /////////////////////////////////////

    async createPostWithMyNewPostMedia(files: string[]){
        const {mediaIds} = await this.postMediaUpload(files)
        const payload = FeedFactory.buildPostPayload({
            mediaIds: mediaIds
        })
        const response = await this.service.feedService.createPost(payload)
        return {
            response
        }
    }

    async createPostWithMyNewStoryMedia(files: string[]){
        const {mediaIds} = await this.mediaFlow.verifyUploadStatus('story',files)
        const payload = FeedFactory.buildPostPayload({
            mediaIds: mediaIds
        })
        const response = await this.service.feedService.createPost(payload)
        return {
            response
        }
    }

    async createPostWithMyNewChatMedia(files: string[]){
        const {mediaIds} = await this.mediaFlow.verifyUploadStatus('chat',files)
        const payload = FeedFactory.buildPostPayload({
            mediaIds: mediaIds
        })
        const response = await this.service.feedService.createPost(payload)
        return {
            response
        }
    }

    async createPostWithMyNewProfileMedia(files: string[]){
        const {mediaIds} = await this.mediaFlow.verifyUploadStatus('profile',files)
        const payload = FeedFactory.buildPostPayload({
            mediaIds: mediaIds
        })
        const response = await this.service.feedService.createPost(payload)
        return {
            response
        }
    }


    async createPostWithMyExistingMinioLoadedPostMedia(){
        const {memuuid} = getMemDetailsFromJwt(TestContext.accessToken)
        const {postMediaId, postUrl} = await TestContext.services.feedRepo.getMyRandomMinioPostMedia(memuuid)
        const payload = FeedFactory.buildPostPayload({
            mediaIds: [postMediaId]
        })
        const response = await this.service.feedService.createPost(payload)
        return {
            response
        }
    }

    async createPostWithMyPostMedia(type:'public'|'deleted'|'hidden'|'fof visibility'|'friends visibility'){
        const {memuuid} = getMemDetailsFromJwt(TestContext.accessToken)
        let postId, userId, caption, postMediaId
        if(type=='public'){
            ({postId, userId, caption, postMediaId} = await TestContext.services.feedRepo.getMyRandomPublicPost(memuuid))
        }
        else if(type=='hidden'){
            ({postId, userId, caption, postMediaId} = await TestContext.services.feedRepo.getMyRandomHiddenPost(memuuid))
        }
        else if(type=='deleted'){
            ({postId, userId, caption, postMediaId} = await TestContext.services.feedRepo.getMyRandomDeletedPost(memuuid))
        }
        else if (type=='friends visibility'){
            ({postId, userId, caption, postMediaId} = await TestContext.services.feedRepo.getMyRandomPostWithFriendsVisibility(memuuid))
        }
        else if (type =='fof visibility'){
            ({postId, userId, caption, postMediaId} = await TestContext.services.feedRepo.getMyFriendsOfFriendsRandomPublicPost(memuuid))
        }
        
        const payload = FeedFactory.buildPostPayload({
            mediaIds: [postMediaId]
        })
        const response = await this.service.feedService.createPost(payload)
        return {
            response
        }
    }

    async createPostWithMyExistingMinioLoadedChatMedia(){
        const {memuuid} = getMemDetailsFromJwt(TestContext.accessToken)
        const {chatMediaId, chatUrl} = await TestContext.services.feedRepo.getMyRandomMinioChatMedia(memuuid)
        const payload = FeedFactory.buildPostPayload({
            mediaIds: [chatMediaId]
        })
        const response = await this.service.feedService.createPost(payload)
        return {
            response
        }
    }

    async createPostWithMyAlreadyPostedChatMedia(){
        const {memuuid} = getMemDetailsFromJwt(TestContext.accessToken)
        const data = await TestContext.services.feedRepo.getMyRandomChatMedia(memuuid)
        const payload = FeedFactory.buildPostPayload({
            mediaIds: [data?.mediaId]
        })
        const response = await this.service.feedService.createPost(payload)
        return {
            response
        }
    }

    async createPostWithMyExistingMinioLoadedStoryMedia(){
        const {memuuid} = getMemDetailsFromJwt(TestContext.accessToken)
        const {storyMediaId, storyUrl} = await TestContext.services.feedRepo.getMyRandomMinioStoryMedia(memuuid)
        const payload = FeedFactory.buildPostPayload({
            mediaIds: [storyMediaId]
        })
        const response = await this.service.feedService.createPost(payload)
        return {
            response
        }
    }

    async createPostWithMyAlreadyPostedStoryMedia(){
        const {memuuid} = getMemDetailsFromJwt(TestContext.accessToken)
        const {storyId, storyMediaId} = await TestContext.services.feedRepo.getMyRandomStoryMedia(memuuid)
        const payload = FeedFactory.buildPostPayload({
            mediaIds: [storyMediaId]
        })
        const response = await this.service.feedService.createPost(payload)
        return {
            response
        }
    }

    async createPostWithMyExistingMinioLoadedProfileMedia(){
        const {memuuid} = getMemDetailsFromJwt(TestContext.accessToken)
        const {profileMediaId, profileUrl} = await TestContext.services.feedRepo.getMyRandomMinioProfileMedia(memuuid)
        const payload = FeedFactory.buildPostPayload({
            mediaIds: [profileMediaId]
        })
        const response = await this.service.feedService.createPost(payload)
        return {
            response
        }
    }

    async createPostWithMyAlreadyPostedProfileMedia(){
        const {memuuid} = getMemDetailsFromJwt(TestContext.accessToken)
        const {mediaId} = await TestContext.services.feedRepo.getMyRandomProfileMediaId(memuuid)
        const payload = FeedFactory.buildPostPayload({
            mediaIds: [mediaId]
        })
        const response = await this.service.feedService.createPost(payload)
        return {
            response
        }
    }

    async createPostWithMyCaptionOnly(){
        const payload = FeedFactory.buildPostPayload()
        const response = await this.service.feedService.createPost(payload)
        return {
            response
        }
    }

///////////////////////////////////////////// OTHERS MEDIA : My Friends///////////////////////////////////////

    async createPostWithFriendsExistingMinioLoadedPostMedia(){
        const {memuuid} = getMemDetailsFromJwt(TestContext.accessToken)
        const {postUrl, postMediaId} = await TestContext.services.feedRepo.getMyFriendsMinioLoadedPostMedia(memuuid)
        const payload = FeedFactory.buildPostPayload({
            mediaIds: [postMediaId]
        })
        const response = await this.service.feedService.createPost(payload)
        return {
            response
        }
    }

    async createPostWithFriendsPostedPostMedia(){
        const {memuuid} = getMemDetailsFromJwt(TestContext.accessToken)
        const {postId, userId, caption, postMediaId} = await TestContext.services.feedRepo.getMyFriendsRandomPost(memuuid)
        const payload = FeedFactory.buildPostPayload({
            mediaIds: [postMediaId]
        })
        const response = await this.service.feedService.createPost(payload)
        return {
            response
        }
    }

////////////////////////////////////////////REACT TO A POST///////////////////////////////////////////////////


    async reactToMyPost(type:'public'|'hidden'|'deleted'|'friends visibility'|'fof visibility'){
        const {memuuid} = getMemDetailsFromJwt(TestContext.accessToken)
        let postId, userId, caption, postMediaId
        if(type=='public'){
            ({postId, userId, caption, postMediaId} = await TestContext.services.feedRepo.getMyRandomPublicPost(memuuid))
        }
        else if(type=='hidden'){
            ({postId, userId, caption, postMediaId} = await TestContext.services.feedRepo.getMyRandomHiddenPost(memuuid))
        }
        else if(type=='deleted'){
            ({postId, userId, caption, postMediaId} = await TestContext.services.feedRepo.getMyRandomDeletedPost(memuuid))
        }
        else if (type=='friends visibility'){
            ({postId, userId, caption, postMediaId} = await TestContext.services.feedRepo.getMyRandomPostWithFriendsVisibility(memuuid))
        }
        else if (type =='fof visibility'){
            ({postId, userId, caption, postMediaId} = await TestContext.services.feedRepo.getMyFriendsOfFriendsRandomPublicPost(memuuid))
        }
        const payload = FeedFactory.buildPostReactionPayload({
            postId
        })
        const response = await this.service.feedService.reactToPost(payload)
        return {
            response
        }
    }
    async reactToMyFriendsPost(type:'public'|'hidden'|'deleted'|'friends visibility'|'fof visibility'){
        const {memuuid} = getMemDetailsFromJwt(TestContext.accessToken)
        let postId, userId, caption, postMediaId
        if(type=='public'){
            ({postId, userId, caption, postMediaId} = await TestContext.services.feedRepo.getMyFriendsRandomPublicPost(memuuid))
        }
        else if(type=='hidden'){
            ({postId, userId, caption, postMediaId} = await TestContext.services.feedRepo.getMyFriendsRandomHiddenPost(memuuid))
        }
        else if(type=='deleted'){
            ({postId, userId, caption, postMediaId} = await TestContext.services.feedRepo.getMyFriendsRandomDeletedPost(memuuid))
        }
        else if (type=='friends visibility'){
            ({postId, userId, caption, postMediaId} = await TestContext.services.feedRepo.getMyFriendsRandomPostWithFriendsVisibility(memuuid))
        }
        else if (type =='fof visibility'){
            ({postId, userId, caption, postMediaId} = await TestContext.services.feedRepo.getMyFriendsRandomPostWithFriendsOfFriendsVisibility(memuuid))
        }
        const payload = FeedFactory.buildPostReactionPayload({
            postId
        })
        const response = await this.service.feedService.reactToPost(payload)
        return {
            response
        }
    }

    async reactToMyFriendsOfFriendsPost(type:'public'|'hidden'|'deleted'|'friends visibility'|'fof visibility'){
        const {memuuid} = getMemDetailsFromJwt(TestContext.accessToken)
        let postId, userId, caption, postMediaId
        if(type=='public'){
            ({postId, userId, caption, postMediaId} = await TestContext.services.feedRepo.getMyFriendsOfFriendsRandomPublicPost(memuuid))
        }
        else if(type=='hidden'){
            ({postId, userId, caption, postMediaId} = await TestContext.services.feedRepo.getMyFriendsOfFriendsRandomHiddenPost(memuuid))
        }
        else if(type=='deleted'){
            ({postId, userId, caption, postMediaId} = await TestContext.services.feedRepo.getMyFriendsOfFriendsRandomDeletedPost(memuuid))
        }
        else if (type=='friends visibility'){
            ({postId, userId, caption, postMediaId} = await TestContext.services.feedRepo.getMyFriendsOfFriendsRandomPostWithFriendsVisibility(memuuid))
        }
        else if (type =='fof visibility'){
            ({postId, userId, caption, postMediaId} = await TestContext.services.feedRepo.getMyFriendsOfFriendsRandomPostWithFriendsOfFriendVisibility(memuuid))
        }
        const payload = FeedFactory.buildPostReactionPayload({
            postId
        })
        const response = await this.service.feedService.reactToPost(payload)
        return {
            response
        }
    }
    async reactToNonFriendsPost(type:'public'|'hidden'|'deleted'|'friends visibility'|'fof visibility'){
        const {memuuid} = getMemDetailsFromJwt(TestContext.accessToken)
        let postId, userId, caption, postMediaId
        if(type=='public'){
            ({postId, userId, caption, postMediaId} = await TestContext.services.feedRepo.getMyNonFriendsRandomPublicPost(memuuid))
        }
        else if(type=='hidden'){
            ({postId, userId, caption, postMediaId} = await TestContext.services.feedRepo.getMyNonFriendsRandomHiddenPost(memuuid))
        }
        else if(type=='deleted'){
            ({postId, userId, caption, postMediaId} = await TestContext.services.feedRepo.getMyNonFriendsRandomDeletedPost(memuuid))
        }
        else if (type=='friends visibility'){
            ({postId, userId, caption, postMediaId} = await TestContext.services.feedRepo.getMyNonFriendsRandomPostWithFriendsVisibility(memuuid))
        }
        else if (type =='fof visibility'){
            ({postId, userId, caption, postMediaId} = await TestContext.services.feedRepo.getMyNonFriendsRandomPostWithFriendsOfFriendVisibility(memuuid))
        }
        const payload = FeedFactory.buildPostReactionPayload({
            postId
        })
        const response = await this.service.feedService.reactToPost(payload)
        return {
            response
        }
    }

//////////////////////////////////////Add A Single Comment//////////////////////////////////////////////////
    async addCommentToMyFriendsPost(type:'public'|'hidden'|'deleted'|'friends visibility'|'fof visibility'){
        const {memuuid} = getMemDetailsFromJwt(TestContext.accessToken)
        let postId, userId, caption, postMediaId
        if(type=='public'){
            ({postId, userId, caption, postMediaId} = await TestContext.services.feedRepo.getMyFriendsRandomPublicPost(memuuid))
        }
        else if(type=='hidden'){
            ({postId, userId, caption, postMediaId} = await TestContext.services.feedRepo.getMyFriendsRandomHiddenPost(memuuid))
        }
        else if(type=='deleted'){
            ({postId, userId, caption, postMediaId} = await TestContext.services.feedRepo.getMyFriendsRandomDeletedPost(memuuid))
        }
        else if (type=='friends visibility'){
            ({postId, userId, caption, postMediaId} = await TestContext.services.feedRepo.getMyFriendsRandomPostWithFriendsVisibility(memuuid))
        }
        else if (type =='fof visibility'){
            ({postId, userId, caption, postMediaId} = await TestContext.services.feedRepo.getMyFriendsRandomPostWithFriendsOfFriendsVisibility(memuuid))
        }
        const payload = FeedFactory.buildPostCommentPayload({
            postId
        })
        const response = await this.service.feedService.placeCommentToAPost(payload)
        return {
            response
        }
    }
    async addCommentToMyFriendsOfFriendsPost(type:'public'|'hidden'|'deleted'|'friends visibility'|'fof visibility'){
        const {memuuid} = getMemDetailsFromJwt(TestContext.accessToken)
        let postId, userId, caption, postMediaId
        if(type=='public'){
            ({postId, userId, caption, postMediaId} = await TestContext.services.feedRepo.getMyFriendsOfFriendsRandomPublicPost(memuuid))
        }
        else if(type=='hidden'){
            ({postId, userId, caption, postMediaId} = await TestContext.services.feedRepo.getMyFriendsOfFriendsRandomHiddenPost(memuuid))
        }
        else if(type=='deleted'){
            ({postId, userId, caption, postMediaId} = await TestContext.services.feedRepo.getMyFriendsOfFriendsRandomDeletedPost(memuuid))
        }
        else if (type=='friends visibility'){
            ({postId, userId, caption, postMediaId} = await TestContext.services.feedRepo.getMyFriendsOfFriendsRandomPostWithFriendsVisibility(memuuid))
        }
        else if (type =='fof visibility'){
            ({postId, userId, caption, postMediaId} = await TestContext.services.feedRepo.getMyFriendsOfFriendsRandomPostWithFriendsOfFriendVisibility(memuuid))
        }
        const payload = FeedFactory.buildPostCommentPayload({
            postId
        })
        const response = await this.service.feedService.placeCommentToAPost(payload)
        return {
            response
        }
    }
    async addCommentToOtherNonFriendsPost(type:'public'|'hidden'|'deleted'|'friends visibility'|'fof visibility'){
        const {memuuid} = getMemDetailsFromJwt(TestContext.accessToken)
        let postId, userId, caption, postMediaId
        if(type=='public'){
            ({postId, userId, caption, postMediaId} = await TestContext.services.feedRepo.getMyNonFriendsRandomPublicPost(memuuid))
        }
        else if(type=='hidden'){
            ({postId, userId, caption, postMediaId} = await TestContext.services.feedRepo.getMyNonFriendsRandomHiddenPost(memuuid))
        }
        else if(type=='deleted'){
            ({postId, userId, caption, postMediaId} = await TestContext.services.feedRepo.getMyNonFriendsRandomDeletedPost(memuuid))
        }
        else if (type=='friends visibility'){
            ({postId, userId, caption, postMediaId} = await TestContext.services.feedRepo.getMyNonFriendsRandomPostWithFriendsVisibility(memuuid))
        }
        else if (type =='fof visibility'){
            ({postId, userId, caption, postMediaId} = await TestContext.services.feedRepo.getMyNonFriendsRandomPostWithFriendsOfFriendVisibility(memuuid))
        }
        const payload = FeedFactory.buildPostCommentPayload({
            postId
        })
        const response = await this.service.feedService.placeCommentToAPost(payload)
        return {
            response
        }
    }
    async addCommentToMyPosts(type:'public'|'hidden'|'deleted'|'friends visibility'|'fof visibility'){
        const {memuuid} = getMemDetailsFromJwt(TestContext.accessToken)
        let postId, userId, caption, postMediaId
        if(type=='public'){
            ({postId, userId, caption, postMediaId} = await TestContext.services.feedRepo.getMyFriendsRandomPublicPost(memuuid))
        }
        else if(type=='hidden'){
            ({postId, userId, caption, postMediaId} = await TestContext.services.feedRepo.getMyFriendsRandomHiddenPost(memuuid))
        }
        else if(type=='deleted'){
            ({postId, userId, caption, postMediaId} = await TestContext.services.feedRepo.getMyFriendsRandomDeletedPost(memuuid))
        }
        else if (type=='friends visibility'){
            ({postId, userId, caption, postMediaId} = await TestContext.services.feedRepo.getMyFriendsRandomPostWithFriendsVisibility(memuuid))
        }
        else if (type =='fof visibility'){
            ({postId, userId, caption, postMediaId} = await TestContext.services.feedRepo.getMyFriendsRandomPostWithFriendsOfFriendsVisibility(memuuid))
        }
        const payload = FeedFactory.buildPostCommentPayload({
            postId
        })
        const response = await this.service.feedService.placeCommentToAPost(payload)
        return {
            response
        }
    }

///////////////////////////////////////////////REPLY TO MY COMMENT///////////////////////////////////
    async replyMyCommentOnMyFriendsPost(type:'public'|'hidden'|'deleted'|'friends visibility'|'fof visibility'='public'){
        const {memuuid} = getMemDetailsFromJwt(TestContext.accessToken)
        const data = await TestContext.services.feedRepo.getMyRandomCommentMadeOnFriendsPost(memuuid, type)

        const payload = FeedFactory.buildPostCommentPayload({
            parentCommentId: data?.commentId,
            postId: data?.postId
        })
        const response = await this.service.feedService.placeCommentToAPost(payload)
        return {
            response
        }
    }

    async replyMyCommentOnMyFriendsOfFriendsPublicPost(type:'public'|'hidden'|'deleted'|'friends visibility'|'fof visibility'='public'){
        const {memuuid} = getMemDetailsFromJwt(TestContext.accessToken)
        const data = await TestContext.services.feedRepo.getMyRandomCommentMadeOnFriendsOfFriendsPost(memuuid, type)

        const payload = FeedFactory.buildPostCommentPayload({
            parentCommentId: data?.commentId,
            postId: data?.postId
        })
        const response = await this.service.feedService.placeCommentToAPost(payload)
        return {
            response
        }
    }

    async replyMyCommentOfMyNonFriendsPublicPost(type:'public'|'hidden'|'deleted'|'friends visibility'|'fof visibility'='public'){
        const {memuuid} = getMemDetailsFromJwt(TestContext.accessToken)
        const data = await TestContext.services.feedRepo.getMyRandomCommentMadeOnNonFriendsPost(memuuid, type)

        const payload = FeedFactory.buildPostCommentPayload({
            parentCommentId: data?.commentId,
            postId: data?.postId
        })
        const response = await this.service.feedService.placeCommentToAPost(payload)
        return {
            response
        }
    }

    async replyMyCommentToMyPosts(type:'public'|'hidden'|'deleted'|'friends visibility'|'fof visibility'='public'){
        const {memuuid} = getMemDetailsFromJwt(TestContext.accessToken)
        const data = await TestContext.services.feedRepo.getMyRandomCommentMadeOnMyPost(memuuid, type)

        const payload = FeedFactory.buildPostCommentPayload({
            parentCommentId: data?.commentId,
            postId: data?.postId
        })
        const response = await this.service.feedService.placeCommentToAPost(payload)
        return {
            response
        }
    }


///////////////////////////////////////////////REPLY TO My Friends COMMENT///////////////////////////////////
    async replyOthersCommentOnMyFriendsPost(type:'public'|'hidden'|'deleted'|'friends visibility'|'fof visibility'='public'){
        const {memuuid} = getMemDetailsFromJwt(TestContext.accessToken)
        const data = await TestContext.services.feedRepo.getOthersRandomCommentMadeOnMyFriendsPost(memuuid, type)

        const payload = FeedFactory.buildPostCommentPayload({
            parentCommentId: data?.commentId,
            postId: data?.postId
        })
        const response = await this.service.feedService.placeCommentToAPost(payload)
        return {
            response
        }
    }

    async replyOthersCommentOnMyFriendsOfFriendsPost(type:'public'|'hidden'|'deleted'|'friends visibility'|'fof visibility'='public'){
        const {memuuid} = getMemDetailsFromJwt(TestContext.accessToken)
        const data = await TestContext.services.feedRepo.getOthersRandomCommentMadeOnMyFriendsOfFriendsPost(memuuid, type)

        const payload = FeedFactory.buildPostCommentPayload({
            parentCommentId: data?.commentId,
            postId: data?.postId
        })
        const response = await this.service.feedService.placeCommentToAPost(payload)
        return {
            response
        }
    }

    async replyOthersCommentOnMyNonFriendsPost(type:'public'|'hidden'|'deleted'|'friends visibility'|'fof visibility'='public'){
        const {memuuid} = getMemDetailsFromJwt(TestContext.accessToken)
        const data = await TestContext.services.feedRepo.getOthersRandomCommentMadeOnMyNonFriendsPost(memuuid, type)

        const payload = FeedFactory.buildPostCommentPayload({
            parentCommentId: data?.commentId,
            postId: data?.postId
        })
        const response = await this.service.feedService.placeCommentToAPost(payload)
        return {
            response
        }
    }

    async replyOthersCommentToMyPosts(type:'public'|'hidden'|'deleted'|'friends visibility'|'fof visibility'='public'){
        const {memuuid} = getMemDetailsFromJwt(TestContext.accessToken)
        const data = await TestContext.services.feedRepo.getOthersRandomCommentMadeOnMyPost(memuuid, type)

        const payload = FeedFactory.buildPostCommentPayload({
            parentCommentId: data?.commentId,
            postId: data?.postId
        })
        const response = await this.service.feedService.placeCommentToAPost(payload)
        return {
            response
        }
    }


    ///////////////////////////////////////////////// UPDATE My COMMENT ////////////////////////////////////    
    async updateMyCommentOnMyFriendsPost(type:'public'|'hidden'|'deleted'|'friends visibility'|'fof visibility'='public'){
        const {memuuid} = getMemDetailsFromJwt(TestContext.accessToken)
        const data = await TestContext.services.feedRepo.getMyRandomCommentMadeOnFriendsPost(memuuid, type)

        const payload = FeedFactory.buildPostCommentPayload({
            commentId: data?.commentId,
            postId: data?.postId
        })
        const response = await this.service.feedService.placeCommentToAPost(payload)
        return {
            response
        }
    }

    async updateMyCommentOnMyFriendsOfFriendsPost(type:'public'|'hidden'|'deleted'|'friends visibility'|'fof visibility'='public'){
        const {memuuid} = getMemDetailsFromJwt(TestContext.accessToken)
        const data = await TestContext.services.feedRepo.getMyRandomCommentMadeOnFriendsOfFriendsPost(memuuid, type)

        const payload = FeedFactory.buildPostCommentPayload({
            commentId: data?.commentId,
            postId: data?.postId
        })
        const response = await this.service.feedService.placeCommentToAPost(payload)
        return {
            response
        }
    }

    async updateMyCommentOnMyNonFriendsPost(type:'public'|'hidden'|'deleted'|'friends visibility'|'fof visibility'='public'){
        const {memuuid} = getMemDetailsFromJwt(TestContext.accessToken)
        const data = await TestContext.services.feedRepo.getMyRandomCommentMadeOnNonFriendsPost(memuuid, type)

        const payload = FeedFactory.buildPostCommentPayload({
            commentId: data?.commentId,
            postId: data?.postId
        })
        const response = await this.service.feedService.placeCommentToAPost(payload)
        return {
            response
        }
    }

    async updateMyCommentOnMyPosts(type:'public'|'hidden'|'deleted'|'friends visibility'|'fof visibility'='public'){
        const {memuuid} = getMemDetailsFromJwt(TestContext.accessToken)
        const data = await TestContext.services.feedRepo.getMyRandomCommentMadeOnMyPost(memuuid, type)

        const payload = FeedFactory.buildPostCommentPayload({
            commentId: data?.commentId,
            postId: data?.postId
        })
        const response = await this.service.feedService.placeCommentToAPost(payload)
        return {
            response
        }
    }



    ///////////////////////////////////////////////// UPDATE My Friends COMMENT ////////////////////////////////////    
    async updateOthersCommentOnMyFriendsPost(type:'public'|'hidden'|'deleted'|'friends visibility'|'fof visibility'='public'){
        const {memuuid} = getMemDetailsFromJwt(TestContext.accessToken)
        const data = await TestContext.services.feedRepo.getOthersRandomCommentMadeOnMyFriendsPost(memuuid, type)

        const payload = FeedFactory.buildPostCommentPayload({
            commentId: data?.commentId,
            postId: data?.postId
        })
        const response = await this.service.feedService.placeCommentToAPost(payload)
        return {
            response
        }
    }

    async updateOthersCommentOnMyFriendsOfFriendsPost(type:'public'|'hidden'|'deleted'|'friends visibility'|'fof visibility'='public'){
        const {memuuid} = getMemDetailsFromJwt(TestContext.accessToken)
        const data = await TestContext.services.feedRepo.getOthersRandomCommentMadeOnMyFriendsOfFriendsPost(memuuid, type)

        const payload = FeedFactory.buildPostCommentPayload({
            commentId: data?.commentId,
            postId: data?.postId
        })
        const response = await this.service.feedService.placeCommentToAPost(payload)
        return {
            response
        }
    }

    async updateOthersCommentOnMyNonFriendsPost(type:'public'|'hidden'|'deleted'|'friends visibility'|'fof visibility'='public'){
        const {memuuid} = getMemDetailsFromJwt(TestContext.accessToken)
        const data = await TestContext.services.feedRepo.getOthersRandomCommentMadeOnMyNonFriendsPost(memuuid, type)

        const payload = FeedFactory.buildPostCommentPayload({
            commentId: data?.commentId,
            postId: data?.postId
        })
        const response = await this.service.feedService.placeCommentToAPost(payload)
        return {
            response
        }
    }

    async updateOthersCommentOnMyPosts(type:'public'|'hidden'|'deleted'|'friends visibility'|'fof visibility'='public'){
        const {memuuid} = getMemDetailsFromJwt(TestContext.accessToken)
        const data = await TestContext.services.feedRepo.getOthersRandomCommentMadeOnMyPost(memuuid, type)

        const payload = FeedFactory.buildPostCommentPayload({
            commentId: data?.commentId,
            postId: data?.postId
        })
        const response = await this.service.feedService.placeCommentToAPost(payload)
        return {
            response
        }
    }




    ///////////////////////////////////////////////// React To My COMMENT ////////////////////////////////////    
    async reactToMyCommentOnMyFriendsPost(type:'public'|'hidden'|'deleted'|'friends visibility'|'fof visibility'='public'){
        const {memuuid} = getMemDetailsFromJwt(TestContext.accessToken)
        const data = await TestContext.services.feedRepo.getMyRandomCommentMadeOnMyPost(memuuid, type)

        const payload = FeedFactory.buildReactOnCommentPayload({
            commentId: data?.commentId,
            postId: data?.postId
        })
        const response = await this.service.feedService.reactToCommentOnAPost(payload)
        return {
            response
        }   
    }

    async reactToMyCommentOnMyFriendsOfFriendsPost(type:'public'|'hidden'|'deleted'|'friends visibility'|'fof visibility'='public'){
        const {memuuid} = getMemDetailsFromJwt(TestContext.accessToken)
        const data = await TestContext.services.feedRepo.getMyRandomCommentMadeOnFriendsOfFriendsPost(memuuid, type)

        const payload = FeedFactory.buildReactOnCommentPayload({
            commentId: data?.commentId,
            postId: data?.postId
        })
        const response = await this.service.feedService.reactToCommentOnAPost(payload)
        return {
            response
        }   
    }

    async reactToMyCommentOnMyNonFriendsPost(type:'public'|'hidden'|'deleted'|'friends visibility'|'fof visibility'='public'){
        const {memuuid} = getMemDetailsFromJwt(TestContext.accessToken)
        const data = await TestContext.services.feedRepo.getMyRandomCommentMadeOnNonFriendsPost(memuuid, type)

        const payload = FeedFactory.buildReactOnCommentPayload({
            commentId: data?.commentId,
            postId: data?.postId
        })
        const response = await this.service.feedService.reactToCommentOnAPost(payload)
        return {
            response
        }  
    }

    async reactToMyCommentOnMyPosts(type:'public'|'hidden'|'deleted'|'friends visibility'|'fof visibility'='public'){
        const {memuuid} = getMemDetailsFromJwt(TestContext.accessToken)
        const data = await TestContext.services.feedRepo.getMyRandomCommentMadeOnMyPost(memuuid, type)

        const payload = FeedFactory.buildReactOnCommentPayload({
            commentId: data?.commentId,
            postId: data?.postId
        })
        const response = await this.service.feedService.reactToCommentOnAPost(payload)
        return {
            response
        }
    }



    ///////////////////////////////////////////////// React To Others Comment ////////////////////////////////////    
    async reactToOthersCommentOnMyFriendsPost(type:'public'|'hidden'|'deleted'|'friends visibility'|'fof visibility'='public'){
        const {memuuid} = getMemDetailsFromJwt(TestContext.accessToken)
        const data = await TestContext.services.feedRepo.getOthersRandomCommentMadeOnMyFriendsPost(memuuid, type)

        const payload = FeedFactory.buildReactOnCommentPayload({
            commentId: data?.commentId,
            postId: data?.postId
        })
        const response = await this.service.feedService.reactToCommentOnAPost(payload)
        return {
            response
        }
    }

    async reactToOthersCommentOnMyFriendsOfFriendsPublicPost(type:'public'|'hidden'|'deleted'|'friends visibility'|'fof visibility'='public'){
        const {memuuid} = getMemDetailsFromJwt(TestContext.accessToken)
        const data = await TestContext.services.feedRepo.getOthersRandomCommentMadeOnMyFriendsOfFriendsPost(memuuid, type)

        const payload = FeedFactory.buildReactOnCommentPayload({
            commentId: data?.commentId,
            postId: data?.postId
        })
        const response = await this.service.feedService.reactToCommentOnAPost(payload)
        return {
            response
        }
    }


    async reactToOthersCommentOnMyNonFriendsPost(type:'public'|'hidden'|'deleted'|'friends visibility'|'fof visibility'='public'){
        const {memuuid} = getMemDetailsFromJwt(TestContext.accessToken)
        const data = await TestContext.services.feedRepo.getOthersRandomCommentMadeOnMyNonFriendsPost(memuuid, type)

        const payload = FeedFactory.buildReactOnCommentPayload({
            commentId: data?.commentId,
            postId: data?.postId
        })
        const response = await this.service.feedService.reactToCommentOnAPost(payload)
        return {
            response
        }

    }

    async reactToOthersCommentOnMyPublicPosts(type:'public'|'hidden'|'deleted'|'friends visibility'|'fof visibility'='public'){
        const {memuuid} = getMemDetailsFromJwt(TestContext.accessToken)
        const data = await TestContext.services.feedRepo.getOthersRandomCommentMadeOnMyPost(memuuid, type)

        const payload = FeedFactory.buildReactOnCommentPayload({
            commentId: data?.commentId,
            postId: data?.postId
        })
        const response = await this.service.feedService.reactToCommentOnAPost(payload)
        return {
            response
        }
    }

}