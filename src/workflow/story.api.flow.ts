import { ServiceContainer } from "../services/service.container";
import { LoginFlow } from './login.api.flow';
import { TestContext } from "../../src/context/test.context";
import { MediaFlow } from "./media.api.flow";
import { StoryFactory } from "../testdata/factory/story.factory";
import { getMemDetailsFromJwt } from "../helper/auth/jwt.decode";

export class StoryFlow{
    constructor(
        private service: ServiceContainer,
        private loginFlow: LoginFlow,
        private mediaFlow: MediaFlow
    ){}

    async loginUserFlow(contactNumber:string){
        const {response, accessToken, stateToken} = await this.loginFlow.loginFlow(contactNumber)
        TestContext.accessToken = accessToken
    }

    async storyMediaUpload(files:string[]){
        const {response, mediaIds} = await this.mediaFlow.verifyUploadStatus('story',files)
        return {
            mediaIds
        }
    }


//////////////////////////////////////// MY MEDIA /////////////////////////////////////

    async createStoryWithMyNewStoryMedia(files: string[]){
        const {mediaIds} = await this.storyMediaUpload(files)
        const payload = StoryFactory.buildStoryPayload({
            mediaId: mediaIds[0]
        })
        const response = await this.service.storyService.createStory(payload)
        return {
            response
        }
    }

    async createStoryWithMyNewPostMedia(files: string[]){
        const {mediaIds} = await this.mediaFlow.verifyUploadStatus('post',files)
        const payload = StoryFactory.buildStoryPayload({
            mediaId: mediaIds[0]
        })
        const response = await this.service.storyService.createStory(payload)
        return {
            response
        }
    }

    async createStoryWithMyNewChatMedia(files: string[]){
        const {mediaIds} = await this.mediaFlow.verifyUploadStatus('chat',files)
        const payload = StoryFactory.buildStoryPayload({
            mediaId: mediaIds[0]
        })
        const response = await this.service.storyService.createStory(payload)
        return {
            response
        }
    }

    async createStoryWithMyNewProfileMedia(files: string[]){
        const {mediaIds} = await this.mediaFlow.verifyUploadStatus('profile',files)
        const payload = StoryFactory.buildStoryPayload({
            mediaId: mediaIds[0]
        })
        const response = await this.service.storyService.createStory(payload)
        return {
            response
        }
    }

    async createStoryWithMyPresentStoryMedia(){
        const data = getMemDetailsFromJwt(TestContext.accessToken)
        const {storyMediaId, storyId} = await TestContext.services.storyRepo.getMyPresentStoryMediaId(data.memuuid)
        const payload = StoryFactory.buildStoryPayload({
            mediaId: storyMediaId
        })
        const response = await this.service.storyService.createStory(payload)
        return {
            response
        }
    }

    async createStoryWithMyExistingMinioLoadedOnlyStoryMedia(){
        const data = getMemDetailsFromJwt(TestContext.accessToken)
        const {storyMediaId, storyUrl} = await TestContext.services.storyRepo.myMinioLoadedOnlyStoryMediaId(data.memuuid)
        const payload = StoryFactory.buildStoryPayload({
            mediaId: storyMediaId
        })
        const response = await this.service.storyService.createStory(payload)
        return {
            response
        }
    }

    async createStoryWithMyExpiredStoryMedia(){
        const data = getMemDetailsFromJwt(TestContext.accessToken)
        const {storyMediaId, storyId} = await TestContext.services.storyRepo.getMyExpiredStoryMediaId(data.memuuid)
        const payload = StoryFactory.buildStoryPayload({
            mediaId: storyMediaId
        })
        const response = await this.service.storyService.createStory(payload)
        return {
            response
        }
    }

    async createStoryWithMyDeletedStoryMedia(){
        const data = getMemDetailsFromJwt(TestContext.accessToken)
        const {storyMediaId, storyId} = await TestContext.services.storyRepo.getMyPresentDeletedStoryMediaId(data.memuuid)
        const payload = StoryFactory.buildStoryPayload({
            mediaId: storyMediaId
        })
        const response = await this.service.storyService.createStory(payload)
        return {
            response
        }
    }

