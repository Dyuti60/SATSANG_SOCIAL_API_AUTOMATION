import { TestContext } from "../../src/context/test.context";
import { ServiceContainer } from "../../src/services/service.container";
import { MediaFactory } from "../testdata/factory/media.factory";
import { LoginFlow } from "./login.api.flow";

export class MediaFlow{
    constructor(
        private services: ServiceContainer,
        private loginFlow: LoginFlow
    ){}
    
    async loginUserFlow(contactNumber:string){
        TestContext.activeUser='current'
        const {response, accessToken, stateToken} = await this.loginFlow.loginFlow(contactNumber)
    }

    async allocateResponseWithMediaIds(type: 'chat' | 'post' | 'story' | 'profile', files: string[]){
        
        if (!files || files.length === 0) {
            throw new Error("Files array cannot be empty");
        }

        const payload = MediaFactory.buildValidMediaPayload(files, type);

        const {response} = await this.services.mediaService.placeMedia(payload, type)

        const mediaItems = response?.data?.data;

        if (!mediaItems || mediaItems.length !== files.length) {
        throw new Error(
            "Mismatch between allocated media items and files"
        )}

        return {
            mediaItems,
            response
        }
    }

    async uploadToMinIO(type: 'chat' | 'post' | 'story' | 'profile', files: string[]){
        const {mediaItems} = await this.allocateResponseWithMediaIds(type, files)

        const mediaIds: string[] = []

        for (let i=0; i<mediaItems.length; i++){
            const item = mediaItems[i]

            const uploadResponse = await this.services.mediaService.uploadToMinio(item, files[i])

            if(uploadResponse.status!==204){
                throw new Error(`MinIO upload failed for file: ${files[i]}`);
            }

            mediaIds.push(item.mediaId)
        }
        return mediaIds
    }

    async verifyUploadStatus(type: 'chat' | 'post' | 'story' | 'profile', files: string[]){
        const mediaIds = await this.uploadToMinIO(type, files)
        const response = await this.services.mediaService.updateMediaStatus({
            mediaIds: mediaIds
        })
        return {
            response,
            mediaIds
        }
    }
}