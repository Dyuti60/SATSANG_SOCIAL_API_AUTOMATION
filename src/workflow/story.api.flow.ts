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
        TestContext.activeUser='current'
        const {response, accessToken, stateToken} = await this.loginFlow.loginFlow(contactNumber)
        
    }

    async storyMediaUpload(files:string[]){
        const {response, mediaIds} = await this.mediaFlow.verifyUploadStatus('story',files)
        return {
            mediaIds
        }
    }

async createBulkStoryWithNewMedia(files: string[]) {

    // Upload all files first
    const { mediaIds } = await this.storyMediaUpload(files);

    // Build bulk payload
    const payload = StoryFactory.buildBulkStoryPayload({
        mediaIds
    });

    // Call bulk create API
    const response = await this.service.storyService.bulkCreateStories(payload);

    return {
        response,
        payload
    };
}
//////////////////////////////////////// MY MEDIA /////////////////////////////////////

    async createStoryWithMyNewStoryMedia(files: string[]){
        const {mediaIds} = await this.storyMediaUpload(files)
        const payload = StoryFactory.buildStoryPayload({
            mediaId: mediaIds[0]
        })
        const response = await this.service.storyService.createStory(payload)
        return response
    }

    async createStoryWithMyNewPostMedia(files: string[]){
        const {mediaIds} = await this.mediaFlow.verifyUploadStatus('post',files)
        const payload = StoryFactory.buildStoryPayload({
            mediaId: mediaIds[0]
        })
        const response = await this.service.storyService.createStory(payload)
        return response
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
        return response
    }

    async createStoryWithMyPresentStoryMedia(){
        // const data = getMemDetailsFromJwt(TestContext.accessToken)
        const memuuid = TestContext.initialMemuuid
        const {storyMediaId, storyId} = await TestContext.services.storyRepo.getMyPresentStoryMediaId(memuuid)
        const payload = StoryFactory.buildStoryPayload({
            mediaId: storyMediaId
        })
        const response = await this.service.storyService.createStory(payload)
        return response
    }

    async createStoryWithMyExistingMinioLoadedOnlyStoryMedia(){
        // const data = getMemDetailsFromJwt(TestContext.accessToken)
        const memuuid = TestContext.initialMemuuid
        const {storyMediaId, storyUrl} = await TestContext.services.storyRepo.myMinioLoadedOnlyStoryMediaId(memuuid)
        const payload = StoryFactory.buildStoryPayload({
            mediaId: storyMediaId
        })
        const response = await this.service.storyService.createStory(payload)
        return response
    }

    async createStoryWithMyExpiredStoryMedia(){
        // const data = getMemDetailsFromJwt(TestContext.accessToken)
        const memuuid = TestContext.initialMemuuid
        const {storyMediaId, storyId} = await TestContext.services.storyRepo.getMyExpiredStoryMediaId(memuuid)
        const payload = StoryFactory.buildStoryPayload({
            mediaId: storyMediaId
        })
        const response = await this.service.storyService.createStory(payload)
        return response
    }

    async createStoryWithMyDeletedStoryMedia(){
        // const data = getMemDetailsFromJwt(TestContext.accessToken)
        const memuuid = TestContext.initialMemuuid
        const {storyMediaId, storyId} = await TestContext.services.storyRepo.getMyPresentDeletedStoryMediaId(memuuid)
        const payload = StoryFactory.buildStoryPayload({
            mediaId: storyMediaId
        })
        const response = await this.service.storyService.createStory(payload)
        return response
    }

    async createStoryWithMyExpiredDeletedStoryMedia(){
        // const data = getMemDetailsFromJwt(TestContext.accessToken)
        const memuuid = TestContext.initialMemuuid
        const {storyMediaId, storyId} = await TestContext.services.storyRepo.getMyExpiredDeletedStoryMediaId(memuuid)
        const payload = StoryFactory.buildStoryPayload({
            mediaId: storyMediaId
        })
        const response = await this.service.storyService.createStory(payload)
        return response
    }