    async createStoryWithMyExpiredDeletedStoryMedia(){
        const data = getMemDetailsFromJwt(TestContext.accessToken)
        const {storyMediaId, storyId} = await TestContext.services.storyRepo.getMyExpiredDeletedStoryMediaId(data.memuuid)
        const payload = StoryFactory.buildStoryPayload({
            mediaId: storyMediaId
        })
        const response = await this.service.storyService.createStory(payload)
        return {
            response
        }
    }

///////////////////////////////// With My Friends Story Media ////////////////////////////

    async createStoryWithFriendsPresentStoryMedia(){
        const data = getMemDetailsFromJwt(TestContext.accessToken)
        const {friendId, storyMediaId, storyId} = await TestContext.services.storyRepo.myFriendsPresentStoryMediaId(data.memuuid)
        const payload = StoryFactory.buildStoryPayload({
            mediaId: storyMediaId
        })
        const response = await this.service.storyService.createStory(payload)
        return {
            response
        }
    }

    async createStoryWithFriendsExistingMinioLoadedOnlyStoryMedia(){
        const data = getMemDetailsFromJwt(TestContext.accessToken)
        const {friendId, storyMediaId} = await TestContext.services.storyRepo.myFriendsMinioLoadedOnlyStoryMediaId(data.memuuid)
        const payload = StoryFactory.buildStoryPayload({
            mediaId: storyMediaId
        })
        const response = await this.service.storyService.createStory(payload)
        return {
            response
        }
    }

    async createStoryWithFriendsExpiredStoryMedia(){
        const data = getMemDetailsFromJwt(TestContext.accessToken)
        const {friendId, storyMediaId, storyId} = await TestContext.services.storyRepo.myFriendsExpiredStoryMediaId(data.memuuid)
        const payload = StoryFactory.buildStoryPayload({
            mediaId: storyMediaId
        })
        const response = await this.service.storyService.createStory(payload)
        return {
            response
        }
    }
///////////////////////////////// With My Friends Friend Story Media ////////////////////////////

    async createStoryWithFriendsFriendNewStoryMedia(){
        const data = getMemDetailsFromJwt(TestContext.accessToken)
        const {friendId, storyMediaId, storyId} = await TestContext.services.storyRepo.myFriendOfFriendPresentStoryMediaId(data.memuuid)
        const payload = StoryFactory.buildStoryPayload({
            mediaId: storyMediaId
        })
        const response = await this.service.storyService.createStory(payload)
        return {
            response
        }
    }

    async createStoryWithFriendsFriendExistingMinioLoadedOnlyStoryMedia(){
        const data = getMemDetailsFromJwt(TestContext.accessToken)
        const {friendId, storyMediaId} = await TestContext.services.storyRepo.myFriendsOfFriendMinioLoadedOnlyStoryMediaId(data.memuuid)
        const payload = StoryFactory.buildStoryPayload({
            mediaId: storyMediaId
        })
        const response = await this.service.storyService.createStory(payload)
        return {
            response
        }
    }

    async createStoryWithFriendsFriendExpiredStoryMedia(){
        const data = getMemDetailsFromJwt(TestContext.accessToken)
        const {friendId, storyMediaId, storyId} = await TestContext.services.storyRepo.myFriendsOfFriendExpiredStoryMediaId(data.memuuid)
        const payload = StoryFactory.buildStoryPayload({
            mediaId: storyMediaId
        })
        const response = await this.service.storyService.createStory(payload)
        return {
            response
        }
    }

///////////////////////////////// With My Non Friend Story Media ////////////////////////////

    async createStoryWithNonFriendsNewStoryMedia(){
        const data = getMemDetailsFromJwt(TestContext.accessToken)
        const {friendId, storyMediaId, storyId} = await TestContext.services.storyRepo.nonFriendsPresentStoryId(data.memuuid)
        const payload = StoryFactory.buildStoryPayload({
            mediaId: storyMediaId
        })
        const response = await this.service.storyService.createStory(payload)
        return {
            response
        }
    }

    async createStoryWithNonFriendsExistingMinioLoadedOnlyStoryMedia(){
        const data = getMemDetailsFromJwt(TestContext.accessToken)
        const {friendId, storyMediaId} = await TestContext.services.storyRepo.nonFriendsMinioLoadedStoryMediaId(data.memuuid)
        const payload = StoryFactory.buildStoryPayload({
            mediaId: storyMediaId
        })
        const response = await this.service.storyService.createStory(payload)
        return {
            response
        }
    }

