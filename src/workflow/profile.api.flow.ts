import { ServiceContainer } from "../../src/services/service.container";
import { LoginFlow } from './login.api.flow';
import { TestContext } from "../../src/context/test.context";
import { MediaFlow } from "./media.api.flow";
import { DataGenerator } from '../utils/data.generator';
import { ProfileFactory } from "../testdata/factory/profile.factory";
import { getMemDetailsFromJwt } from "../helper/auth/jwt.decode";

export class ProfileFlow{
    constructor(
        private service: ServiceContainer,
        private loginFlow: LoginFlow,
        private mediaFlow: MediaFlow
    ){}

    async loginUserFlow(contactNumber:string){
        TestContext.activeUser='current'
        const {response, accessToken, stateToken} = await this.loginFlow.loginFlow(contactNumber)
        
    }

    async profileNewMediaUpload(files:string[]){
        const {response, mediaIds} = await this.mediaFlow.verifyUploadStatus('profile',files)
        return {
            mediaId: response.response?.data?.data[0]?.mediaId
        }
    }

    // Throwing error in uploadProfile endpoint

    async uploadProfileWithMyPresentProfileMedia(){
        const {memuuid} = getMemDetailsFromJwt(TestContext.accessToken)
        const {username, profileMediaId, profileUrl} = await TestContext.services.profileRepo.getMyPresentProfileMediaId(memuuid)
        const uploadProfilePicPayload = {
            ...ProfileFactory.uploadProfileMedia,
            ...{mediaId: profileMediaId}
        }
        const response = await this.service.profileService.uploadProfilePicture(uploadProfilePicPayload)
        return {
            response
        }
    }

    async uploadProfileWithMyExistingProfileMedia(){
        const {memuuid} = getMemDetailsFromJwt(TestContext.accessToken)
        const {mediaId} = await TestContext.services.profileRepo.getMyExistingRandomProfileMediaId(memuuid)
        const uploadProfilePicPayload = {
            ...ProfileFactory.uploadProfileMedia,
            mediaId
        }
        const response = await this.service.profileService.uploadProfilePicture(uploadProfilePicPayload)
        return {
            response
        }
    }

    async uploadProfileWithMyFriendsPresentProfileMedia(){
        const {memuuid} = getMemDetailsFromJwt(TestContext.accessToken)
        const {mediaId, friendId} = await TestContext.services.profileRepo.getMyRandomFriendsPresentProfileMediaId(memuuid)
        const uploadProfilePicPayload = {
            ...ProfileFactory.uploadProfileMedia,
            mediaId
        }
        const response = await this.service.profileService.uploadProfilePicture(uploadProfilePicPayload)
        return {
            response
        }
    }

    async uploadProfileWithMyFriendsExistingProfileMedia(){
        const {memuuid} = getMemDetailsFromJwt(TestContext.accessToken)
        const {mediaId, friendId} = await TestContext.services.profileRepo.getMyRandomFriendsExistingProfileMediaId(memuuid)
        const uploadProfilePicPayload = {
            ...ProfileFactory.uploadProfileMedia,
            mediaId
        }
        const response = await this.service.profileService.uploadProfilePicture(uploadProfilePicPayload)
        return {
            response
        }
    }

    async uploadProfileWithMyFriendsOfFriendsPresentProfileMedia(){
        const {memuuid} = getMemDetailsFromJwt(TestContext.accessToken)
        const {mediaId, friendId} = await TestContext.services.profileRepo.getMyRandomFriendOfFriendsPresentProfileMediaId(memuuid)
        const uploadProfilePicPayload = {
            ...ProfileFactory.uploadProfileMedia,
            mediaId
        }
        const response = await this.service.profileService.uploadProfilePicture(uploadProfilePicPayload)
        return {
            response
        }
    }

    async uploadProfileWithMyFriendsOfFriendsExistingProfileMedia(){
        const {memuuid} = getMemDetailsFromJwt(TestContext.accessToken)
        const {mediaId, friendId} = await TestContext.services.profileRepo.getMyRandomFriendOfFriendsExistingProfileMediaId(memuuid)
        const uploadProfilePicPayload = {
            ...ProfileFactory.uploadProfileMedia,
            mediaId
        }
        const response = await this.service.profileService.uploadProfilePicture(uploadProfilePicPayload)
        return {
            response
        }
    }

    async uploadProfileWithNonFriendPresentProfileMedia(){
        const {memuuid} = getMemDetailsFromJwt(TestContext.accessToken)
        const {mediaId, friendId} = await TestContext.services.profileRepo.getMyNonFriendsPresentProfileMediaId(memuuid)
        const uploadProfilePicPayload = {
            ...ProfileFactory.uploadProfileMedia,
            mediaId
        }
        const response = await this.service.profileService.uploadProfilePicture(uploadProfilePicPayload)
        return {
            response
        }
    }

    async uploadProfileWithNonFriendExistingProfileMedia(){
        const {memuuid} = getMemDetailsFromJwt(TestContext.accessToken)
        const {mediaId, friendId} = await TestContext.services.profileRepo.getMyNonFriendsExistingProfileMediaId(memuuid)
        const uploadProfilePicPayload = {
            ...ProfileFactory.uploadProfileMedia,
            mediaId
        }
        const response = await this.service.profileService.uploadProfilePicture(uploadProfilePicPayload)
        return {
            response
        }
    }

    async uploadProfileWithMyPostMedia(files:string[]){
        const {mediaIds} = await this.mediaFlow.verifyUploadStatus('post',files)
        const uploadProfilePicPayload = {
            ...{mediaId:mediaIds[0]}
        }
        const response = await this.service.profileService.uploadProfilePicture(uploadProfilePicPayload)
        return {
            response
        }
    }

    async uploadProfileWithMyChatMedia(files:string[]){
        const {mediaIds} = await this.mediaFlow.verifyUploadStatus('chat',files)
        const uploadProfilePicPayload = {
            ...{mediaId:mediaIds[0]}
        }
        const response = await this.service.profileService.uploadProfilePicture(uploadProfilePicPayload)
        return {
            response
        }
    }

    async uploadProfileWithMyStoryMedia(files:string[]){
        const {mediaIds} = await this.mediaFlow.verifyUploadStatus('story',files)
        const uploadProfilePicPayload = {
            ...{mediaId:mediaIds[0]}
        }
        const response = await this.service.profileService.uploadProfilePicture(uploadProfilePicPayload)
        return {
            response
        }
    }

    async uploadNonUploadedProfileMedia(){

    }





}