///////////////////////////////// With My Friends Story Media ////////////////////////////

    async createStoryWithFriendsPresentStoryMedia(){
        // const data = getMemDetailsFromJwt(TestContext.accessToken)
        const memuuid = TestContext.initialMemuuid
        const {friendId, storyMediaId, storyId} = await TestContext.services.storyRepo.myFriendsPresentStoryMediaId(memuuid)
        const payload = StoryFactory.buildStoryPayload({
            mediaId: storyMediaId
        })
        const response = await this.service.storyService.createStory(payload)
        return response
    }

    async createStoryWithFriendsExistingMinioLoadedOnlyStoryMedia(){
        // const data = getMemDetailsFromJwt(TestContext.accessToken)
        const memuuid = TestContext.initialMemuuid
        const {friendId, storyMediaId} = await TestContext.services.storyRepo.myFriendsMinioLoadedOnlyStoryMediaId(memuuid)
        const payload = StoryFactory.buildStoryPayload({
            mediaId: storyMediaId
        })
        const response = await this.service.storyService.createStory(payload)
        return response
    }

    async createStoryWithFriendsExpiredStoryMedia(){
        // const data = getMemDetailsFromJwt(TestContext.accessToken)
        const memuuid = TestContext.initialMemuuid
        const {friendId, storyMediaId, storyId} = await TestContext.services.storyRepo.myFriendsExpiredStoryMediaId(memuuid)
        const payload = StoryFactory.buildStoryPayload({
            mediaId: storyMediaId
        })
        const response = await this.service.storyService.createStory(payload)
        return response
    }
///////////////////////////////// With My Friends Friend Story Media ////////////////////////////

    async createStoryWithFriendsFriendPresentStoryMedia(){
        // const data = getMemDetailsFromJwt(TestContext.accessToken)
        const memuuid = TestContext.initialMemuuid
        const {friendId, storyMediaId, storyId} = await TestContext.services.storyRepo.myFriendOfFriendPresentStoryMediaId(memuuid)
        const payload = StoryFactory.buildStoryPayload({
            mediaId: storyMediaId
        })
        const response = await this.service.storyService.createStory(payload)
        return response
    }

    async createStoryWithFriendsFriendExistingMinioLoadedOnlyStoryMedia(){
        // const data = getMemDetailsFromJwt(TestContext.accessToken)
        const memuuid = TestContext.initialMemuuid
        const {friendId, storyMediaId} = await TestContext.services.storyRepo.myFriendsOfFriendMinioLoadedOnlyStoryMediaId(memuuid)
        const payload = StoryFactory.buildStoryPayload({
            mediaId: storyMediaId
        })
        const response = await this.service.storyService.createStory(payload)
        return response
    }

    async createStoryWithFriendsFriendExpiredStoryMedia(){
        // const data = getMemDetailsFromJwt(TestContext.accessToken)
        const memuuid = TestContext.initialMemuuid
        const {friendId, storyMediaId, storyId} = await TestContext.services.storyRepo.myFriendsOfFriendExpiredStoryMediaId(memuuid)
        const payload = StoryFactory.buildStoryPayload({
            mediaId: storyMediaId
        })
        const response = await this.service.storyService.createStory(payload)
        return response
    }

///////////////////////////////// With My Non Friend Story Media ////////////////////////////

    async createStoryWithNonFriendsPresentStoryMedia(){
        // const data = getMemDetailsFromJwt(TestContext.accessToken)
        const memuuid = TestContext.initialMemuuid
        const {friendId, storyMediaId, storyId} = await TestContext.services.storyRepo.nonFriendsPresentStoryId(memuuid)
        const payload = StoryFactory.buildStoryPayload({
            mediaId: storyMediaId
        })
        const response = await this.service.storyService.createStory(payload)
        return response
    }

    async createStoryWithNonFriendsExistingMinioLoadedOnlyStoryMedia(){
        // const data = getMemDetailsFromJwt(TestContext.accessToken)
        const memuuid = TestContext.initialMemuuid
        const {friendId, storyMediaId} = await TestContext.services.storyRepo.nonFriendsMinioLoadedStoryMediaId(memuuid)
        const payload = StoryFactory.buildStoryPayload({
            mediaId: storyMediaId
        })
        const response = await this.service.storyService.createStory(payload)
        return response
    }

    async createStoryWithNonFriendsExpiredStoryMedia(){
        // const data = getMemDetailsFromJwt(TestContext.accessToken)
        const memuuid = TestContext.initialMemuuid
        const {friendId, storyMediaId, storyId} = await TestContext.services.storyRepo.nonFriendsExpiredStoryId(memuuid)
        const payload = StoryFactory.buildStoryPayload({
            mediaId: storyMediaId
        })
        const response = await this.service.storyService.createStory(payload)
        return response
    }