    async createStoryWithNonFriendsAlreadyPostedStoryMedia(){
        const data = getMemDetailsFromJwt(TestContext.accessToken)
        const {friendId, storyMediaId, storyId} = await TestContext.services.storyRepo.nonFriendsExpiredStoryId(data.memuuid)
        const payload = StoryFactory.buildStoryPayload({
            mediaId: storyMediaId
        })
        const response = await this.service.storyService.createStory(payload)
        return {
            response
        }
    }


/////////////////////////////// REACT TO STORY ///////////////////////////////
    async reactToMyPresentStory(reactionType:'view'|'like'|'unlike'){
        let status;
        if(reactionType=='view'){
            status=1
        }else if(reactionType=='like'){
            status=2
        }else if(reactionType=='unlike'){
            status=3
        }
        const data = getMemDetailsFromJwt(TestContext.accessToken)
        const {storyMediaId, storyId} = await TestContext.services.storyRepo.getMyPresentStoryMediaId(data.memuuid)
        const payload = StoryFactory.buildStoryReactionPayload({
            storyId: storyId,
            statusId: status
        })
        const response = await this.service.storyService.viewOrReactToStory(payload)
        return {
            response
        }
    }

    async reactToMyFriendsPresentStory(reactionType:'view'|'like'|'unlike'){
        let status;
        if(reactionType=='view'){
            status=1
        }else if(reactionType=='like'){
            status=2
        }else if(reactionType=='unlike'){
            status=3
        }
        const data = getMemDetailsFromJwt(TestContext.accessToken)
        const {storyMediaId, storyId} = await TestContext.services.storyRepo.myFriendsPresentStoryMediaId(data.memuuid)
        const payload = StoryFactory.buildStoryReactionPayload({
            storyId: storyId,
            statusId: status
        })
        const response = await this.service.storyService.viewOrReactToStory(payload)
        return {
            response
        }
    }

    async reactToMyFriendsOfFriendsPresentStory(reactionType:'view'|'like'|'unlike'){
        let status;
        if(reactionType=='view'){
            status=1
        }else if(reactionType=='like'){
            status=2
        }else if(reactionType=='unlike'){
            status=3
        }
        const data = getMemDetailsFromJwt(TestContext.accessToken)
        const {storyMediaId, storyId} = await TestContext.services.storyRepo.myFriendOfFriendPresentStoryMediaId(data.memuuid)
        const payload = StoryFactory.buildStoryReactionPayload({
            storyId: storyId,
            statusId: status
        })
        const response = await this.service.storyService.viewOrReactToStory(payload)
        return {
            response
        }
    }

    async reactToNonFriendsPresentStory(reactionType:'view'|'like'|'unlike'){
        let status;
        if(reactionType=='view'){
            status=1
        }else if(reactionType=='like'){
            status=2
        }else if(reactionType=='unlike'){
            status=3
        }
        const data = getMemDetailsFromJwt(TestContext.accessToken)
        const {storyMediaId, storyId} = await TestContext.services.storyRepo.nonFriendsPresentStoryId(data.memuuid)
        const payload = StoryFactory.buildStoryReactionPayload({
            storyId: storyId,
            statusId: status
        })
        const response = await this.service.storyService.viewOrReactToStory(payload)
        return {
            response
        }

    }
    async reactToMyExpiredStory(reactionType:'view'|'like'|'unlike'){
        let status;
        if(reactionType=='view'){
            status=1
        }else if(reactionType=='like'){
            status=2
        }else if(reactionType=='unlike'){
            status=3
        }
        const data = getMemDetailsFromJwt(TestContext.accessToken)
        const {storyMediaId, storyId} = await TestContext.services.storyRepo.myFriendsExpiredStoryMediaId(data.memuuid)
        const payload = StoryFactory.buildStoryReactionPayload({
            storyId: storyId,
            statusId: status
        })
        const response = await this.service.storyService.viewOrReactToStory(payload)
        return {
            response
        }
    }

    async reactToMyFriendsExpiredStory(reactionType:'view'|'like'|'unlike'){
        let status;
        if(reactionType=='view'){
            status=1
        }else if(reactionType=='like'){
            status=2
        }else if(reactionType=='unlike'){
            status=3
        }
        const data = getMemDetailsFromJwt(TestContext.accessToken)
        const {storyMediaId, storyId} = await TestContext.services.storyRepo.myFriendsExpiredStoryMediaId(data.memuuid)
        const payload = StoryFactory.buildStoryReactionPayload({
            storyId: storyId,
            statusId: status
        })
        const response = await this.service.storyService.viewOrReactToStory(payload)
        return {
            response
        }

    }

    async reactToMyFriendsOfFriendsExpiredStory(reactionType:'view'|'like'|'unlike'){
        let status;
        if(reactionType=='view'){
            status=1
        }else if(reactionType=='like'){
            status=2
        }else if(reactionType=='unlike'){
            status=3
        }
        const data = getMemDetailsFromJwt(TestContext.accessToken)
        const {storyMediaId, storyId} = await TestContext.services.storyRepo.myFriendsOfFriendExpiredStoryMediaId(data.memuuid)
        const payload = StoryFactory.buildStoryReactionPayload({
            storyId: storyId,
            statusId: status
        })
        const response = await this.service.storyService.viewOrReactToStory(payload)
        return {
            response
        }
    }

    async reactToNonFriendsExpiredStory(reactionType:'view'|'like'|'unlike'){
        let status;
        if(reactionType=='view'){
            status=1
        }else if(reactionType=='like'){
            status=2
        }else if(reactionType=='unlike'){
            status=3
        }
        const data = getMemDetailsFromJwt(TestContext.accessToken)
        const {storyMediaId, storyId} = await TestContext.services.storyRepo.nonFriendsExpiredStoryId(data.memuuid)
        const payload = StoryFactory.buildStoryReactionPayload({
            storyId: storyId,
            statusId: status
        })
        const response = await this.service.storyService.viewOrReactToStory(payload)
        return {
            response
        }
    }

    async reactToMyDeletedStory(reactionType:'view'|'like'|'unlike'){
        let status;
        if(reactionType=='view'){
            status=1
        }else if(reactionType=='like'){
            status=2
        }else if(reactionType=='unlike'){
            status=3
        }
        const data = getMemDetailsFromJwt(TestContext.accessToken)
        const {storyMediaId, storyId} = await TestContext.services.storyRepo.getMyPresentDeletedStoryMediaId(data.memuuid)
        const payload = StoryFactory.buildStoryReactionPayload({
            storyId: storyId,
            statusId: status
        })
        const response = await this.service.storyService.viewOrReactToStory(payload)
        return {
            response
        }
    }
    
    async reactToMyFriendsPresentDeletedStory(reactionType:'view'|'like'|'unlike'){
        let status;
        if(reactionType=='view'){
            status=1
        }else if(reactionType=='like'){
            status=2
        }else if(reactionType=='unlike'){
            status=3
        }
        const data = getMemDetailsFromJwt(TestContext.accessToken)
        const {storyMediaId, storyId} = await TestContext.services.storyRepo.myFriendsPresentDeletedStoryMediaId(data.memuuid)
        const payload = StoryFactory.buildStoryReactionPayload({
            storyId: storyId,
            statusId: status
        })
        const response = await this.service.storyService.viewOrReactToStory(payload)
        return {
            response
        }
    }