/////////////////////////////// REACT TO STORY ///////////////////////////////
    async reactToMyPresentStory(reactionType:'like'|'unlike'){
        let status;

        if(reactionType=='like'){
            status=true
        }else if(reactionType=='unlike'){
            status=false
        }
        // const data = getMemDetailsFromJwt(TestContext.accessToken)
        const memuuid = TestContext.initialMemuuid
        const {storyMediaId, storyId} = await TestContext.services.storyRepo.getMyPresentStoryMediaId(memuuid)
        const payload = StoryFactory.buildStoryReactionPayload({
            storyId: storyId,
            hasReacted: status
        })
        const response = await this.service.storyService.viewOrReactToStory(payload)
        return response
    }

    async reactToMyFriendsPresentStory(reactionType:'like'|'unlike'){
        let status;

        if(reactionType=='like'){
            status=true
        }else if(reactionType=='unlike'){
            status=false
        }
        // const data = getMemDetailsFromJwt(TestContext.accessToken)
        const memuuid = TestContext.initialMemuuid
        const {storyMediaId, storyId} = await TestContext.services.storyRepo.myFriendsPresentStoryMediaId(memuuid)
        const payload = StoryFactory.buildStoryReactionPayload({
            storyId: storyId,
            hasReacted: status
        })
        const response = await this.service.storyService.viewOrReactToStory(payload)
        return {
            response
        }
    }

    async reactToMyFriendsOfFriendsPresentStory(reactionType:'like'|'unlike'){
        let status;

        if(reactionType=='like'){
            status=true
        }else if(reactionType=='unlike'){
            status=false
        }
        // const data = getMemDetailsFromJwt(TestContext.accessToken)
        const memuuid = TestContext.initialMemuuid
        const {storyMediaId, storyId} = await TestContext.services.storyRepo.myFriendOfFriendPresentStoryMediaId(memuuid)
        const payload = StoryFactory.buildStoryReactionPayload({
            storyId: storyId,
            hasReacted: status
        })
        const response = await this.service.storyService.viewOrReactToStory(payload)
        return {
            response
        }
    }

    async reactToNonFriendsPresentStory(reactionType:'like'|'unlike'){
        let status;

        if(reactionType=='like'){
            status=true
        }else if(reactionType=='unlike'){
            status=false
        }
        // const data = getMemDetailsFromJwt(TestContext.accessToken)
        const memuuid = TestContext.initialMemuuid
        const {storyMediaId, storyId} = await TestContext.services.storyRepo.nonFriendsPresentStoryId(memuuid)
        const payload = StoryFactory.buildStoryReactionPayload({
            storyId: storyId,
            hasReacted: status
        })
        const response = await this.service.storyService.viewOrReactToStory(payload)
        return {
            response
        }

    }
    async reactToMyExpiredStory(reactionType:'like'|'unlike'){
        let status;

        if(reactionType=='like'){
            status=true
        }else if(reactionType=='unlike'){
            status=false
        }
        // const data = getMemDetailsFromJwt(TestContext.accessToken)
        const memuuid = TestContext.initialMemuuid
        const {storyMediaId, storyId} = await TestContext.services.storyRepo.myFriendsExpiredStoryMediaId(memuuid)
        const payload = StoryFactory.buildStoryReactionPayload({
            storyId: storyId,
            hasReacted: status
        })
        const response = await this.service.storyService.viewOrReactToStory(payload)
        return {
            response
        }
    }

    async reactToMyFriendsExpiredStory(reactionType:'like'|'unlike'){
        let status;

        if(reactionType=='like'){
            status=true
        }else if(reactionType=='unlike'){
            status=false
        }
        // const data = getMemDetailsFromJwt(TestContext.accessToken)
        const memuuid = TestContext.initialMemuuid
        const {storyMediaId, storyId} = await TestContext.services.storyRepo.myFriendsExpiredStoryMediaId(memuuid)
        const payload = StoryFactory.buildStoryReactionPayload({
            storyId: storyId,
            hasReacted: status
        })
        const response = await this.service.storyService.viewOrReactToStory(payload)
        return {
            response
        }

    }

    async reactToMyFriendsOfFriendsExpiredStory(reactionType:'like'|'unlike'){
        let status;

        if(reactionType=='like'){
            status=true
        }else if(reactionType=='unlike'){
            status=false
        }
        // const data = getMemDetailsFromJwt(TestContext.accessToken)
        const memuuid = TestContext.initialMemuuid
        const {storyMediaId, storyId} = await TestContext.services.storyRepo.myFriendsOfFriendExpiredStoryMediaId(memuuid)
        const payload = StoryFactory.buildStoryReactionPayload({
            storyId: storyId,
            hasReacted: status
        })
        const response = await this.service.storyService.viewOrReactToStory(payload)
        return {
            response
        }
    }

    async reactToNonFriendsExpiredStory(reactionType:'like'|'unlike'){
        let status;

        if(reactionType=='like'){
            status=true
        }else if(reactionType=='unlike'){
            status=false
        }
        // const data = getMemDetailsFromJwt(TestContext.accessToken)
        const memuuid = TestContext.initialMemuuid
        const {storyMediaId, storyId} = await TestContext.services.storyRepo.nonFriendsExpiredStoryId(memuuid)
        const payload = StoryFactory.buildStoryReactionPayload({
            storyId: storyId,
            hasReacted: status
        })
        const response = await this.service.storyService.viewOrReactToStory(payload)
        return {
            response
        }
    }

    async reactToMyDeletedStory(reactionType:'like'|'unlike'){
        let status;

        if(reactionType=='like'){
            status=true
        }else if(reactionType=='unlike'){
            status=false
        }
        // const data = getMemDetailsFromJwt(TestContext.accessToken)
        const memuuid = TestContext.initialMemuuid
        const {storyMediaId, storyId} = await TestContext.services.storyRepo.getMyPresentDeletedStoryMediaId(memuuid)
        const payload = StoryFactory.buildStoryReactionPayload({
            storyId: storyId,
            hasReacted: status
        })
        const response = await this.service.storyService.viewOrReactToStory(payload)
        return {
            response
        }
    }
    
    async reactToMyFriendsPresentDeletedStory(reactionType:'like'|'unlike'){
        let status;

        if(reactionType=='like'){
            status=true
        }else if(reactionType=='unlike'){
            status=false
        }
        // const data = getMemDetailsFromJwt(TestContext.accessToken)
        const memuuid = TestContext.initialMemuuid
        const {storyMediaId, storyId} = await TestContext.services.storyRepo.myFriendsPresentDeletedStoryMediaId(memuuid)
        const payload = StoryFactory.buildStoryReactionPayload({
            storyId: storyId,
            hasReacted: status
        })
        const response = await this.service.storyService.viewOrReactToStory(payload)
        return {
            response
        }
    }

    async reactToNonFriendsPresentDeletedStory(reactionType:'like'|'unlike'){
        let status;

        if(reactionType=='like'){
            status=true
        }else if(reactionType=='unlike'){
            status=false
        }
        // const data = getMemDetailsFromJwt(TestContext.accessToken)
        const memuuid = TestContext.initialMemuuid
        const {storyMediaId, storyId} = await TestContext.services.storyRepo.nonFriendsPresentDeletedStoryId(memuuid)
        const payload = StoryFactory.buildStoryReactionPayload({
            storyId: storyId,
            hasReacted: status
        })
        const response = await this.service.storyService.viewOrReactToStory(payload)
        return {
            response
        }
    }