    async reactToNonFriendsPresentDeletedStory(reactionType:'view'|'like'|'unlike'){
        let status;
        if(reactionType=='view'){
            status=1
        }else if(reactionType=='like'){
            status=2
        }else if(reactionType=='unlike'){
            status=3
        }
        const data = getMemDetailsFromJwt(TestContext.accessToken)
        const {storyMediaId, storyId} = await TestContext.services.storyRepo.nonFriendsPresentDeletedStoryId(data.memuuid)
        const payload = StoryFactory.buildStoryReactionPayload({
            storyId: storyId,
            statusId: status
        })
        const response = await this.service.storyService.viewOrReactToStory(payload)
        return {
            response
        }
    }

/////////////////////////////// Delete STORY ///////////////////////////////
    async deleteMyPresentStory(){
        const data = getMemDetailsFromJwt(TestContext.accessToken)
        const {storyMediaId, storyId} = await TestContext.services.storyRepo.getMyPresentStoryMediaId(data.memuuid)
        const payload = StoryFactory.buildDeletStoryPayload({
            storyId: storyId
        })
        const response = await this.service.storyService.deleteStory(payload)
        return {
            response
        }
    }
    async deleteMyFriendsPresentStory(){
        const data = getMemDetailsFromJwt(TestContext.accessToken)
        const {storyMediaId, storyId} = await TestContext.services.storyRepo.myFriendsPresentStoryMediaId(data.memuuid)
        const payload = StoryFactory.buildDeletStoryPayload({
            storyId: storyId
        })
        const response = await this.service.storyService.deleteStory(payload)
        return {
            response
        }
    }
    async deleteMyFriendsFriendPresentStory(){
        const data = getMemDetailsFromJwt(TestContext.accessToken)
        const {storyMediaId, storyId} = await TestContext.services.storyRepo.myFriendOfFriendPresentStoryMediaId(data.memuuid)
        const payload = StoryFactory.buildDeletStoryPayload({
            storyId: storyId
        })
        const response = await this.service.storyService.deleteStory(payload)
        return {
            response
        }
    }
    async deleteMyDeletedStory(){
        const data = getMemDetailsFromJwt(TestContext.accessToken)
        const {storyMediaId, storyId} = await TestContext.services.storyRepo.getMyPresentDeletedStoryMediaId(data.memuuid)
        const payload = StoryFactory.buildDeletStoryPayload({
            storyId: storyId
        })
        const response = await this.service.storyService.deleteStory(payload)
        return {
            response
        }
    }
    async deleteMyExpiredStory(){
        const data = getMemDetailsFromJwt(TestContext.accessToken)
        const {storyMediaId, storyId} = await TestContext.services.storyRepo.getMyExpiredStoryMediaId(data.memuuid)
        const payload = StoryFactory.buildDeletStoryPayload({
            storyId: storyId
        })
        const response = await this.service.storyService.deleteStory(payload)
        return {
            response
        }
    }
/////////////////////////////// GET STORY Reaction///////////////////////////////
    async fetchMyPresentStoryReactions(){
        const data = getMemDetailsFromJwt(TestContext.accessToken)
        const {storyMediaId, storyId} = await TestContext.services.storyRepo.getMyPresentStoryMediaId(data.memuuid)
        const payload = StoryFactory.buildFetchStoryReactionPayload({
            storyId: storyId
        })
        const response = await this.service.storyService.getAllReactionsOrViewsForStory(payload)
        return {
            response
        }
    }
    async fetchMyFriendsPresentStoryReactions(){
        const data = getMemDetailsFromJwt(TestContext.accessToken)
        const {storyMediaId, storyId} = await TestContext.services.storyRepo.myFriendsPresentStoryMediaId(data.memuuid)
        const payload = StoryFactory.buildFetchStoryReactionPayload({
            storyId: storyId
        })
        const response = await this.service.storyService.getAllReactionsOrViewsForStory(payload)
        return {
            response
        }
    }
    async fetchMyFriendsFriendPresentStoryReactions(){
        const data = getMemDetailsFromJwt(TestContext.accessToken)
        const {storyMediaId, storyId} = await TestContext.services.storyRepo.myFriendOfFriendPresentStoryMediaId(data.memuuid)
        const payload = StoryFactory.buildFetchStoryReactionPayload({
            storyId: storyId
        })
        const response = await this.service.storyService.getAllReactionsOrViewsForStory(payload)
        return {
            response
        }
    }
    async fetchMyDeletedStoryReactions(){
        const data = getMemDetailsFromJwt(TestContext.accessToken)
        const {storyMediaId, storyId} = await TestContext.services.storyRepo.getMyPresentDeletedStoryMediaId(data.memuuid)
        const payload = StoryFactory.buildFetchStoryReactionPayload({
            storyId: storyId
        })
        const response = await this.service.storyService.getAllReactionsOrViewsForStory(payload)
        return {
            response
        }
    }
    async fetchMyExpiredStoryReactions(){
        const data = getMemDetailsFromJwt(TestContext.accessToken)
        const {storyMediaId, storyId} = await TestContext.services.storyRepo.getMyExpiredStoryMediaId(data.memuuid)
        const payload = StoryFactory.buildFetchStoryReactionPayload({
            storyId: storyId
        })
        const response = await this.service.storyService.getAllReactionsOrViewsForStory(payload)
        return {
            response
        }
    }

}