/////////////////////////////// Delete STORY ///////////////////////////////
    async deleteMyPresentStory(){
        // const data = getMemDetailsFromJwt(TestContext.accessToken)
        const memuuid = TestContext.initialMemuuid
        const {storyMediaId, storyId} = await TestContext.services.storyRepo.getMyPresentStoryMediaId(memuuid)
        const payload = StoryFactory.buildDeletStoryPayload({
            storyId: storyId
        })
        const response = await this.service.storyService.deleteStory(payload)
        return response
    }
    async deleteMyFriendsPresentStory(){
        // const data = getMemDetailsFromJwt(TestContext.accessToken)
        const memuuid = TestContext.initialMemuuid
        const {storyMediaId, storyId} = await TestContext.services.storyRepo.myFriendsPresentStoryMediaId(memuuid)
        const payload = StoryFactory.buildDeletStoryPayload({
            storyId: storyId
        })
        const response = await this.service.storyService.deleteStory(payload)
        return response
    }
    async deleteMyFriendsFriendPresentStory(){
        // const data = getMemDetailsFromJwt(TestContext.accessToken)
        const memuuid = TestContext.initialMemuuid
        const {storyMediaId, storyId} = await TestContext.services.storyRepo.myFriendOfFriendPresentStoryMediaId(memuuid)
        const payload = StoryFactory.buildDeletStoryPayload({
            storyId: storyId
        })
        const response = await this.service.storyService.deleteStory(payload)
        return response
    }
    async deleteMyDeletedStory(){
        // const data = getMemDetailsFromJwt(TestContext.accessToken)
        const memuuid = TestContext.initialMemuuid
        const {storyMediaId, storyId} = await TestContext.services.storyRepo.getMyPresentDeletedStoryMediaId(memuuid)
        const payload = StoryFactory.buildDeletStoryPayload({
            storyId: storyId
        })
        const response = await this.service.storyService.deleteStory(payload)
        return response
    }
    async deleteMyExpiredStory(){
        // const data = getMemDetailsFromJwt(TestContext.accessToken)
        const memuuid = TestContext.initialMemuuid
        const {storyMediaId, storyId} = await TestContext.services.storyRepo.getMyExpiredStoryMediaId(memuuid)
        const payload = StoryFactory.buildDeletStoryPayload({
            storyId: storyId
        })
        const response = await this.service.storyService.deleteStory(payload)
        return response
    }
/////////////////////////////// GET STORY Reaction///////////////////////////////
    async fetchMyPresentStoryReactions(){
        // const data = getMemDetailsFromJwt(TestContext.accessToken)
        const memuuid = TestContext.initialMemuuid
        const {storyMediaId, storyId} = await TestContext.services.storyRepo.getMyPresentStoryMediaId(memuuid)
        const payload = StoryFactory.buildFetchStoryReactionPayload({
            storyId: storyId
        })
        const response = await this.service.storyService.getAllReactionsOrViewsForStory(payload)
        return response
    }
    async fetchMyFriendsPresentStoryReactions(){
        // const data = getMemDetailsFromJwt(TestContext.accessToken)
        const memuuid = TestContext.initialMemuuid
        const {storyMediaId, storyId} = await TestContext.services.storyRepo.myFriendsPresentStoryMediaId(memuuid)
        const payload = StoryFactory.buildFetchStoryReactionPayload({
            storyId: storyId
        })
        const response = await this.service.storyService.getAllReactionsOrViewsForStory(payload)
        return response
    }
    async fetchMyFriendsFriendPresentStoryReactions(){
        // const data = getMemDetailsFromJwt(TestContext.accessToken)
        const memuuid = TestContext.initialMemuuid
        const {storyMediaId, storyId} = await TestContext.services.storyRepo.myFriendOfFriendPresentStoryMediaId(memuuid)
        const payload = StoryFactory.buildFetchStoryReactionPayload({
            storyId: storyId
        })
        const response = await this.service.storyService.getAllReactionsOrViewsForStory(payload)
        return response
    }
    async fetchNonFriendsPresentStoryReactions(){
        // const data = getMemDetailsFromJwt(TestContext.accessToken)
        const memuuid = TestContext.initialMemuuid
        const {storyMediaId, storyId} = await TestContext.services.storyRepo.nonFriendsPresentDeletedStoryId(memuuid)
        const payload = StoryFactory.buildFetchStoryReactionPayload({
            storyId: storyId
        })
        const response = await this.service.storyService.getAllReactionsOrViewsForStory(payload)
        return response
    }
    async fetchMyDeletedStoryReactions(){
        // const data = getMemDetailsFromJwt(TestContext.accessToken)
        const memuuid = TestContext.initialMemuuid
        const {storyMediaId, storyId} = await TestContext.services.storyRepo.getMyPresentDeletedStoryMediaId(memuuid)
        const payload = StoryFactory.buildFetchStoryReactionPayload({
            storyId: storyId
        })
        const response = await this.service.storyService.getAllReactionsOrViewsForStory(payload)
        return response
    }
    async fetchMyExpiredStoryReactions(){
        // const data = getMemDetailsFromJwt(TestContext.accessToken)
        const memuuid = TestContext.initialMemuuid
        const {storyMediaId, storyId} = await TestContext.services.storyRepo.getMyExpiredStoryMediaId(memuuid)
        const payload = StoryFactory.buildFetchStoryReactionPayload({
            storyId: storyId
        })
        const response = await this.service.storyService.getAllReactionsOrViewsForStory(payload)
        return response
    }

}
